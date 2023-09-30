import { useTx } from "@/def-composables/useTx";
import { ref, watch, type Ref } from "vue";
import * as R from "ramda";
import type { SingleVote } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain";
import type { CardchainVoteRight } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/rest";

const KEY = "votingList";

const useVotingInstance = () => {
  const { multiVoteCard } = useTx();

  let stored = window.localStorage.getItem(KEY);
  const votes: Ref<SingleVote[]> = ref(
    stored ? Object.assign([], JSON.parse(stored)) : []
  );

  watch(
    () => R.clone(votes.value),
    (currentValue, oldValue) => {
      console.log(currentValue);
      window.localStorage.setItem(KEY, JSON.stringify(currentValue));
    }
  );

  const send = (then: (res: any) => void, err: (res: any) => void) => {
    console.log("send", votes.value);
    multiVoteCard(
      votes.value,
      (res: any) => {
        votes.value = [];
        then(res);
      },
      err
    );
    votes.value = [];
  };

  const add = (cardId: number, voteType: string) => {
    votes.value.push({
      cardId,
      voteType,
    });
  };

  const isEmpty = () => {
    return votes.value.length == 0;
  };

  const filterCards = (voteRights: CardchainVoteRight[]) => {
    return voteRights.filter((right: CardchainVoteRight) => {
      for (const vote of votes.value) {
        if (right.cardId == vote.cardId.toString()) {
          return false;
        }
      }
      return true;
    });
  };

  return { add, send, isEmpty, filterCards };
};

let instance: ReturnType<typeof useVotingInstance>;

export const useVoting = () => {
  if (!instance) {
    instance = useVotingInstance();
  }
  return instance;
};
