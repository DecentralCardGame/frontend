import * as R from 'ramda'

// Global Utility functions
export function creditsFromCoins(coins) {
  let credits = -1
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].denom === 'ucredits') {
      credits = coins[i].amount
      break
    }
  }
  return credits
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
      //console.log('interaction type', type)
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
          post: interaction[interaction.length - 2] ? interaction[interaction.length - 2].post : ""
        })
        // the post button text has been moved behind the last button, so remove it from the previous one
        interaction[interaction.length - 2].post = ''
      }
      else if(type === 'yes') {
        console.log(text)
      }
      // this is the default case
      else {
        R.last(interaction).btn = makeBtn(R.append(buttonEntry, rulesPath), R.append(buttonEntry, abilityPath), interaction.length - 1)
        if (type === 'boolean') {
          R.last(interaction).btn.label += '?'
        }
      }
    } else {
      interaction.push({pre: entry, btn: {label: '', type: null, path: null}, post: ''})
    }
  })

  // check if the last interaction piece is just an ending text (no button) and if there exist an interaction text element before it,
  // if true then move pretext from the last piece to posttext of the second last piece and remove it.
  if (interaction[interaction.length - 1].btn.type === null && interaction[interaction.length - 2]) {
    interaction[interaction.length - 2].post = interaction[interaction.length - 1].pre
    interaction.splice(-1, 1)
  }

  console.log("pre : case?",interaction[0].pre[0])
  if (interaction[0].pre[0] == ":") {
    console.log("pre : case, remove it")
  }

  console.log('created Interaction: ', interaction)
  return interaction
}

export function updateInteraction (ability, id, newInteraction) {
  // if it is not the first ability, pick the post-text from the previous one and add it to the pre-text of this interaction
  if (id > 0) {
    ability.interaction[id - 1].post += ability.interaction[id].pre
  }
  // if it is not the last ability, pick the pre-text from the next one and add it to the post-text of this interaction
  if (id < ability.interaction.length - 1) {
    if (ability.interaction[id].post) {
      ability.interaction[id + 1].pre += ability.interaction[id].post
    } else if (ability.interaction[id].pre != ": ") {
      // sometimes there is no post-text, but there is pre-text we want to preserve, but don't do this if it is only a ":"
      newInteraction[0].pre = ability.interaction[id].pre + newInteraction[0].pre
    }
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

  let button = {
    id: id,
    label: atRules(rulesPath).name,
    type: atRules(rulesPath).type,
    abilityPath: abilityPath,
    rulesPath: rulesPath
  }

  // special case: IntVariable + SimpleIntValue = condense in one thing, don't show dialog
  if (R.includes("IntVariable", R.keys(atRules(rulesPath).children)) && R.includes("SimpleIntValue", R.keys(atRules(rulesPath).children))) {
    console.log("special case")
    console.log(atRules(rulesPath))
    button.type = 'intX'
  }

  return button
}

export function climbRulesTree(cardRules, path) {
  let atRules = R.curry(atPath)(cardRules)
  let ascending = true
  while (ascending) {
    if (R.keys(atRules(path)).length === 1) {
      path.push(R.keys(atRules(path))[0])
    } else if (R.includes('children', R.keys(atRules(path)))) {
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

export function filterSelection2 (options, option) {
  let found = {}
  R.forEachObjIndexed((item, idx) => {
    if (item === option) {
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

export function uploadImg (file, maxKB, callback, sizeX=0, sizeY=0) {
  // let resolution = {height: 1300, width: 838} // this is outdated because now the cropper does it

  const reader = new FileReader()

  reader.onload = function (readerEvent) {
    var image = new Image()
    image.onload = function () {
      // Resize the image
      let canvas = document.createElement('canvas');

      let targetWidth = sizeX == 0 ? image.width : sizeX;
      let targetHeight = sizeY == 0 ? image.height : sizeY;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      if (sizeX !== 0 || sizeY !== 0) {
        // Fill background with black (for padding)
        canvas.getContext('2d').fillStyle = "black";
        canvas.getContext('2d').fillRect(0, 0, targetWidth, targetHeight);

        // Calculate scaling while maintaining aspect ratio
        const scale = Math.min(targetWidth / image.width, targetHeight / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;

        // Center the image
        const offsetX = (targetWidth - drawWidth) / 2;
        const offsetY = (targetHeight - drawHeight) / 2;

        // Draw the scaled image on the canvas
        canvas.getContext('2d').drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }
      else {
        canvas.getContext('2d').drawImage(image, 0, 0, targetWidth, targetHeight);  
      }

      let quality = 0.9;
      let newDataURL = canvas.toDataURL('image/jpeg', quality)
      console.log("quality", quality, "size", Math.round(newDataURL.length)/1000)
      while (Math.round(newDataURL.length)/1000 > maxKB) {
        quality *= 0.9
        newDataURL = canvas.toDataURL('image/jpeg', quality)
        console.log("quality", quality, "size", Math.round(newDataURL.length)/1000)

        if (quality < 0.01) {
          callback("Error: compression did not work, try smaller file.")
          return
        }
      }
      callback(newDataURL)
    }
    image.src = readerEvent.target.result
  }
  reader.onerror = error => console.error(error)
  reader.readAsDataURL(file)
}

export function compressImg(dataURL, width, height) {
  var image = new Image()
  image.src = dataURL
  console.log("dataURL", dataURL)
  console.log("image bounds:", width, height)

  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(image, 0, 0, width, height)

  let quality = 0.9
  let newDataURL = canvas.toDataURL('image/jpeg', quality)
  console.log("newDataURL", newDataURL)
  console.log("quality", quality, "size", Math.round(newDataURL.length)/1000)

  while (Math.round(newDataURL.length)/1000 > process.env.VUE_APP_CARDIMG_MAXKB) {
    quality -= 0.1
    newDataURL = canvas.toDataURL('image/jpeg', quality)
    console.log("quality", quality, "size", Math.round(newDataURL.length)/1000)

    if (quality <= 0)
      return ""
  }
  return newDataURL
}

export function saveCardAsPng (element, name, scale = 5) {
  console.error("SAVE CARD AS PNG SHOULD BE DEACTIVATED")
  //svg1.saveSvgAsPng(element, name + '.png', {scale: scale})
}