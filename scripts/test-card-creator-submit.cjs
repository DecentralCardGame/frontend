const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {parse}=require('@vue/compiler-sfc');
const {parse:parseScript}=require('@babel/parser');
const {transformSync}=require('esbuild');
const {runTransactionTask}=require('./load-typescript-module.cjs')(path.resolve(__dirname,'../src/def-composables/transactionTask.ts'));
const {descriptor}=parse(fs.readFileSync(path.resolve(__dirname,'../src/views/CardCreatorPage.vue'),'utf8'));
const script=descriptor.script.content;
const component=parseScript(script,{sourceType:'module',plugins:['typescript']}).program.body.find(n=>n.type==='ExportDefaultDeclaration').declaration;
const method=component.properties.find(p=>p.key.name==='methods').value.properties.find(p=>p.key.name==='saveSubmit');
const compiled=transformSync(`module.exports = ({${script.slice(method.start,method.end)}}).saveSubmit`,{loader:'ts',format:'cjs'}).code;
const build=(send,query)=>{
 const m={exports:{}};
 new Function('module','saveCardUpdate','queryQUser','Mode','R','console',compiled)(m,send,query,{EDIT:0,CREATE:1},{isEmpty:a=>a.length===0},{log(){},error(){}});
 return m.exports;
};
const context=(mode,designateArtist)=>({mode,designateArtist,address:'cc1test',model:{id:42},cardUpdatePending:false,errors:[],resets:0,successes:0,
 validateCreatedCard(){return {content:{Action:{CardName:'Fixture'}},image:'fixture'};},
 notifyFail(...args){this.errors.push(args);},resetCard(){this.resets++;},successScreen(){this.successes++;}});
(async()=>{
 for(const mode of [0,1])for(const artist of [false,true]){
  const calls=[];let queries=0;
  const submit=build((...args)=>calls.push(args),async()=>{queries++;return {ownedCardSchemes:['42']};});
  const ctx=context(mode,artist);
  submit.call(ctx);submit.call(ctx);
  await new Promise(setImmediate);
  assert.equal(calls.length,1,'Duplicate click must not queue another wallet request');
  assert.equal(calls[0][0],42);assert.equal(calls[0][2],!artist);
  assert.equal(ctx.cardUpdatePending,true);assert.equal(ctx.successes,0);
  await runTransactionTask(async()=>({code:0}),calls[0][3],calls[0][4],()=>{throw new Error('Unexpected refresh failure');});
  assert.equal(ctx.cardUpdatePending,false);assert.equal(ctx.successes,1);assert.equal(ctx.errors.length,0);
  assert.equal(queries,mode===1?1:0);
 }
 const empty=context(1,false);
 build(()=>{throw new Error('No transaction expected without a frame');},async()=>({ownedCardSchemes:[]})).call(empty);
 await new Promise(setImmediate);
 assert.equal(empty.errors.length,1);assert.equal(empty.cardUpdatePending,false);
 const calls=[];const submit=build((...a)=>calls.push(a),async()=>({ownedCardSchemes:['42']}));
 const ctx=context(0,false);submit.call(ctx);
 await runTransactionTask(async()=>{throw new Error('sidePanel.open() requires a user gesture');},calls[0][3],calls[0][4],()=>{});
 assert.equal(ctx.successes,0);assert.equal(ctx.errors.length,1);assert.equal(ctx.cardUpdatePending,false);
 const confirmed=context(0,false);confirmed.resetCard=()=>{throw new Error('UI refresh failed');};submit.call(confirmed);
 let warnings=0;
 await runTransactionTask(async()=>({code:0}),calls[1][3],calls[1][4],()=>{warnings++;});
 assert.equal(confirmed.errors.length,0,'Confirmed transaction must not report Update Card failed');
 assert.equal(confirmed.cardUpdatePending,false);assert.equal(warnings,1);
 console.log('PASS: actual Card Creator submit method queues one atomic update, blocks duplicate clicks and separates wallet rejection from confirmed-transaction UI failures.');
})().catch(e=>{console.error(e);process.exitCode=1});
