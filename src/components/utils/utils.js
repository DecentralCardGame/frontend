import Vue from 'vue'
import * as R from 'ramda'
import * as svg1 from 'save-svg-as-png'

// Global Utility functions

export const notify = {
  fail: R.curry(function (title, text) {
    Vue.notify({
      group: 'fail',
      title: title,
      text: text,
      duration: 5000
    })
  }),
  success: R.curry(function (title, text) {
    Vue.notify({
      group: 'success',
      title: title,
      text: text,
      duration: 5000
    })
  }),
  info: R.curry(function (title, text) {
    Vue.notify({
      group: 'info',
      title: title,
      text: text,
      duration: 5000
    })
  })
}

export function userLoggedIn() {
  return R.isEmpty(localStorage.address) || R.isNil(localStorage.address)
}

// Utility functions for card creator

export function createInteraction (text, abilityPath, rulesPath, cardRules) {
  let makeBtn = R.curry(makeButton)(cardRules)

  // split text into pieces, separated by button markers §
  let regex = /([§]+)([a-z,A-Z]+)/g
  text = text.replace(regex, '$1%$2§')
  text = text.split('§')

  let interaction = []
  // iterate over text pieces, creating interaction for each piece
  text.forEach((entry) => {
    if (entry[0] === '%') {
      // % is the marker for a button
      let buttonEntry = entry.slice(1)

      let type = R.path(R.append(buttonEntry, rulesPath), cardRules).type
      // array is different to other interactions, therefore we need special treatment
      if(type === 'array') {
        let nextPath = climbRulesTree(cardRules, R.append(buttonEntry, rulesPath))

        // Create the button for adding the effect
        interaction[interaction.length - 1].btn = makeBtn(R.dropLast(1, nextPath), R.concat(abilityPath, [buttonEntry, 0]), interaction.length - 1)
        // and also create the button for adding more effects
        interaction.push({
          pre: '+',
          btn: {
            id: interaction.length,
            label: '[add '+R.path(R.append(buttonEntry, rulesPath), cardRules).name+']',
            type: 'expandArray',
            abilityPath: R.append(buttonEntry, abilityPath),
            rulesPath: R.append(buttonEntry, rulesPath),
            template: interaction[interaction.length - 1]
          },
          post: interaction[interaction.length - 2].post
        })
        // the post button text has been moved behind the last button, so remove it from the previous one
        interaction[interaction.length - 2].post = ''
      } else {
        R.last(interaction).btn = makeBtn(R.append(buttonEntry, rulesPath), R.append(buttonEntry, abilityPath), interaction.length - 1)
        if (type === 'boolean') {
          R.last(interaction).btn.label += '?'
        }
      }
    } else {
      interaction.push({pre: entry, btn: {label: '', type: null, path: null}, post: ''})
    }
  })

  // check if the last interaction piece is a button, if not move pretext from the last piece to posttext of the second last piece and remove it
  if (interaction[interaction.length - 1].btn.type === null) {
    interaction[interaction.length - 2].post = interaction[interaction.length - 1].pre
    interaction.splice(-1, 1)
  }

  console.log('created Interaction: ', interaction)
  return interaction
}

export function updateInteraction (ability, id, newInteraction) {
  if (id > 0) {
    ability.interaction[id - 1].post += ability.interaction[id].pre
  }
  if (id < ability.interaction.length - 1) {
    ability.interaction[id + 1].pre += ability.interaction[id].post
  }

  ability.interaction = R.remove(id, 1, ability.interaction)
  ability.interaction = R.insertAll(id, newInteraction, ability.interaction)

  // here please update ids
  ability.interaction.forEach((item, idx) => {
    item.btn.id = idx
  })

  console.log('ability.interaction after update:', ability.interaction)
}

export function atPath(cardRules, path) {
  return R.path(path, cardRules)
}

export function makeButton (cardRules, rulesPath, abilityPath, id) {
  let atRules = R.curry(atPath)(cardRules)

  return {
    id: id,
    label: atRules(rulesPath).name,
    type: atRules(rulesPath).type,
    abilityPath: abilityPath,
    rulesPath: rulesPath
  }
}

export function climbRulesTree(cardRules, path) {
  let atRules = R.curry(atPath)(cardRules)
  let ascending = true
  while (ascending) {
    if (R.keys(atRules(path)).length === 1) {
      path.push(R.keys(atRules(path))[0])
    } else if (R.contains('children', R.keys(atRules(path)))) {
      path.push('children')
    } else {
      ascending = false
    }
  }
  return path
}


export function filterSelection (options) {
  let found = {}
  R.forEachObjIndexed((item, idx) => {
    if (item.selected) {
      found = {
        index: idx,
        option: item
      }
    }
  }, options)
  return found
}

export function shallowClone (obj) {
  let clone = {}
  for (var prop in obj) {
    clone[prop] = {}
  }
  return clone
}

// utility functions for uploading and downloading stuff

export function uploadImg (file, callback) {
  //console.log(event)
  //let file = event.target.files[0]

  const reader = new FileReader()

  reader.onload = function (readerEvent) {
    var image = new Image()
    image.onload = function () {
      // Resize the image
      let canvas = document.createElement('canvas')
      let maxSize = 780
      let width = image.width
      let height = image.height
      if (height > maxSize) {
          width *= maxSize / height
          height = maxSize
      }
      // centering
      let widthAdjust = 0
      if (width > 500) {
        widthAdjust = (width - 500) / 2
      }
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, -widthAdjust, 0, width, height)
      let dataUrl = canvas.toDataURL('image/jpeg')
      callback(dataUrl)
    }
    image.src = readerEvent.target.result
  }
  reader.onerror = error => console.error(error)
  reader.readAsDataURL(file)
}

export function saveCardAsPng (element, name, scale = 5) {
  svg1.saveSvgAsPng(element, name + '.png', {scale: scale})
}

export const emptyCard = {
  CardName: 'Name',
  FlavourText: '',
  abilities: [],
  Notes: '',
  type: 'no type',
  Tags: [],
  tagDummy: '',
  CostType: {
    Lumber: false,
    Food: false,
    Iron: false,
    Mana: false,
    Energy: false
  },
  CastingCost: -1,
  Health: 0,
  Attack: 0,
  Growth: 10,
  Wisdom: 10,
  StartingHandSize: 3
}

export function icon(name) {
  let item
  try {
    item = require('../assets/icon/'+name+'.svg')
  } catch {
    if (name.length === 1) {
      return require('../../assets/icon/variable.svg')
    }
    try {
      item = require('../assets/icon/'+name+'s.svg')
    } catch {
      try {
        item = require('../assets/icon/'+name+'r.svg')
      }  catch {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA1UlEQVRIieWVQRHDIBBFvwQkREIlRAJSKiEOWgk4aBwUCXEQHDQO6AFomRaWhZBDp39mLzvsfyywA/APugKwAG5Rbva5y15z6Y1CBMU52WI8wu14ZQBWv3asMbeZSAHiYEHC+bYAZg5AHw2YdgDOlLEAcCeKOQDrPUQKoAqFXICFm50vbR0BjxSgVFQDiNe+pDoCVAogACwdAAsylwzQQ8YFkLOgOwA0BTi8gxPo51oCbN6D1AD3CkwFwPiaoWT+2Q0XUNx1ThLvTuLxD9+oQeOP9jt6AvOXA3NEG5uaAAAAAElFTkSuQmCC"
      }
    }
  }
  return item
}