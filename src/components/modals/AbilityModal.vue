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
                        <!-- TODO --><span
                            type="button"
                            class="btn-close"
                            aria-label="Close modal"
                            @click="close"
                    >
              x
            </span>
                    </slot>
                </header>
                <section
                        id="modalDescription"
                        class="modal-body choice-grid"
                >
                    <slot name="body">
                        <!-- {{ dialog.description }} -->
                        <div
                          v-for="(option, index) in dialog.options"
                          :key="index"
                        >
                            <input v-if="dialog.type==='boolean'"
                              type="checkbox"
                              id="index"
                              v-model="option.value"
                              :value="option.name"
                            >
                            <button v-if="dialog.type === 'enum'"
                              type="button"
                              class="choice-grid-button"
                              aria-label="Close modal"
                              @click="selectedString = option.name; addAbility();"
                            >
                              <img :src="getIcon(option)"
                                style="max-width:40px"
                              /><br>
                              <b>{{option.name}}</b><br> - <span v-if="option.description">  {{option.description}} </span>
                            </button>

                            <input v-if="dialog.type==='stringEnter'" style="display: inline;color:black;height:50px"
                              placeholder="enter text"
                              v-model="selectedString"
                            >

                            <button v-if="dialog.type === 'interface' || dialog.type === 'root'"
                              type="button"
                                    class="choice-grid-button"
                              aria-label="Close modal"
                              @click="option.selected = true; addAbility();"
                            >
                              <img :src="getIcon(option)"
                                style="max-width:40px"
                              /><br>
                              <b>{{option.name}}</b><br> <span v-if="option.description">  {{option.description}} </span>
                            </button>

                            <label v-if="dialog.type !== 'interface' && dialog.type !== 'root' && dialog.type !== 'enum'"
                              for="index"> {{option.name}}
                            </label>
                        </div>
                        <div>
                            <span v-if="dialog.type==='int'"> {{selectedCount}} </span>
                        </div>
                    </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        {{picked}}
                    </slot>
                    <button v-if="dialog.type !== 'interface' && dialog.type !== 'root'"
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
    import {atPath, createInteraction, filterSelection, updateInteraction, icon} from '../utils/utils.js'

    export default {
        name: 'Modal',
        props: {
            picked: {},
            dialog: {},
            options: [],
            ability: {},
            abilities: []
        },
        mounted () {
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
                        interaction: createInteraction('§'+selection.index, [], this.dialog.rulesPath, this.$cardRules)
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
                    this.dialog.btn = { abilityPath: [] }
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
    @import "../../assets/styles/variables";

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
        background: $white;
        text-shadow: none;
        box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 0 rgba(0, 0, 0, 0.25);
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        @media (max-width: 480px) {
          height: 100vh;
        }
    }

    .modal-header,
    .modal-footer {
        padding: $font-size;
        display: flex;
    }

    .modal-header {
        border-bottom: $border-thickness solid $red;
        font-weight: bold;
        color: $red;
        justify-content: space-between;
    }

    .modal-body {
        position: relative;
        padding: ($font-size / 2);
        border-bottom: $border-thickness solid $red;
    }

    .btn-close {
        border: none;
        font-size: $font-size;
        padding: $font-size / 4;
        cursor: pointer;
        font-weight: bold;
        background: transparent;
    }

    .btn-green {
        background-color: transparent;
        border: none;
        color: $black;
        transition: all $animation-duration ease-out;

        &:after {
            z-index: -1;
            background: linear-gradient(to right, #4AAE9B 50%, $white 50%);
            background-size: 200% 100%;
            background-position: right bottom;
        }

        &:hover {
            color: $white;

            &:after {
                background-position: left bottom;
            }
        }
    }

    .btn-teal {
        background-color: transparent;
        border: none;
        color: $black;
        transition: all $animation-duration ease-out;

        &:after {
            z-index: -1;
            background: linear-gradient(to right, #12D1D1 50%, $white 50%);
            background-size: 200% 100%;
            background-position: right bottom;
        }

        &:hover {
            color: $white;

            &:after {
                background-position: left bottom;
            }
        }
    }

    .choice-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .choice-grid-button {
      margin: 0;
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      position: relative;
      -webkit-transition-property: color;
      transition-property: color;
      -webkit-transition-duration: $animation-duration;
      transition-duration: $animation-duration;
      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $white;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transform-origin: 0 50%;
        transform-origin: 0 50%;
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transition-duration: $animation-duration;
        transition-duration: $animation-duration;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
      }
      &:hover, &:focus, &:active {
        color: $white;
      }
      &:hover:before, &:focus:before, &:active:before {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
</style>