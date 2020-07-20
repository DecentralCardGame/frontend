<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header"
        >
          <slot name="header">
            {{ dialog.title }}
            <button
              type="button"
              class="btn-close"
              aria-label="Close modal"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>
        <section
          id="modalDescription"
          class="modal-body"
        >
          <slot name="body">
            {{ dialog.description }}
            <br>
            <div
              v-for="(option, index) in dialog.options"
              :key="index"
            >
              <input
                v-if="dialog.type==='multivalue'"
                id="index"
                v-model="option.value"
                type="text"
                placeholder="0"
                style="display: inline;color:black;height:50px;text-align: right"
                size="1"
                @keypress="isNumber($event)"
              >
              <input
                type="checkbox"
                id="index"
                v-if="dialog.type==='boolean'"
                v-model="option.value"
                :value="option.name"
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

              <span v-if="option.description"> - {{ option.description }} </span>
            </div>
            <div>
              <span v-if="dialog.type==='integer'"> {{ selectedCount }} </span>
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
            aria-label="Close modal"
            @click="addAbility"
          >
            Add
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import { filterSelection, createInteraction, updateInteraction, climbRulesTree, atPath } from './utils.js' 

export default {
  name: 'Modal',
  props: {
    picked: Object,
    dialog: Object,
    options: Array,
    ability: Object,
    abilities: Array
  },
  data () {
    return {
      arrayCount: [0, 0, 0, 0, 0, 0],
      selectedCount: 0,
      selectedString: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addAbility () {
      console.log('dialog type:', this.dialog.type)

      switch (this.dialog.type) {
        case 'interface':
          this.handleInterface()
          break
        case 'root':
          this.handleCreateAbility()
          break
        case 'integer':
          this.handleIntegerInteraction()
          break
        case 'stringEnum':
          this.handleStringInteraction()
          break
        case 'stringEnter':
          this.handleStringInteraction()
          break
        case 'boolean':
          this.handleBoolInteraction()
          break
        default:
          console.error('this type is unkown: ', this.dialog.type)
          break
      }
      if (!this.dialog.preventClose) {
        this.$emit('close')
      }
    },
    handleInterface() {
      let atRules = R.curry(atPath)(this.$cardRules)
      console.log('dialog in handle interface: ', this.dialog)

      let selection = filterSelection(this.dialog.options)
      let pathAtSelection = R.concat(this.dialog.rulesPath, ['children', selection.index])
      let objAtSelection = atRules(pathAtSelection)    
      console.log('objAtSelection', objAtSelection)

      // check if the 'no condition' option was selected
      if (selection.index === 'noSelect') {
        this.dialog.btn.label = 'no condition'
        this.dialog.preventClose = false

      // check if an option was selected, which has an interaction text
      } else if (objAtSelection.interactionText) {
        let interactionText = objAtSelection.interactionText
      
        let abilityPath = R.append(selection.index, this.dialog.abilityPath)
        let rulesPath = pathAtSelection
        let newInteraction = createInteraction(interactionText, abilityPath, R.append('children', rulesPath), this.$cardRules) 

        updateInteraction(this.ability, this.ability.clickedBtn.id, newInteraction)
        if(objAtSelection.singleUse) {
          this.attachToAbility(this.dialog.btn.abilityPath, {singleUse: selection.index})
        } else {
          this.attachToAbility(this.dialog.btn.abilityPath, {})
        }
        this.dialog.preventClose = false
      } else {
        // if there is no interaction text, don't close modal and present new options
        this.dialog.preventClose = true
        this.dialog.interactionText = objAtSelection.interactionText
        this.dialog.title = objAtSelection.name
        this.dialog.description = objAtSelection.description
        this.dialog.type = objAtSelection.type
        this.dialog.options = objAtSelection.children
        this.dialog.rulesPath = pathAtSelection
        this.dialog.abilityPath = R.append(selection.index, this.dialog.abilityPath)
      }
    },
    handleIntegerInteraction () {
      this.ability.clickedBtn.label = this.selectedCount
      this.attachToAbility(this.dialog.btn.abilityPath, this.selectedCount)
      // reset selectedCount
      // this.selectedCount = 0
      console.log('ability after handleInteger: ', this.ability)
    },
    handleStringInteraction () {
      this.ability.clickedBtn.label = this.selectedString
      this.attachToAbility(this.dialog.btn.abilityPath, this.selectedString)

      console.log('ability after handleString: ', this.ability)
    },
    handleBoolInteraction () {
      this.ability.clickedBtn.label = this.dialog.options[0].value ? R.dropLast(1, this.dialog.btn.label) + '!' : '-'
      this.attachToAbility(this.dialog.btn.abilityPath, this.dialog.options[0].value ? this.dialog.options[0].value : false)

      console.log('ability after handleBool: ', this.ability)
    },
    handleCreateAbility () {
      let selection = filterSelection(this.dialog.options)
      let interactionText = atPath(this.$cardRules, R.append(selection.index, this.dialog.rulesPath)).interactionText

      let abilityPath = [selection.index]
      let rulesPath = climbRulesTree(this.$cardRules, R.append(selection.index, this.dialog.rulesPath))

      let newAbility = {
        interaction: createInteraction(interactionText, abilityPath, rulesPath, this.$cardRules) 
      }
      newAbility[selection.index] = {
        path: this.dialog.rulesPath
      }
      this.abilities.push(newAbility)
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
      let ability = R.assocPath(path, object, this.ability)
      this.$emit('update:ability', ability)
    },
    /*
    updateAbility (reference) {
      let ability = reference
      this.$emit('update:ability', ability)
    },*/
  }
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
