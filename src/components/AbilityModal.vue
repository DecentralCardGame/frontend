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
            <div v-for="(option, index) in dialog.options">

              <input v-if="dialog.type==='multivalue'" type='text'
                v-model="option.value" id="index" v-bind:option.value="option.value"
                placeholder="0" @keypress="isNumber($event)"
                style="display: inline;color:black;height:50px;text-align: right"
                size=1
              />

              <input v-if="dialog.type==='checkbox'" type="checkbox"
                v-model="option.value" id="index" :value="option.name"
              >

              <input v-if="dialog.type==='radio'" type="radio"
                v-model="option.value" id="index" :value="option.name"
              >

              <button v-if="dialog.type==='integerList'" type="enumbtn"
                v-model="option.value" @click="addToArray(index, arrayCount)" id="index" :value="option.name">
                {{option.name}} {{arrayCount[index]}}
              </button>

              <button v-if="dialog.type==='integer'" type="integerbtn"
                v-model="option.value" @click="count+=1-2*index" id="index" :value="option.name">
                {{option.name}}
              </button>

              <input v-if="dialog.type==='root'" type="radio"
                v-model="option.value" id="index" :value="option.name"
              >

              <label for="index">{{option.title}}</label>

              <span v-if="option.description"> - {{option.description}} </span>
            </div>
            <div>
              <span v-if ="dialog.type==='integer'"> {{count}} </span>
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
import { filterSelection, resolveParagraph } from './utils.js' // filterProperties (currently removed, maybe forever?)

export default {
  name: 'modal',
  data () {
    return {
      arrayCount: [0, 0, 0, 0, 0, 0],
      count: 0
    }
  },
  props: {
    rules: Object,
    picked: Object,
    dialog: Object,
    options: Array,
    currentNode: Object,
    ability: Object,
    abilities: Array
  },
  mounted: () => {
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addAbility () {
      console.log('type:', this.dialog.type)

      switch (this.dialog.type) {
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
        case 'checkbox':
          this.handleCheckboxInteraction()
          break
        default:
          console.error('this type is unkown: ', this.dialog.type)
          break
      }
      this.$emit('close')
    },
    addToArray (id, array) {
      console.log(this.arrayCount)
      this.arrayCount[id] += 1
    },
    setNode (reference) {
      this.currentNode = reference
      this.$emit('update:currentNode', this.currentNode)
    },
    writeNode (prop, data) {
      this.currentNode[prop] = data
      this.$emit('update:currentNode', this.currentNode)
    },
    handleCheckboxInteraction () {
      
      console.log('dialog: ', this.dialog)

      if (!this.dialog.options[0].value) {
        this.dialog.options[0].value = false
      }
      
      let btn = this.ability.interaction[this.currentNode.interactionId].btn

      // update interaction
      this.ability.interaction[this.currentNode.interactionId].btn.label = this.dialog.options[0].value

      // update ability TODO [0].abilityPath is not set
      //R.path(btn.abilityPath, this.ability)[R.last(this.dialog.options[0].abilityPath)] = this.dialog.options[0].value
      R.path(R.dropLast(1, btn.abilityPath), this.ability)[R.last(btn.abilityPath)] = this.dialog.options[0].value
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

      // this.writeNode(currentProperty, labels)

      this.ability.interaction[this.currentNode.interactionId].btn.label = labels

      let path = R.slice(10, Infinity, this.currentNode.path)
      R.path(path, this.ability)[currentProperty] = values

      console.log('current node: ', this.currentNode)
      console.log('ability: ', this.ability)
    },
    handleIntegerInteraction () {
      console.log('current node: ', this.currentNode)

      let currentProperty = R.last(this.ability.interaction[this.currentNode.interactionId].btn.schemaPath)
      console.log('currentProperty: ', currentProperty)

      // this.writeNode(currentProperty, labels)

      this.ability.interaction[this.currentNode.interactionId].btn.label = this.count

      let path = R.slice(10, Infinity, this.currentNode.path)
      R.path(path, this.ability)[currentProperty] = this.count

      console.log('current node: ', this.currentNode)
      console.log('ability: ', this.ability)
    },
    handleRadioInteraction () {
      console.log('ability: ', this.ability)
      let option = filterSelection(this.dialog.options).option
      let selection = option.value
      let optionPath = option.schemaPath

      console.log('selection: ', selection)

      let btn = this.ability.interaction[this.currentNode.interactionId].btn
      console.log('btn: ', btn)

      let path = R.dropLast(2, R.concat(btn.schemaPath, optionPath))
      console.log('path: ', path)
      console.log('optionPath: ', optionPath)
      console.log('obj:', R.path(path, this.rules))

      let newInteraction = createInteraction(selection, path, btn.abilityPath)

      updateInteraction(this.ability, this.currentNode.interactionId, newInteraction)

      console.log(R.path(path, this.rules))
      R.path(btn.abilityPath, this.ability)[R.last(option.abilityPath)] = shallowClone(R.path(path, this.rules).properties)

      console.log('ability in handleRadioInteraction: ', this.ability)
      // this.writeNode('interaction', this.currentNode.interaction[this.currentNode.interactionId])
    },
    handleMultiValueInteraction () {
      // TODO NEEDS FIXING
      this.writeNode('type', this.dialog.type)

      // var label = ''

      this.dialog.options.forEach((item, index) => {
        if (item.value) {
          this.currentNode.values.push({name: item.name, amount: item.value})
          // if (index !== 0) label += ', '
          // label += item.value + ' ' + item.title
        }
      })

      console.log('current node: ', this.currentNode)
    },
    handleCreateAbility () {
      let selection = filterSelection(this.dialog.options)
      // let properties = filterProperties(this.options, selection.option.value)
      let abilityName = resolveParagraph(selection.option.value)

      this.currentNode.path = R.concat(R.slice(0, 8, this.currentNode.path), [selection.index, 'properties', abilityName])

      let newAbility = {}
      newAbility[abilityName] = shallowClone(R.path(this.currentNode.path, this.rules).properties) // R.clone(R.path(this.currentNode.path, this.rules))
      newAbility.interaction = createInteraction(R.path(this.currentNode.path, this.rules).description, this.currentNode.path, [abilityName])
      newAbility.name = abilityName
      newAbility.path = this.currentNode.path

      this.abilities.push(R.clone(newAbility))
      this.currentNode = R.clone(this.abilities[this.abilities.length - 1])
      this.writeNode(abilityName, {})
      this.writeNode('name', abilityName)

      console.log('newAbility: ', newAbility)
      console.log('currentNode: ', this.currentNode)
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}

function createInteraction (description, schemaPath, abilityPath) {
  let text = description
  let regex = /([§]+)([a-z,A-Z]+)/g
  text = text.replace(regex, '$1%$2§')
  text = text.split('§')

  let interaction = []

  text.forEach(entry => {
    if (entry[0] === '%') {
      interaction[interaction.length - 1].btn = {
        label: entry.slice(1),
        type: entry.slice(1),
        schemaPath: R.append(entry.slice(1), R.append('properties', schemaPath)),
        // schemaPath: schemaPath,
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
    justify-content: flex;
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
    justify-content: flex;
  }
</style>
