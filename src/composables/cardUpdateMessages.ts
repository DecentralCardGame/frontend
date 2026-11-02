import type { EncodeObject } from '@cosmjs/proto-signing';
import type { ChainCard } from '../model/Card';

export function cardUpdateMessages(
  tx: any, creator: string, cardId: number, card: ChainCard,
  includeArtwork: boolean, currentChain: boolean,
): EncodeObject[] {
  const content = JSON.stringify(card.content);
  const messages = [tx.msgSaveCardContent({value: {
    creator, cardId,
    content: currentChain ? new TextEncoder().encode(content) : btoa(content),
    notes: card.notes, artist: card.artist, balanceAnchor: card.balanceAnchor,
    ...(currentChain ? {parameters: card.parameters} : {}),
  }})];
  if (includeArtwork) messages.push(tx.msgAddArtwork({value: {
    creator, cardId, fullArt: card.fullArt,
    image: currentChain ? new TextEncoder().encode(card.image) : btoa(card.image),
  }}));
  return messages;
}
