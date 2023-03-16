<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1000;"
    >
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
        @click.stop="doNothing"
      >
        <header
          id="modalTitle"
          class="modal__header"
        >
          <slot name="header">
            Transfer card
          </slot>
          <button
            aria-label="Close modal"
            type="button"
            class="btn--close"
            @click="close"
          >
            x
          </button>
        </header>
        <div class="modal__body input--transfer">
          Transfer card {{ card }} to
          <input
            v-model="recipient"
            type="text"
            placeholder="'recipient'"
          >
          <button
            class="btn--default"
            @click="send"
          >
            Send
          </button>
          <a
            v-show="warningText"
            class="warning"
          >
            <br>{{ warningText }}
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang=ts>

import { validAddress } from "@/utils/validation";
import { useTx } from "@/def-composables/useTx";

export default {
  name: 'TransferCardModal',
  props: {
    card: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      recipient: "",
      warningText: "",
    }
  },
  setup() {
    const { transferCard } = useTx()

    return { transferCard }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    send() {
      if (!validAddress(this.recipient)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.warningText = ""
      this.transferCard(this.card, this.recipient, _ => {
        this.close()
      }, () => {})
    }
  }
}

</script>

<style lang="scss">
@import "modal";

.input--transfer {
  input {
    padding: 0;
    margin-right: 2px;
    display: inline;
    color: $black;
    text-align: right;
    background-color: lightgray;
  }
  select {
    color: $black;
    background-color: lightgray;
    display: inline;
  }
}

.warning {
  color: red;
}
</style>
