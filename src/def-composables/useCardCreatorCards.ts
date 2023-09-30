import { Card } from "@/model/Card";
import { ref, watch, type Ref } from "vue";
import * as R from "ramda";

class UseCardCreatorCard {
  key: string;
  card: Ref<Card>;

  constructor(key: string) {
    this.key = key;
    let stored = window.localStorage.getItem(key);
    this.card = ref(
      stored !== null
        ? Object.assign(new Card(), JSON.parse(stored))
        : new Card()
    );

    watch(
      () => R.clone(this.card.value),
      (currentValue, oldValue) => {
        this.set(currentValue);
      }
    );
  }

  set(card: Card) {
    window.localStorage.setItem(this.key, JSON.stringify(card));
  }
}

class Cards {
  editCard: UseCardCreatorCard;
  draft: UseCardCreatorCard;

  constructor() {
    this.editCard = new UseCardCreatorCard("editCard");
    this.draft = new UseCardCreatorCard("draft");
  }
}

let cardsInstance: Cards;

export const useCardCreatorCards = () => {
  if (!cardsInstance) {
    cardsInstance = new Cards();
  }
  return cardsInstance;
};
