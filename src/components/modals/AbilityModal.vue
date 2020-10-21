<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
      <div
          aria-describedby="modalDescription"
          aria-labelledby="modalTitle"
          class="modal"
          role="dialog"
      >
        <header
            id="modalTitle"
            class="modal__header"
        >
          <slot name="header">
            {{ dialog.title }}
            <!-- TODO --><span
              aria-label="Close modal"
              class="btn--close"
              type="button"
              @click="close"
          >
              x
            </span>
          </slot>
        </header>
        <section
            id="modalDescription"
            class="modal__body choice-grid"
        >
          <slot name="body">
            <!-- {{ dialog.description }} -->
            <div
                v-for="(option, index) in dialog.options"
                :key="index"
            >
              <input v-if="dialog.type==='boolean'"
                     id="index"
                     v-model="option.value"
                     :value="option.name"
                     type="checkbox"
              >
              <button v-if="dialog.type === 'enum'"
                      aria-label="Close modal"
                      class="choice-grid__button"
                      type="button"
                      @click="selectedString = option.name; addAbility();"
              >
                <img :src="getIcon(option)"
                     style="max-width:40px"
                /><br>
                <b>{{ option.name }}</b><br> - <span v-if="option.description">  {{ option.description }} </span>
              </button>

              <input v-if="dialog.type==='stringEnter'" v-model="selectedString"
                     placeholder="enter text"
                     style="display: inline;color:black;height:50px"
              >

              <button v-if="dialog.type === 'interface' || dialog.type === 'root'"
                      aria-label="Close modal"
                      class="choice-grid__button"
                      type="button"
                      @click="option.selected = true; addAbility();"
              >
                <img :src="getIcon(option)"
                     style="max-width:40px"
                /><br>
                <b>{{ option.name }}</b><br> <span v-if="option.description">  {{ option.description }} </span>
              </button>

              <label v-if="dialog.type !== 'interface' && dialog.type !== 'root' && dialog.type !== 'enum'"
                     for="index"> {{ option.name }}
              </label>
            </div>
            <div>
              <span v-if="dialog.type==='int'"> {{ selectedCount }} </span>
            </div>
          </slot>
        </section>
        <footer class="modal__footer">
          <slot name="footer">
            {{ picked }}
          </slot>
          <button v-if="dialog.type !== 'interface' && dialog.type !== 'root'"
                  aria-label="Close modal"
                  class="btn--teal"
                  type="button"
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
import {atPath, createInteraction, filterSelection, icon, updateInteraction} from '../utils/utils.js'

export default {
  name: 'Modal',
  props: {
    picked: {},
    dialog: {},
    options: [],
    ability: {},
    abilities: []
  },
  mounted() {
  },
  data() {
    return {
      selectedCount: 0,
      selectedString: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getIcon(option) {
      return icon(R.toLower(R.split(' ', R.split('-', option.name)[0])[0]))
    },
    addAbility() {
      console.log('dialog type:', this.dialog.type)

      switch (this.dialog.type) {
        case 'interface':
          this.handleInterface()
          break
        case 'root':
          this.handleCreateAbility()
          break
        case 'enum':
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
        this.dialog.preventClose = false
        this.dialog.btn.label = 'no condition'
        console.log('this.dialog', this.dialog)

        // check if a terminal option was selected
      } else if (objAtSelection.type === 'terminal') {
        this.dialog.preventClose = false
        this.dialog.btn.label = objAtSelection.interactionText
        this.dialog.type = 'interface'
        //this.attachToAbility(this.dialog.btn.abilityPath, objAtSelection.interactionText) // check if this is only deactivated temporarily or can be removed forever. is it because terminal is now dropdown selected?

        // check if an option was selected, which has an interaction text
      } else if (objAtSelection.interactionText) {
        this.dialog.preventClose = false
        let interactionText = objAtSelection.interactionText
        let abilityPath = R.append(selection.index, this.dialog.abilityPath)
        let rulesPath = pathAtSelection
        let newInteraction = createInteraction(interactionText, abilityPath, R.append('children', rulesPath), this.$cardRules)


        updateInteraction(this.ability, this.ability.clickedBtn.id, newInteraction)
        this.attachToAbility(['interaction'], this.ability.interaction)
        console.log('this.ability after updateInteraction', this.ability)
        if (objAtSelection.singleUse) {
          this.attachToAbility(this.dialog.btn.abilityPath, {singleUse: selection.index})
        } else {
          this.attachToAbility(this.dialog.btn.abilityPath, {})
        }
      } else if (objAtSelection.type === 'int') {
        this.dialog.preventClose = false
        this.dialog.btn.type = "int"
        this.dialog.btn.rulesPath = pathAtSelection
        this.dialog.btn.abilityPath = R.append(selection.index, this.dialog.abilityPath)
      } else if (objAtSelection.type === 'enum') {
        this.dialog.preventClose = true
        this.dialog.title = objAtSelection.name
        this.dialog.type = objAtSelection.type
        this.dialog.options = R.map(x => ({name: x}), objAtSelection.children)
        this.dialog.btn.rulesPath = pathAtSelection
        this.dialog.btn.abilityPath = R.append(selection.index, this.dialog.abilityPath)
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
      console.log('ability after handleInterface: ', this.ability)
    },
    handleStringInteraction() {
      this.dialog.preventClose = false
      this.ability.clickedBtn.label = this.selectedString
      this.attachToAbility(this.dialog.btn.abilityPath, this.selectedString)

      console.log('ability after handleString: ', this.ability)
    },
    handleBoolInteraction() {
      this.ability.clickedBtn.label = this.dialog.options[0].value ? R.dropLast(1, this.dialog.btn.label) + '!' : '-'
      this.attachToAbility(this.dialog.btn.abilityPath, this.dialog.options[0].value ? this.dialog.options[0].value : false)

      console.log('ability after handleBool: ', this.ability)
    },
    handleCreateAbility() {
      let atRules = R.curry(atPath)(this.$cardRules)

      let selection = filterSelection(this.dialog.options)
      let pathAtSelection = R.concat(this.dialog.rulesPath, [selection.index])
      let objAtSelection = atRules(pathAtSelection)
      let interactionText = atPath(this.$cardRules, R.append(selection.index, this.dialog.rulesPath)).interactionText

      let abilityPath = [selection.index]
      let rulesPath = R.concat(this.dialog.rulesPath, [selection.index, 'children'])

      if (!objAtSelection.interactionText) {
        let newAbility = {
          interaction: createInteraction('§' + selection.index, [], this.dialog.rulesPath, this.$cardRules)
        }
        newAbility.clickedBtn = newAbility.interaction[0].btn
        newAbility[selection.index] = {
          path: this.dialog.rulesPath
        }
        this.ability = newAbility
        this.abilities.push(newAbility)

        this.attachToAbility(['interaction'], newAbility.interaction)
        this.attachToAbility([selection.index, 'path'], this.dialog.rulesPath)
        this.attachToAbility(['clickedBtn'], newAbility.interaction[0].btn)

        // if there is no interaction text, don't close modal and present new options
        this.dialog.preventClose = false
        this.dialog.btn = {abilityPath: []}
        this.dialog.interactionText = objAtSelection.interactionText
        this.dialog.title = objAtSelection.name
        this.dialog.description = objAtSelection.description
        this.dialog.type = objAtSelection.type
        this.dialog.options = objAtSelection.children
        this.dialog.rulesPath = pathAtSelection
        this.dialog.abilityPath = R.append(selection.index, this.dialog.abilityPath)

        return
      }

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
    attachToAbility(path, object) {
      let ability = R.assocPath(path, object, this.ability)
      this.$emit('update:ability', ability)
    },
  }
}

</script>

<style lang="scss">
@import "modal";
</style>
