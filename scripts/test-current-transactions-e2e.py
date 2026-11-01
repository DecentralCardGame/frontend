#!/usr/bin/env python3
"""Run the real frontend signing adapter against a fresh isolated local Cardchain.
Requires --binary. Never reads player wallets or contacts a public chain.
"""
import argparse, base64, json, os, pathlib, socket, subprocess, tempfile, time, urllib.request
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--binary',required=True,type=pathlib.Path)
a=p.parse_args()
for port in [27657,27656,1417,9190]:
    with socket.socket() as s: s.bind(('127.0.0.1',port))
home=pathlib.Path(tempfile.mkdtemp(prefix='frontend-tx-e2e-'))
(home/'config').mkdir()
(home/'config/client.toml').write_text('keyring-backend = "test"\n')
env={**os.environ,'GOMAXPROCS':'2','GOMEMLIMIT':'2GiB'}
chain='frontend-current-tx-e2e'
binary=str(a.binary.resolve())
def cli(*args):
    result=subprocess.run([binary,*args,'--home',str(home)],env=env,capture_output=True,text=True,timeout=90)
    if result.returncode: raise RuntimeError(f'{args[:2]}: {result.stderr}')
    return result.stdout
cli('init','frontend-tx-e2e','--chain-id',chain)
keys={}
for name in ['validator','owner','other']:
    keys[name]=json.loads(cli('keys','add',name,'--keyring-backend','test','--output','json'))
    cli('genesis','add-genesis-account',keys[name]['address'],'1000000000stake,1000000000ucredits')
cli('genesis','gentx','validator','10000000stake','--chain-id',chain,'--keyring-backend','test')
cli('genesis','collect-gentxs')
gfile=home/'config/genesis.json'
g=json.loads(gfile.read_text());state=g['app_state']['cardchain']
state['pools']=[{'denom':'ucredits','amount':'0'} for _ in range(3)]
state['cardAuctionPrice']={'denom':'ucredits','amount':'1000000'}
state['addresses']=[keys[n]['address'] for n in ['owner','other']]
state['users']=[{'alias':n,'airDrops':{'create':True}} for n in ['owner','other']]
content={'Action':{'CardName':'Before','CastingCost':1,'Class':{'Mysticism':True},'Effects':[{'Sacrifice':{}}],'FlavourText':'','Tags':[]}}
state['cardRecords']=[{'owner':keys['owner']['address'],'artist':keys['owner']['address'],'status':'prototype','content':base64.b64encode(json.dumps(content).encode()).decode(),'votePool':{'denom':'ucredits','amount':'0'}}]
state['images']=[{'image':''}]
gfile.write_text(json.dumps(g))
cfg=home/'config/config.toml'
cfg.write_text(cfg.read_text().replace('pex = true','pex = false').replace('timeout_commit = "5s"','timeout_commit = "1s"').replace('pprof_laddr = "localhost:6060"','pprof_laddr = ""'))
with (home/'node.log').open('w') as log:
    node=subprocess.Popen([binary,'start','--home',str(home),'--minimum-gas-prices','0stake','--rpc.laddr','tcp://127.0.0.1:27657','--p2p.laddr','tcp://127.0.0.1:27656','--grpc.address','127.0.0.1:9190','--api.enable','--api.address','tcp://127.0.0.1:1417','--grpc-web.enable=false','--log_level','warn'],env=env,stdout=log,stderr=log)
    try:
        for _ in range(120):
            if node.poll() is not None: raise RuntimeError('Test node exited; see '+str(home/'node.log'))
            try:
                with urllib.request.urlopen('http://127.0.0.1:27657/status',timeout=2) as r: status=json.load(r)['result']
                assert status['node_info']['network']==chain
                if int(status['sync_info']['latest_block_height'])>0: break
            except (OSError,ValueError): pass
            time.sleep(1)
        else: raise TimeoutError('Test node not ready')
        data={'rpc':'http://127.0.0.1:27657','chainId':chain,'address':keys['owner']['address'],'mnemonic':keys['owner']['mnemonic'],'otherMnemonic':keys['other']['mnemonic']}
        subprocess.run(['node',str(pathlib.Path(__file__).with_name('current-transactions-signed.cjs'))],input=json.dumps(data),text=True,check=True,timeout=150)
        print('Isolated test passed. Local-only evidence:',home)
    finally:
        node.terminate();node.wait(timeout=30)
