<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
      >
        <header id="modalTitle" class="modal__header">
          <slot name="header">
            Card Frame Auction
            <button
              aria-label="Close modal"
              class="btn--close"
              type="button"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>
        <section id="modalDescription" class="modal__body">
          <slot name="body">
            <table class="table--buy-scard-frame">
              <tr>
                <td>You have:</td>
                <td>
                  <b>{{ state.ownedCardFrames }} Card Frames</b>
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td>Current price:</td>
                <td>
                  <b>{{ state.currentPrice }}</b>
                </td>
                <td>credits</td>
              </tr>
              <tr>
                <td>You have:</td>
                <td>
                  <b>{{ state.creditsAvailable }} </b>
                </td>
                <td>credits</td>
              </tr>
              <tr>
                <td>Your bid:</td>
                <td>
                  <input
                    v-model="state.currentBid"
                    :placeholder="[[state.currentBid]]"
                    size="3"
                    type="text"
                    @keypress="isNumber($event)"
                  />
                </td>
                <td>credits</td>
              </tr>
            </table>
          </slot>
        </section>
        <footer class="modal__footer">
          <slot name="footer" />
          <button
            aria-label="Close modal"
            class="btn--default"
            type="button"
            @click="buyCardFrame"
          >
            Buy
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useQuery } from "@/def-composables/useQuery";
import { useTx } from "@/def-composables/useTx";
import { Coin } from "@/model/Coin";
import { computed, type ComputedRef, onMounted, reactive } from "vue";
import { useUser } from "@/def-composables/useUser";

const { queryQCardchainInfo } = useQuery();
const { buyCardScheme } = useTx();
const { user, coins, queryUser, queryCoins } = useUser();

const emit = defineEmits(["close"]);

const initialState: {
  ownedCardFrames: ComputedRef<number>,
  currentPrice: number,
  currentBid: number,
  creditsAvailable: ComputedRef<number>
} = {
  ownedCardFrames: computed(() => user.value.ownedCardSchemes.length),
  currentPrice: -1,
  currentBid: -1,
  creditsAvailable: computed(() => {
    let usableCoins: Coin[] = coins.value.filter((coin: Coin) => coin.denom == "ucredits");
    if (usableCoins.length == 0) {
      throw new Error("No usable coins available");
    }
    return Coin.from(usableCoins[0]).normalize().amount;
  })
};

const state = reactive(initialState);

onMounted(() => {
  queryQCardchainInfo({})
    .then(res => {
      console.log(res);
      let credits = res.cardAuctionPrice.normalize().amount;
      state.currentBid = credits;
      state.currentPrice = credits;
    })
    .catch(res => {
      console.error(res);
      close();
    });
})

const close = () => emit("close");
const buyCardFrame = () => {
  emit("close");
  buyCardScheme(
    new Coin("credits", state.currentBid).denormalize().toCompatCoin(),
    () => {queryUser(); queryCoins()},
    console.log
  );
};
const isNumber = (evt: any) => {
  evt = evt || window.event;
  let charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}
</script>

<style>

.table--buy-scard-frame {
  td {
    text-align: right;
    padding: 0.25rem;
  }

  input {
    padding: 0;
    margin: 0;
    display: inline;
    color: $black;
    text-align: right;
    background-color: lightgray;
    font-weight: bold;
  }
}
</style>