<script>
// import * as R from 'ramda'
import { notify } from './utils.js'

export default {
  name: 'modal',
  data () {
    return {
      yes: 1
    }
  },
  mounted () {
    console.log('yes')
  },
  methods: {
    close () {
      this.$emit('close')
    },
    buyCardScheme () {
      this.$emit('close')
    }
  }
}
</script>
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
            Add new ability
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
            select: {{something}}
          <br>
            for real: {{everything}}
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            Your choice: {{yes}}
          </slot>
          <button
              type="button"
              class="btn-teal"
              @click="buyCardScheme"
              aria-label="Close modal">
              YES
            </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

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
