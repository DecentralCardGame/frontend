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

              <button v-if="dialog.type==='enum'" type="enumbtn"
                v-model="option.value" @click="addToArray(index, arrayCount)" id="index" :value="option.name">
                {{option.name}} {{arrayCount[index]}}
              </button>

              <input v-if="dialog.type==='root'" type="radio"
                v-model="option.value" id="index" :value="option.name"
              >

              <label for="index">{{option.title}}</label>

              <span v-if="option.description"> - {{option.description}} </span>
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
import { filterSelection, filterProperties, resolveParagraph, copy } from './utils.js'

export default {
  name: 'modal',
  data () {
    return {
      arrayCount: [0,0,0,0,0,0]
    }
  },
  props: {
    picked: Object,
    dialog: Object,
    options: Object,
    currentNode: Object,
    abilities: Array
  },
  mounted: () => {
    console.log('currentNode: ', this.currentNode)
    //this.arrayCount = [0,0,0,0,0,0]
    //console.log('arrCo: ',this.arrayCount)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addAbility () {
      
      console.log("dialog options: ", this.dialog.options)
      console.log("type:", this.dialog.type)

      if (this.dialog.type === 'root') {
        let selection = filterSelection(this.dialog.options).option.value
        let properties = filterProperties(this.options, selection)
        let newAbility = {}
        newAbility[resolveParagraph(selection)] = copy(properties.properties)[resolveParagraph(selection)]
        newAbility.interaction = createInteraction(newAbility[resolveParagraph(selection)].description)
        newAbility.name = resolveParagraph(selection)

        this.abilities.push(newAbility)

        console.log("newAbility: ", newAbility)

      } else if (this.dialog.type === 'multivalue') {
        this.currentNode.type = this.dialog.type
        this.currentNode.values = []
        var label = ''

        this.dialog.options.forEach((item, index) => {
          if (item.value) {
            this.currentNode.values.push({name: item.name, amount: item.value})
            if (index !== 0) label += ', '
            label += item.value + ' ' + item.title
          }
        })

        this.currentNode.interaction[0] = {pre: 'Pay ', btn: label, post: 'to ', type: 'cost'}

        console.log("current node: ", this.currentNode)
      } else if (this.dialog.type === 'enum') {
        console.log('yes')
        console.log(this.dialog.options)
        this.currentNode = this.dialog.options
        console.log(this.currentNode)
      } else if (this.dialog.type === 'radio') {

      } else {
        console.log ('this type is unkown: ', this.dialog.type)
      }

      this.$emit('close')
    },
    addToArray(id, array) {
      console.log(this.arrayCount)
      this.arrayCount[id] += 1
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

function createInteraction(description) {
  let text = description
  let regex=/([§]+)([a-z,A-Z]+)/g
  text = text.replace(regex, "$1%$2§");
  text = text.split('§')

  console.log(text)

  let interaction = []

  text.forEach(entry => {

    if (entry[0] === '%') {
      interaction[interaction.length-1].btn = entry.slice(1)
    } else {
      interaction.push({pre: entry, btn: ''})
    }
  })

  if (interaction[interaction.length-1].btn === '') {
    interaction[interaction.length-2].post = interaction[interaction.length-1].pre
    interaction.splice(-1,1)
  }

  console.log('result: ',interaction)
  return interaction
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
