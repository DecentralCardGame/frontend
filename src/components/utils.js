
export function filterSelection(options) {
  let found = {}
  options.forEach((item, idx) => {
    if (item.value) {
      found = {
        index: idx,
        option: item
      }
    }
  })
  return found
}

export function filterProperties(options, target) {
  let found = {}
  options.forEach((item, idx) => {
    if (item.description === target) {
      found = item
    }
  })
  return found
}

export function resolveParagraph(key) {
  if(key[0] === '§') {
    return key.slice(1)
  }
  else {
    console.error('key to resolve is not a valid key: ', key)
  }
}

export const cardJson = [
  {
    "name": "Schoolbus",
    "type": "Object",
    "health": 1,
    "attack": 1,
    "speed": 5,
    "cost":{
      "lumber": 2,
      "iron": 3,
      "mana": 1,
      "energy": 1,
      "food": 1,
      "generic": 1
    },
    "abilities": [{"cardText": "test ability"}, {"cardText": "test ability 2"}],
    "tag": ["crazy", "motherfucking", "bus"],
    "text": "Whenever a creature with tag 'pupil' enters the field, schoolbus gets a chu chu counter. Remove a chu chu counter: Schoolbus deals attack to target unit equal to the number of chu chu counters on it.",
    "image": "schoolbus"
  },
  {
    "name": "Blasturn, the Capital",
    "type": "HQ",
    "health": 22,
    "attack": 0,
    "speed": 6,
    "cost":{
      "lumber": 0,
      "iron": 0,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text":
      "Produce - Energy 3, iron 2, Food 1. Periodic - draw a card. Starting cards in hand: 5. 3 Energy, 1 iron: create a 0/1 iron Bot with tag 'scrap'.",
    "image": "blasturn"
  },
  {
    "name": "Valgurio, the deep Mines",
    "type": "HQ",
    "health": 25,
    "attack": 0,
    "speed": 6,
    "cost":{
      "lumber": 0,
      "iron": 0,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Produce - Energy 2, Iron 2, Lumber 2. Periodic - draw a card. Starting cards in hand: 7",
    "image": "valgurio"
  },
  {
    "name": "Talla, a mystical forest",
    "type": "HQ",
    "health": 15,
    "attack": 0,
    "speed": 4,
    "cost":{
      "lumber": 1,
      "iron": 0,
      "mana": 2,
      "energy": 0,
      "food": 1,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Produce - Mana 2, Food 1, Lumber 1. Periodic - draw a card. Starting cards in hand: 5.",
    "image": "talla"
  },
  {
    "name": "Steam Saw Mill",
    "type": "Location",
    "health": 6,
    "attack": 0,
    "speed": 4,
    "cost":{
      "lumber": 0,
      "iron": 2,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Produce - 2 Lumber",
    "image": "steamsawmill"
  },
  {
    "name": "Steam Processor",
    "type": "Location",
    "health": 7,
    "attack": 0,
    "speed": 4,
    "cost":{
      "lumber": 0,
      "iron": 4,
      "mana": 0,
      "energy": 5,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Whenever an Energy is added to your resource depot, add an additional Energy to it. 3 Energy: draw a card.",
    "image": "steamprocessor"
  },
  {
    "name": "Repair Bot",
    "type": "Object",
    "health": 2,
    "attack": 2,
    "speed": 5,
    "cost":{
      "lumber": 0,
      "iron": 2,
      "mana": 0,
      "energy": 2,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Periodic - repair target location by 2 HP",
    "image": "repairbot"
  },
  {
    "name": "Reprocessor",
    "type": "Location",
    "health": 3,
    "attack": 0,
    "speed": 6,
    "cost":{
      "lumber": 0,
      "iron": 5,
      "mana": 0,
      "energy": 2,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "5 energy: return target card from your dust pile to your hand",
    "image": "reprocessor"
  },
  {
    "name": "Coal Power Plant",
    "type": "Location",
    "health": 7,
    "attack": 0,
    "speed": 6,
    "cost":{
      "lumber": 0,
      "iron": 3,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "2 Lumber: add 3 Energy",
    "image": "coalplant"
  },
  {
    "name": "Hurrwig, the Operator",
    "type": "Object",
    "health": 4,
    "attack": 3,
    "speed": 4,
    "cost":{
      "lumber": 0,
      "iron": 0,
      "mana": 0,
      "energy": 0,
      "food": 3,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Whenever Hurrwig blocks an attack on a location, Hurrwig gets +3/+3",
    "image": "hurrwig"
  },
  {
    "name": "Lörden, the Technocrat",
    "type": "Object",
    "health": 5,
    "attack": 5,
    "speed": 5,
    "cost":{
      "lumber": 2,
      "iron": 3,
      "mana": 0,
      "energy": 0,
      "food": 3,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "3 Energy: deal 2 attack to any object.",
    "image": "loerden"
  },
  {
    "name": "Ulrich, the Tinker",
    "type": "Object",
    "health": 7,
    "attack": 3,
    "speed": 6,
    "cost":{
      "lumber": 0,
      "iron": 3,
      "mana": 0,
      "energy": 0,
      "food": 4,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Whenever an object with tag 'bot' is destroyed, return it to your hand.",
    "image": "ulrich"
  },
  {
    "name": "Farm",
    "type": "Location",
    "health": 7,
    "attack": 0,
    "speed": 4,
    "cost":{
      "lumber": 2,
      "iron": 0,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Produce - 4 Food",
    "image": "farm"
  },
  {
    "name": "Mining Site",
    "type": "Location",
    "health": 7,
    "attack": 0,
    "speed": 4,
    "cost":{
      "lumber": 0,
      "iron": 2,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Produce - 4 Iron",
    "image": "miningsite"
  },
  {
    "name": "Replicator",
    "type": "Object",
    "health": 2,
    "attack": 5,
    "speed": 6,
    "cost":{
      "lumber": 0,
      "iron": 4,
      "mana": 0,
      "energy": 2,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "4 Iron, 2 Energy: Create a copy of Replicator.",
    "image": "replicator"
  },
  {
    "name": "Combat Bot",
    "type": "Object",
    "health": 12,
    "attack": 8,
    "speed": 8,
    "cost":{
      "lumber": 0,
      "iron": 5,
      "mana": 0,
      "energy": 3,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Whenever Combat Bot attacks, you may pay 3 Energy to deal 5 damage to any target.",
    "image": "combatbot"
  },
  {
    "name": "Provide Exoskeleton",
    "type": "Action",
    "health": 0,
    "attack": 0,
    "speed": 5,
    "cost":{
      "lumber": 0,
      "iron": 3,
      "mana": 0,
      "energy": 0,
      "food": 0,
      "generic": 0
    },
    "abilities": [],
    "tag": [],
    "text": "Target object gets +3 damage, +5 HP and gets the ability: regeneration (whenever this object receives damage, gain the same amount of health back.",
    "image": "exoskeleton"
  }
]

export const sampleImg = 'data:image/jpeg;base64,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'
