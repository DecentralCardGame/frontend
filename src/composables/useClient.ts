import { Client } from "decentralcardgame-cardchain-client-ts/index";

import { env } from "@/env";
import type { IgniteClient } from "decentralcardgame-cardchain-client-ts/client";

const useClientInstance: () => InstanceType<typeof Client> = () => {
  const client = new Client(env);
  return client;
};
let clientInstance: ReturnType<typeof useClientInstance>;

export const useClient: () => InstanceType<typeof Client> = () => {
  if (!clientInstance) {
    clientInstance = useClientInstance();
  }
  return clientInstance;
};
