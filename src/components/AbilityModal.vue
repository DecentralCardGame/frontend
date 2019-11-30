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

export default {
  name: 'modal',
  data () {
    return {
    }
  },
  props: {
    picked: Object,
    dialog: Object,
    elements: Object,
    currentNode: Object,
    abilities: Array
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addAbility () {
      console.log("dialog options: ", this.dialog.options)

      if(this.dialog.options[0].value === 'triggeredAbility' || this.dialog.options[0].value === 'activatedAbility') {
        this.abilities.push(this.elements[this.dialog.options[0].value])
        console.log('abilities: ', this.abilities)
      }
      else if(this.dialog.type === 'multivalue') {
        this.currentNode.type = this.dialog.type
        this.currentNode.values = []
        var label = ''

        this.dialog.options.forEach((item,index) => {
            if(item.value) {
              this.currentNode.values.push({name: item.name, amount: item.value})
              if(index !== 0) label += ', '
              label += item.value + ' ' + item.title
            }
        })

        this.currentNode.interaction[0] = {pre: 'Pay ', btn: label, post: 'to ', type: 'cost'}

        console.log("current node: ", this.currentNode)
      }

      this.$emit('close')
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
