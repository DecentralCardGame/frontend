import { useTx } from "@/def-composables/useTx";
import { ref, watch, type Ref, computed } from "vue";
import * as R from "ramda";
import type { SingleVote } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain";
import type { VoteType } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting";
import { useUser } from "./useUser";

const KEY = "votingList";
const { multiVoteCard } = useTx();
const { user, queryUser } = useUser();

let stored = window.localStorage.getItem(KEY);
const votes: Ref<SingleVote[]> = ref(
  stored ? Object.assign([], JSON.parse(stored)) : []
);
const votableCards = computed(() => user.value.votableCards.map(v => Number(v)));
const cardsLeft = computed(() => {
  let taken = votes.value.map((v) => v.cardId);
  return votableCards.value.filter((v) => !taken.includes(v));
});
const current = computed(() => cardsLeft.value.at(0));
const next = computed(() => cardsLeft.value.at(1));

watch(
  () => R.clone(votes.value),
  (currentValue) => {
    console.log("Saving current votes: ", currentValue);
    window.localStorage.setItem(KEY, JSON.stringify(currentValue));
  }
);

const send = (then: (res: any) => void, err: (res: any) => void) => {
  console.log("send", votes.value);
  multiVoteCard(
    votes.value,
    (res: any) => {
      queryUser().then(() => {
        votes.value = [];
      });
      then(res);
    },
    err
  );
};

const add = (cardId: number, voteType: VoteType) => {
  console.log("vote ", voteType, " for ", cardId);
  votes.value.push({
    cardId,
    voteType,
  });
};

const isEmpty = computed(() => votes.value.length == 0);

export const useVoting = () => {
  return { add, send, isEmpty, current, next, cardsLeft };
};
