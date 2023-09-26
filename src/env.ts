type ApiSet = {
  apiURL: string,
  rpcURL: string
}

interface Env {
  apiURL: string,
  rpcURL: string
  chainId: string,
  apiSets: Array<ApiSet>,
  chainName: string,
  prefix: string,
  faucetSiteKey: string,
  faucetNode: string,
  cardImgMaxKB: number,
  cardImgSizeX: number,
  cardImgSizeY: number,
}

export const env: Env = {
  apiURL: import.meta.env.VITE_API_COSMOS,
  rpcURL: import.meta.env.VITE_WS_TENDERMINT,
  chainId: import.meta.env.VITE_APP_CHAIN_ID,
  apiSets : [
    {
      apiURL: import.meta.env.VITE_API_COSMOS,
      rpcURL: import.meta.env.VITE_WS_TENDERMINT
    },
    {
      apiURL: import.meta.env.VITE_API_COSMOS_FALLBACK,
      rpcURL: import.meta.env.VITE_WS_TENDERMINT_FALLBACK
    }
  ],
  chainName: import.meta.env.VITE_APP_CHAIN_NAME,
  prefix: import.meta.env.VITE_APP_ADDRESS_PREFIX,
  faucetSiteKey: import.meta.env.VITE_APP_FAUCET_SITEKEY,
  faucetNode: import.meta.env.VITE_APP_FAUCET,
  cardImgMaxKB: import.meta.env.VITE_APP_CARDIMG_MAXKB,
  cardImgSizeX: import.meta.env.VITE_APP_CARDIMG_SIZE_X,
  cardImgSizeY: import.meta.env.VITE_APP_CARDIMG_SIZE_Y,
};

export const setApiSet = (id: number) => {
  let apiSet = env.apiSets[id]

  env.apiURL = apiSet.apiURL
  env.rpcURL = apiSet.rpcURL
}