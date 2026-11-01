const assert=require('node:assert/strict');
const path=require('node:path');
const {buildSync}=require('esbuild');
const root=path.resolve(__dirname,'..');
for(const enabled of [false,true]){
 const env={VITE_APP_DEVELOPMENT_CHAIN_API:String(enabled),VITE_API_COSMOS:'http://127.0.0.1:1',VITE_WS_TENDERMINT:'http://127.0.0.1:1',VITE_APP_CHAIN_ID:'isolated-test',VITE_APP_ADDRESS_PREFIX:'cc'};
 const code=buildSync({stdin:{contents:"export {useClient} from './src/composables/useClient';",resolveDir:root,loader:'ts'},bundle:true,write:false,alias:{'@':path.join(root,'src')},platform:'node',format:'cjs',define:{'import.meta.env':JSON.stringify(env)},logLevel:'silent'}).outputFiles[0].text;
 const loaded={exports:{}};new Function('module','exports','require','__dirname','__filename',code)(loaded,loaded.exports,require,__dirname,__filename);
 const client=loaded.exports.useClient();
 const value={creator:'cc1test',cardId:0,content:new Uint8Array([123,125]),notes:'',artist:'cc1test',balanceAnchor:false};
 for(const change of [()=>{},()=>client.useSigner({getAccounts:async()=>[],signDirect:async()=>{throw new Error('must not sign');}}),()=>client.removeSigner()]){
  change();
  const msg=client.DecentralCardGameCardchainCardchain.tx.msgSaveCardContent({value});
  assert.equal(msg.typeUrl,enabled?'/cardchain.cardchain.MsgCardSaveContent':'/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent');
  assert.equal(client.CosmosBankV1Beta1.tx.msgSend({value:{fromAddress:'cc1test',toAddress:'cc1other',amount:[]}}).typeUrl,'/cosmos.bank.v1beta1.MsgSend');
 }
}
console.log('PASS: actual SDK client wiring preserves legacy production messages and switches current messages, including signer connect/disconnect; bank messages unchanged.');
