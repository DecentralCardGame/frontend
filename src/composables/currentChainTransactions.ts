import { Root, Type, Enum } from 'protobufjs/light';
import { Registry, type EncodeObject, type GeneratedType } from '@cosmjs/proto-signing-current';
import { SigningStargateClient } from '@cosmjs/stargate-current';
import descriptor from '../generated/current-chain-proto.json';

export const currentRoot = Root.fromJSON(descriptor).resolveAll();
export const currentMessageNames: Record<string, string> = {
  RegisterForCouncil: 'CouncilRegister', RewokeCouncilRegistration: 'CouncilDeregister',
  BuyCardScheme: 'CardSchemeBuy', CreateCouncil: 'CouncilCreate',
  CommitCouncilResponse: 'CouncilResponseCommit', RevealCouncilResponse: 'CouncilResponseReveal',
  RestartCouncil: 'CouncilRestart', SaveCardContent: 'CardSaveContent', AddArtwork: 'CardArtworkAdd',
  VoteCard: 'CardVote', TransferCard: 'CardTransfer', SetProfileCard: 'ProfileCardSet',
  MultiVoteCard: 'CardVoteMulti', Createuser: 'UserCreate', InviteEarlyAccess: 'EarlyAccessInvite',
  DisinviteEarlyAccess: 'EarlyAccessDisinvite', EncounterCreate: 'EncounterCreate',
  EncounterDo: 'EncounterDo', EncounterClose: 'EncounterClose',
  BuyBoosterPack: 'BoosterPackBuy', OpenBoosterPack: 'BoosterPackOpen', ConfirmMatch: 'MatchConfirm',
};

export function currentTypeUrl(legacyName: string): string {
  if (!Object.prototype.hasOwnProperty.call(currentMessageNames, legacyName)) throw new Error(`Unsupported current-chain transaction: ${legacyName}`);
  const name = currentMessageNames[legacyName];
  return `/cardchain.cardchain.Msg${name}`;
}

export const currentMessageTypes: Array<[string, GeneratedType]> = Object.keys(currentMessageNames).map(name => {
  const url = currentTypeUrl(name);
  return [url, currentRoot.lookupType(url.slice(1)) as unknown as GeneratedType];
});

function checkedObject(type: Type, input: Record<string, any>): Record<string, any> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error(`Invalid ${type.name}`);
  const output: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    const field = type.fields[key];
    if (!Object.prototype.hasOwnProperty.call(type.fields, key)) throw new Error(`Unknown field ${type.name}.${key}`);
    if (value === undefined) continue;
    const convert = (v: any): any => {
      if (field.resolvedType instanceof Type) return checkedObject(field.resolvedType, v);
      if (field.resolvedType instanceof Enum) {
        const values = field.resolvedType.values;
        if (typeof v === 'string' && Object.hasOwn(values, v)) return values[v];
        if (typeof v === 'number' && Object.values(values).includes(v)) return v;
        throw new Error(`Invalid enum ${type.name}.${key}`);
      }
      if (field.type === 'uint64') {
        if (typeof v === 'number' && (!Number.isSafeInteger(v) || v < 0)) throw new Error(`Unsafe uint64 ${key}`);
        if (!['number', 'string'].includes(typeof v) || !/^\d+$/.test(String(v)) || BigInt(v) > 18446744073709551615n) throw new Error(`Invalid uint64 ${key}`);
        return String(v);
      }
      if (field.type === 'bytes') {
        if (v instanceof Uint8Array) return v;
        if (typeof v !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(v)) throw new Error(`Invalid base64 ${key}`);
        return Uint8Array.from(atob(v), c => c.charCodeAt(0));
      }
      if ((field.type === 'string' && typeof v !== 'string') || (field.type === 'bool' && typeof v !== 'boolean')) throw new Error(`Invalid ${key}`);
      return v;
    };
    if (field.repeated) {
      if (!Array.isArray(value)) throw new Error(`Expected array ${key}`);
      output[key] = value.map(convert);
    } else output[key] = convert(value);
  }
  return output;
}

export function currentMessage(name: string, input: Record<string, any>): EncodeObject {
  const typeUrl = currentTypeUrl(name);
  const { fromAddress: _unused, ...value } = input;
  if (!value.creator || typeof value.creator !== 'string') throw new Error('Missing transaction creator');
  if (name === 'VoteCard') {
    value.vote = { cardId: value.cardId, voteType: value.voteType };
    delete value.cardId; delete value.voteType;
  }
  if (name === 'EncounterCreate' && 'Drawlist' in value) {
    value.drawlist = value.Drawlist; delete value.Drawlist;
  }
  if (value.parameters && !Array.isArray(value.parameters)) {
    value.parameters = Object.entries(value.parameters).map(([key, value]) => ({ key, value }));
  }
  const type = currentRoot.lookupType(typeUrl.slice(1));
  const message = type.fromObject(checkedObject(type, value));
  const error = type.verify(message);
  if (error) throw new Error(error);
  return { typeUrl, value: message };
}

export async function sendCurrentMessages(client: any, messages: EncodeObject[], fee: any, memo: string, creator: string) {
  const signer = client.signer;
  const customMessages = messages.some(message => message.typeUrl.startsWith('/cardchain.cardchain.'));
  if (!signer || (customMessages && typeof signer.signDirect !== 'function')) throw new Error('This chain requires a wallet supporting protobuf direct signing.');
  const accounts = await signer.getAccounts();
  if (!accounts.some((account: any) => account.address === creator)) throw new Error('Creator does not match the connected wallet');
  const connection = await SigningStargateClient.connectWithSigner(client.env.rpcURL, signer, { registry: new Registry(client.registry) });
  try {
    if (await connection.getChainId() !== client.env.chainId) throw new Error('RPC chain ID does not match the configured chain');
    return await connection.signAndBroadcast(creator, messages, fee, memo);
  } finally { connection.disconnect(); }
}

export function installCurrentChainTransactions(client: any) {
  client.registry.push(...currentMessageTypes);
  const install = () => {
    const methods: Record<string, any> = {};
    for (const name of Object.keys(currentMessageNames)) {
      methods[`msg${name}`] = ({value}: any) => currentMessage(name, value);
      methods[`sendMsg${name}`] = async ({value, fee, memo = ''}: any) => {
        const message = currentMessage(name, value);
        return await sendCurrentMessages(client, [message], fee, memo, value.creator);
      };
    }
    client.DecentralCardGameCardchainCardchain.tx = new Proxy(methods, {
      get(target, name: string | symbol) {
        if (typeof name !== 'string') return undefined;
        if (Object.prototype.hasOwnProperty.call(target, name)) return target[name];
        if (/^(sendMsg|msg)[A-Z]/.test(name)) throw new Error(`Current-chain transaction method is not implemented: ${name}`);
        return undefined;
      },
    });
  };
  install();
  client.on('signer-changed', install);
}
