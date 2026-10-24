import { Client } from 'decentralcardgame-cardchain-client-ts'
import { env } from "@/env";
import { adaptDevelopmentChainApi } from "./developmentChainApi";

const useClientInstance = () => {
  const client = new Client(env);
  if (import.meta.env.VITE_APP_DEVELOPMENT_CHAIN_API === "true") {
    adaptDevelopmentChainApi(client.DecentralCardGameCardchainCardchain.query.instance);
  }
  return client;
};
let clientInstance: ReturnType<typeof useClientInstance>;

export const useClient: () => any = () => {
  if (!clientInstance) {
    clientInstance = useClientInstance();
  }
  return clientInstance;
};