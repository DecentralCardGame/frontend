import { Client } from 'decentralcardgame-cardchain-client-ts'
import { env, setApiSet } from "@/env";

const useClientInstance = async (id: number = 0): Promise<Client> => {
  console.log(id)
  setApiSet(id);
  console.log(env)
  const client = new Client(env)
  try {
    await client.value.DecentralCardGameCardchainCardchain.query.queryQCardchainInfo({});
    console.log("Using apiSet number: " + id);
    return client
  } catch (e) {
    if (id + 1 < env.apiSets.length) {
      return await useClientInstance(id + 1);
    } else {
      throw Error("No working apisets found");
    }
  }
};

let clientInstance: Promise<Client>;

export const useClient = async () => {
  if (!clientInstance) {
    clientInstance = useClientInstance();
  }
  return await clientInstance;
};