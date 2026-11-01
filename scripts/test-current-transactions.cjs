const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const EventEmitter = require('node:events');
const {Registry} = require('@cosmjs/proto-signing-current');
const {currentRoot,currentMessage,currentMessageTypes,currentMessageNames,installCurrentChainTransactions} = require('./load-current-transactions.cjs');
const registry = new Registry(currentMessageTypes);
const actor = 'cc1test';
const content = new TextEncoder().encode(JSON.stringify({Action:{CardName:'Äther 世界'}}));
const image = 'data:image/png;base64,iVBORw0KGgo=';
const samples = {
 RegisterForCouncil:{},RewokeCouncilRegistration:{},BuyCardScheme:{bid:{denom:'ucredits',amount:'1000000'}},
 CreateCouncil:{cardId:3},CommitCouncilResponse:{councilId:2,response:'hash',suggestion:'suggestion'},
 RevealCouncilResponse:{councilId:2,response:2,secret:'secret'},RestartCouncil:{councilId:2},
 SaveCardContent:{cardId:'9007199254740993',content,notes:'note',artist:actor,balanceAnchor:true,parameters:[{key:'a',value:'b'}]},
 AddArtwork:{cardId:3,image:btoa(image),fullArt:true},VoteCard:{cardId:3,voteType:'underpowered'},
 TransferCard:{cardId:3,receiver:'cc1other'},SetProfileCard:{cardId:3},MultiVoteCard:{votes:[{cardId:3,voteType:2}]},
 Createuser:{newUser:'cc1other',alias:'test'},InviteEarlyAccess:{user:'cc1other'},DisinviteEarlyAccess:{user:'cc1other'},
 EncounterCreate:{name:'test',Drawlist:[3,4],parameters:{a:'b'},image:btoa(image)},
 EncounterDo:{encounterId:2,user:actor},EncounterClose:{encounterId:2,user:actor,won:true},
 BuyBoosterPack:{setId:1},OpenBoosterPack:{boosterPackId:1},ConfirmMatch:{matchId:1,outcome:0,votedCards:[]}
};
const fixtures=[];
for(const name of Object.keys(currentMessageNames)){
 assert(samples[name],name);
 const msg=currentMessage(name,{creator:actor,fromAddress:actor,...samples[name]});
 const wire=registry.encode(msg);
 const type=currentRoot.lookupType(msg.typeUrl.slice(1));
 const decoded=type.decode(wire);
 assert.equal(decoded.creator,actor);
 assert.equal(type.verify(decoded),null);
 const data=type.toObject(decoded,{longs:String,bytes:String,enums:String});
 fixtures.push({name,typeUrl:msg.typeUrl,bytes:Buffer.from(wire).toString('base64'),decoded:data});
 if(name==='SaveCardContent'){
  assert.deepEqual(Buffer.from(decoded.content),Buffer.from(content));
  assert.equal(decoded.cardId.toString(),'9007199254740993');
  assert.equal(decoded.parameters[0].key,'a');assert.equal(decoded.balanceAnchor,true);
 }
 if(name==='AddArtwork')assert.equal(new TextDecoder().decode(decoded.image),image);
 if(name==='VoteCard'){assert.equal(decoded.vote.cardId.toNumber(),3);assert.equal(decoded.vote.voteType,3);}
 if(name==='EncounterCreate'){assert.deepEqual(decoded.drawlist.map(x=>x.toNumber()),[3,4]);assert.equal(decoded.parameters[0].value,'b');}
}
for(const value of [{cardId:Number.MAX_SAFE_INTEGER+1},{cardId:'18446744073709551616'},{extra:'lost'}, {content:'bad base64!'}]){
 assert.throws(()=>currentMessage('SaveCardContent',{creator:actor,...value}));
}
assert.throws(()=>currentMessage('VoteCard',{creator:actor,cardId:1,voteType:'not-a-vote'}));
assert.throws(()=>currentMessage('NotMapped',{creator:actor}));
const client=new EventEmitter();client.registry=[];client.DecentralCardGameCardchainCardchain={tx:{}};
client.on('signer-changed',()=>{client.DecentralCardGameCardchainCardchain.tx={old:true};});
installCurrentChainTransactions(client);
client.emit('signer-changed');
assert.equal(client.DecentralCardGameCardchainCardchain.tx.msgSaveCardContent({value:{creator:actor,...samples.SaveCardContent}}).typeUrl,'/cardchain.cardchain.MsgCardSaveContent');
assert.throws(()=>client.DecentralCardGameCardchainCardchain.tx.sendMsgMissing);
assert.equal(client.registry.length,Object.keys(samples).length);
const source=fs.readFileSync(path.join(__dirname,'../src/def-composables/useTx.ts'),'utf8');
for(const name of [...source.matchAll(/\.sendMsg(\w+)/g)].map(m=>m[1])){
 if(!['Send','Grant','Revoke'].includes(name)) assert(name in currentMessageNames,name);
}
if(process.env.TX_FIXTURES_OUT)fs.writeFileSync(process.env.TX_FIXTURES_OUT,JSON.stringify(fixtures,null,2));
console.log('PASS: all 22 mapped message codecs, UTF-8/bytes/uint64/nested fields/enums, fail-closed validation, signer refresh and frontend method coverage.');
