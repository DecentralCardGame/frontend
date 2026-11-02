const assert=require('node:assert/strict');
const path=require('node:path');
const {runTransactionTask}=require('./load-typescript-module.cjs')(path.resolve(__dirname,'../src/def-composables/transactionTask.ts'));
(async()=>{
 for(const scenario of ['success','wallet-rejection','chain-failure','refresh-failure']){
  const events=[];
  await runTransactionTask(
   async()=>{events.push('execute');if(scenario==='wallet-rejection')throw new Error('sidePanel.open() may only be called in response to a user gesture.');return {code:scenario==='chain-failure'?4:0,rawLog:'rejected'};},
   async()=>{events.push('confirmed');if(scenario==='refresh-failure')throw new Error('refresh failed');},
   async()=>{events.push('failed');},
   async()=>{events.push('refresh-failed');},
  );
  assert.deepEqual(events,scenario==='success'?['execute','confirmed']:scenario==='refresh-failure'?['execute','confirmed','refresh-failed']:['execute','failed']);
 }
 console.log('PASS: confirmation and UI-refresh errors are separated; wallet/chain rejection cannot produce success notifications.');
})().catch(e=>{console.error(e);process.exitCode=1});
