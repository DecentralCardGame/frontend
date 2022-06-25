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
            Choose profile card
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
          <div
            v-for="obj in images"
            :key="obj"
            class="sppBox"
          >
            <img
              :src="obj.img"
              @click="send(obj.id)"
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from 'ramda'
import {atPath, createInteraction, filterSelection, icon, updateInteraction} from '../utils/utils.js'

export default {
  name: 'ChoosePBModal',
  props: {
    cards: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      images: []
    }
  },
  mounted() {
    for (let i = 0; i < this.cards.length; i++) {
      this.getCard(this.cards[i])
    }
    console.log(this.cards)
  },
  methods: {
    async getCard(id) {
      return this.$cardChain.getCard(id).then((res) => {
        console.log(res)
        if (["permanent", "trial"].includes(res.status)) {
          this.images.push({id: id, img: res.image})
        }
      })
      .catch(err => {
        return
      })
    },
    close() {
      this.$emit('close')
    },
    send(id) {
      this.$cardChain.setProfileCard(id).then(res => {
        console.log(res)
        this.close()
      })
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

.sppBox {
  margin: 10px;
  height: 150px;
  width: 150px;
  overflow: hidden;
  display: inline-block;
  border-radius: 50%;
  box-shadow: 2px 2px 4px;
  img {
    background-color: transparent;
    object-fit: contain;
    padding-top: -10%;
    width: 100%;
    cursor: pointer;
  };
}
.sppBox:hover {
  box-shadow: 4px 4px 8px;
}

.warning {
  color: red;
}
</style>
