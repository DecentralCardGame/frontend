const apiURL = import.meta.env.VITE_API_COSMOS ?? "http://localhost:1317";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "http://localhost:26657";


export const env = {
  apiURL,
  rpcURL,
  apiNode: import.meta.env.VITE_APP_API_COSMOS,
  rpcNode: import.meta.env.VITE_APP_API_TENDERMINT,
  wsNode: import.meta.env.VITE_APP_WS_TENDERMINT,
  getTXApi: import.meta.env.VITE_APP_API_TENDERMINT + '/tx?hash=0x',
  chainId: import.meta.env.VITE_APP_CHAIN_ID,
  addrPrefix: import.meta.env.VITE_APP_ADDRESS_PREFIX,
  chainName: import.meta.env.VITE_APP_CHAIN_NAME,
  prefix: import.meta.env.VITE_APP_ADDRESS_PREFIX,
  faucetSiteKey: import.meta.env.VITE_APP_FAUCET_SITEKEY,
  faucetNode: import.meta.env.VITE_APP_FAUCET,
  cardImgMaxKB: import.meta.env.VITE_APP_CARDIMG_MAXKB,
  cardImgSizeX: import.meta.env.VITE_APP_CARDIMG_SIZE_X,
  cardImgSizeY: import.meta.env.VITE_APP_CARDIMG_SIZE_Y,
  offline: false,
  sdkVersion: 'Stargate',
  starportUrl: 'http://localhost:12345',
  refresh: 5000
};

export const setFallback = (apiFallback: boolean) => {
  env.apiNode = apiFallback ? import.meta.env.VITE_APP_API_COSMOS_FALLBACK : import.meta.env.VITE_APP_API_COSMOS
  env.rpcNode = apiFallback ? import.meta.env.VITE_APP_API_TENDERMINT_FALLBACK : import.meta.env.VITE_APP_API_TENDERMINT
  env.wsNode = apiFallback ? import.meta.env.VITE_APP_WS_TENDERMINT_FALLBACK : import.meta.env.VITE_APP_WS_TENDERMINT
  env.getTXApi = (apiFallback ? import.meta.env.VITE_APP_API_TENDERMINT_FALLBACK : import.meta.env.VITE_APP_API_TENDERMINT) + '/tx?hash=0x'
}