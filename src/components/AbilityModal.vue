<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            {{dialog.title}}
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            {{dialog.description}}
          <br>
            <div v-for="(option, index) in dialog.options" v-bind:key="index">

              <input v-if="dialog.type==='multivalue'" type='text'
                v-model="option.value" id="index"
                placeholder="0" @keypress="isNumber($event)"
                style="display: inline;color:black;height:50px;text-align: right"
                size=1
              />

              <input v-if="dialog.type==='checkbox'" type="checkbox"
                v-model="option.value" id="index" :value="option.name"
              >
              <input v-if="dialog.type==='stringEnum'" type="radio"
                v-model="selectedString" id="index" :value="option.name"
              >
              <input v-if="dialog.type==='stringEnter'" style="display: inline;color:black;height:50px" placeholder="enter text"
                v-model="selectedString"
              >
              <button v-if="dialog.type==='integerList'" type="enumbtn"
                @click="arrayCount.splice(index, 1, arrayCount[index] + 1)" id="index">
                {{arrayCount[index]}}
              </button>
              <button v-if="dialog.type==='integer'" type="integerbtn"
                @click="selectedCount += 1 - 2 * index" id="index">
                {{option.name}}
              </button>

              <input v-if="dialog.type==='root'" type="radio"
                v-model="option.selected" id="index" :value="option.name"
              >

              <input v-if="dialog.type==='interface'" type="radio"
                v-model="option.selected" id="index" :value="option.name"
              >

              <label for="index">{{option.name}}</label>

              <span v-if="option.description"> - {{option.description}} </span>
            </div>
            <div>
              <span v-if ="dialog.type==='integer'"> {{selectedCount}} </span>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            {{ picked }}
            <br>
          </slot>
          <button
              type="button"
              class="btn-teal"
              @click="addAbility"
              aria-label="Close modal">
              Add
            </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import { filterSelection } from './utils.js' 

export default {
  name: 'modal',
  data () {
    return {
      arrayCount: [0, 0, 0, 0, 0, 0],
      selectedCount: 0,
      selectedString: ''
    }
  },
  props: {
    picked: Object,
    dialog: Object,
    options: Array,
    currentNode: Object,
    ability: Object,
    abilities: Array
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addAbility () {
      console.log('type:', this.dialog.type)

      switch (this.dialog.type) {
        case 'interface':
          this.handleInterface()
          break
        case 'root':
          this.handleCreateAbility()
          break
        case 'multivalue':
          this.handleMultiValueInteraction()
          break
        case 'integerList':
          this.handleIntegerListInteraction()
          break
        case 'integer':
          this.handleIntegerInteraction()
          break
        case 'radio':
          this.handleRadioInteraction()
          break
        case 'stringEnum':
          this.handleStringInteraction()
          break
        case 'stringEnter':
          this.handleStringInteraction()
          break
        case 'checkbox':
          this.handleCheckboxInteraction()
          break
        case 'noDialog':
          this.handleNoModal()
          break
        default:
          console.error('this type is unkown: ', this.dialog.type)
          break
      }
      this.$emit('close')
    },
    setNode (reference) {
      this.currentNode = reference
      this.$emit('update:currentNode', this.currentNode)
    },
    writeNode (prop, data) {
      this.currentNode[prop] = data
      this.$emit('update:currentNode', this.currentNode)
    },
    handleInterface() {
      console.log('dialog: ', this.dialog)




    },
    handleCheckboxInteraction () {
      console.log('dialog: ', this.dialog)

      if (!this.dialog.options[0].value) {
        this.dialog.options[0].value = false
      }

      let btn = this.ability.interaction[this.currentNode.interactionId].btn

      // update interaction
      this.ability.interaction[this.currentNode.interactionId].btn.label = this.dialog.options[0].value

      // R.path(R.dropLast(1, btn.abilityPath), this.ability)[R.last(btn.abilityPath)] = this.dialog.options[0].value
      this.attachToAbility(btn.abilityPath, this.dialog.options[0].value)
    },
    handleIntegerListInteraction () {
      console.log('current node: ', this.currentNode)

      let labels = ''
      let values = {}

      this.arrayCount.forEach((item, idx) => {
        values[this.dialog.entries[idx]] = item
        if (item > 0) {
          labels += item + ' ' + this.dialog.entries[idx] + ', '
        }
      })
      labels = R.dropLast(2, labels)

      let currentProperty = R.last(this.ability.interaction[this.currentNode.interactionId].btn.schemaPath)
      console.log('currentProperty: ', currentProperty)

      this.ability.interaction[this.currentNode.interactionId].btn.label = labels

      let btn = this.ability.interaction[this.currentNode.interactionId].btn

      // R.path(btn.abilityPath, this.ability)[currentProperty] = values
      this.attachToAbility(R.concat(btn.abilityPath, [currentProperty]), values)
      // reset arrayCount
      this.arrayCount = [0, 0, 0, 0, 0, 0]
      console.log('ability: ', this.ability)
    },
    handleIntegerInteraction () {
      console.log('dialog: ', this.dialog)

      this.attachToAbility(this.dialog.btn.abilityPath, this.selectedCount)
      // reset selectedCount
      // this.selectedCount = 0
      console.log('ability after handleInteger: ', this.ability)
    },
    handleRadioInteraction () {
      console.log('ability: ', this.ability)
      let btn = this.ability.interaction[this.currentNode.interactionId].btn
      let option = filterSelection(this.dialog.options).option
      let selection = option.value
      let optionPath = option.schemaPath
      let clickedPath = R.concat(btn.schemaPath, optionPath)

      console.log('selection: ', selection)
      console.log('obj at clickedPath:', R.path(clickedPath, this.$cardSchema))
      console.log('btn: ', btn)

      let depth = deepness(R.path(clickedPath, this.$cardSchema))
      console.log(depth)

      // let schemaPath = R.dropLast(2, R.concat(btn.schemaPath, optionPath))
      let schemaPath = R.dropLast(2 - depth, clickedPath) // TODO CLEAN THIS MESS UP
      console.log('schemaPath: ', schemaPath)
      console.log('optionPath: ', optionPath)
      console.log('obj at path:', R.path(schemaPath, this.$cardSchema))
      console.log('btn.abilityPath: ', btn.abilityPath)
      console.log('option.abilityPath: ', option.abilityPath)

      let newInteraction
      if (this.currentNode.modalType === 'object.oneOf') {
        newInteraction = createInteraction(selection, clickedPath, R.concat(btn.abilityPath, option.abilityPath), this.$cardSchema)
      } else {
        newInteraction = createInteraction(selection, clickedPath, btn.abilityPath, this.$cardSchema)
      }

      updateInteraction(this.ability, this.currentNode.interactionId, newInteraction)

      this.attachToAbility(R.concat(btn.abilityPath, [R.last(option.abilityPath)]), shallowClone(R.path(schemaPath, this.$cardSchema).properties))
      console.log('ability after handleRadioInteraction: ', this.ability)
    },
    handleNoModal () {
      console.log('ability at handleNoModal: ', this.ability)
      // let option = filterSelection(this.dialog.options).option

      let btn = this.ability.interaction[this.currentNode.interactionId].btn
      console.log('btn: ', btn)
      let newInteraction = createInteraction('', btn.schemaPath, btn.abilityPath, this.$cardSchema)

      updateInteraction(this.ability, this.currentNode.interactionId, newInteraction)

      // R.path(R.dropLast(1, btn.abilityPath), this.ability)[R.last(btn.abilityPath)] = shallowClone(R.path(btn.schemaPath, this.$cardSchema).properties)
      this.attachToAbility(R.dropLast(1, btn.abilityPath).push(R.last(btn.abilityPath)), shallowClone(R.path(btn.schemaPath, this.$cardSchema).properties))
      console.log('ability after handleNoModal: ', this.ability)
    },
    handleStringInteraction () {
      console.log('current node: ', this.currentNode)

      let currentProperty = R.last(this.ability.interaction[this.currentNode.interactionId].btn.schemaPath)
      console.log('currentProperty: ', currentProperty)

      this.ability.interaction[this.currentNode.interactionId].btn.label = this.selectedString

      let btn = this.ability.interaction[this.currentNode.interactionId].btn

      // R.path(R.dropLast(1, btn.abilityPath), this.ability)[currentProperty] = this.selectedString
      this.attachToAbility(R.dropLast(1, btn.abilityPath).push(currentProperty), this.selectedString)
      console.log('ability after handleStringINteraction: ', this.ability)
    },
    handleCreateAbility () {
      let atPath = path => {
        return R.path(path, this.$cardRules)
      }
      let climbRulesTree = path => {
        let ascending = true
        while (ascending) {
          if (R.keys(atPath(path)).length === 1) {
            path.push(R.keys(atPath(path))[0])
          } else if (R.contains('children', R.keys(R.path(path, this.$cardRules)))) {
            path.push('children')
          } else {
            ascending = false
          }
        }
        return path
      }

      console.log('dialog:', this.dialog)
    
      let selection = filterSelection(this.dialog.options)

      console.log('selection', selection)

      atPath

      let abilityPath = [selection.index]
      let rulesPath = climbRulesTree(R.append(selection.index, this.dialog.rulesPath))

      let text = ''
      R.keys(selection.option.children).forEach(entry => {
        text += '§' + entry + ' , '
      })

      let newAbility = {
        interaction: createInteraction('Hier '+ text +' konfigurieren', abilityPath, rulesPath, this.$cardRules) 
      }
      newAbility[selection.index] = {
        path: this.dialog.rulesPath
      }

      this.abilities.push(newAbility)

      console.log('this.abilities:', this.abilities)

      // let selection = filterSelection(this.dialog.options)
      // let properties = filterProperties(this.options, selection.option.value)
      // let abilityName = resolveParagraph(selection.option.value)

      // this.currentNode.path = R.concat(R.slice(0, 8, this.currentNode.path), [selection.index, 'properties', abilityName])

      /*
      let newAbility = {}
      newAbility[abilityName] = shallowClone(R.path(this.currentNode.path, this.$cardSchema).properties) // R.clone(R.path(this.currentNode.path, this.$cardSchema))
      newAbility.interaction = createInteraction(R.path(this.currentNode.path, this.$cardSchema).description, this.currentNode.path, [abilityName], this.$cardSchema)
      newAbility.name = abilityName
      newAbility.path = this.currentNode.path

      this.abilities.push(R.clone(newAbility))
      this.currentNode = R.clone(this.abilities[this.abilities.length - 1])
      this.writeNode(abilityName, {})
      this.writeNode('name', abilityName)

      console.log('newAbility: ', newAbility)
      console.log('currentNode: ', this.currentNode)
      */
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    attachToAbility (path, object) {
      this.ability = R.assocPath(path, object, this.ability)
    }
  }
}

function createInteraction (text, abilityPath, rulesPath, cardRules) {
  let makeBtn = R.curry(makeButton)(cardRules)

  // split text into pieces, separated by button markers §
  let regex = /([§]+)([a-z,A-Z]+)/g
  text = text.replace(regex, '$1%$2§')
  text = text.split('§')

  let interaction = []
  // iterate over text pieces, creating interaction for each piece
  text.forEach(entry => {
    if (entry[0] === '%') {
      // % is the marker for a button
      let buttonEntry = entry.slice(1)

      let type = R.path(R.append(buttonEntry, rulesPath), cardRules).type
      

      if(type === 'array') {
        let nextPath = climbRulesTree(cardRules, R.append(buttonEntry, rulesPath))

        // Create the button for adding the effect
        interaction[interaction.length - 1].btn = makeBtn(R.dropLast(1, nextPath), R.append(buttonEntry, abilityPath))
        // and also create the button for adding more effects
        interaction.push({
          pre: '+', 
          btn: {
            label: '...', 
            type: 'expandArray', 
            abilityPath: R.append(buttonEntry, abilityPath),
            rulesPath: R.append(buttonEntry, rulesPath)
          }, 
          post: interaction[interaction.length - 2].post 
        })
        // the post button text has been moved behind the last button, so remove it from the previous one
        interaction[interaction.length - 2].post = ''
      } else {
        R.last(interaction).btn = makeBtn(R.append(buttonEntry, rulesPath), R.append(buttonEntry, abilityPath))
      }
    } else {
      interaction.push({pre: entry, btn: {label: '', type: null, path: null}, post: ''})
    }
  })

  console.log('interaction', interaction)
  // check if the last interaction piece is a button, if not move pretext from the last piece to posttext of the second last piece
  if (interaction[interaction.length - 1].btn.type === null) {
    interaction[interaction.length - 2].post = interaction[interaction.length - 1].pre
    interaction.splice(-1, 1)
  }

  console.log('created Interaction: ', interaction)
  return interaction
}
/*
function createInteractionOLD (description, schemaPath, abilityPath, rules) {
  // let text = description
  let text = R.path(schemaPath, rules).description
  console.log('text: ', text)

  let regex = /([§]+)([a-z,A-Z]+)/g
  text = text.replace(regex, '$1%$2§')
  text = text.split('§')

  let interaction = []

  text.forEach(entry => {
    if (entry[0] === '%') {
      // % is the marker for a button after regex, now check if it is terminal:
      let buttonPath = R.append(entry.slice(1), R.append('properties', schemaPath))

      interaction[interaction.length - 1].btn = {
        label: entry.slice(1),
        type: entry.slice(1),
        schemaPath: buttonPath,
        abilityPath: R.append(entry.slice(1), abilityPath)
      }
    } else {
      interaction.push({pre: entry, btn: {label: '', type: null, path: null}, post: ''})
    }
  })

  if (interaction[interaction.length - 1].btn.type === null) {
    interaction[interaction.length - 2].post = interaction[interaction.length - 1].pre
    interaction.splice(-1, 1)
  }

  console.log('created Interaction: ', interaction)
  return interaction
}
*/

function updateInteraction (ability, id, newInteraction) {
  if (id > 0) {
    ability.interaction[id - 1].post += ability.interaction[id].pre
  }
  if (id < ability.interaction.length - 1) {
    ability.interaction[id + 1].pre += ability.interaction[id].post
  }

  ability.interaction = R.remove(id, 1, ability.interaction)
  ability.interaction = R.insertAll(id, newInteraction, ability.interaction)
}

function deepness (node) {
  console.log('node whose deepness is checked: ', node)

  if (node.description === '§ActivatedAbility') {
    return 2
  }
  if (node.description === '§TriggeredAbility') {
    return 2
  }
  if (R.has('items', node)) {
    if (R.has('oneOf', node.items)) {
      return 2
    }
  }
  if (R.has('oneOf', node)) {
    return 1
  }
  if (R.has('properties', node)) {
    return 1
  }
  console.log('terminal node, deepness is 0')
  return 0
}

function atPath(cardRules, path) {
  return R.path(path, cardRules)
}

function makeButton (cardRules, rulesPath, abilityPath) {
  let atRules = R.curry(atPath)(cardRules)

  return {
    label: atRules(rulesPath).name,
    type: atRules(rulesPath).type,
    abilityPath: abilityPath,
    rulesPath: rulesPath
  }
}

function climbRulesTree(cardRules, path) {
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

function shallowClone (obj) {
  let clone = {}
  for (var prop in obj) {
    clone[prop] = {}
  }
  return clone
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #12D1D1;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #12D1D1;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .btn-teal {
    color: white;
    background: #12D1D1;
    border: 1px solid #12D1D1;
    border-radius: 2px;
  }
</style>
