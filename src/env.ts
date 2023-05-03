export const env = {
  apiURL: import.meta.env.VITE_API_COSMOS,
  rpcURL: import.meta.env.VITE_WS_TENDERMINT,
  chainId: import.meta.env.VITE_APP_CHAIN_ID,
  addrPrefix: import.meta.env.VITE_APP_ADDRESS_PREFIX,
  chainName: import.meta.env.VITE_APP_CHAIN_NAME,
  prefix: import.meta.env.VITE_APP_ADDRESS_PREFIX,
  faucetSiteKey: import.meta.env.VITE_APP_FAUCET_SITEKEY,
  faucetNode: import.meta.env.VITE_APP_FAUCET,
  cardImgMaxKB: import.meta.env.VITE_APP_CARDIMG_MAXKB,
  cardImgSizeX: import.meta.env.VITE_APP_CARDIMG_SIZE_X,
  cardImgSizeY: import.meta.env.VITE_APP_CARDIMG_SIZE_Y,
};

export const setFallback = (apiFallback: boolean) => {
  env.apiURL = apiFallback ? import.meta.env.VITE_API_COSMOS_FALLBACK : import.meta.env.VITE_API_COSMOS
  env.rpcURL = apiFallback ? import.meta.env.VITE_WS_TENDERMINT_FALLBACK : import.meta.env.VITE_WS_TENDERMINT
}