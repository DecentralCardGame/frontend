
import daisyImg from "./cardfiles/daisy.webp"
import richardImg from "./cardfiles/richard.webp"
import hurrwigImg from './cardfiles/hurrwig.webp'
import assoultHorseImg from './cardfiles/assoultHorse.webp'
import ulrichImg from './cardfiles/ulrich.webp'
import steamImg from './cardfiles/steam.webp'
import automatedBotProductionImg from './cardfiles/automatedBotProduction.webp'
import wynnImg from './cardfiles/wynn.webp'
import furiousJackImg from './cardfiles/furiousJack.webp'
import miniLabImg from './cardfiles/miniLab.webp'
import evieImg from './cardfiles/evie.webp'
import exoskeletonImg from './cardfiles/exoskeleton.webp'
import communityCardImg from './cardfiles/communityCard.webp'
import botCommandCenterImg from './cardfiles/botCommandCenter.webp'
import drDollyImg from './cardfiles/drDollyCard.webp'
import belloImg from './cardfiles/bello.webp'
import timeDeviceImg from './cardfiles/timeDeviceCard.webp'

export const cardJpgs = {
  daisyImg: daisyImg,
  richardImg: richardImg,
  hurrwigImg: hurrwigImg,
  assoultHorseImg: assoultHorseImg,
  ulrichImg: ulrichImg,
  steamImg: steamImg,
  automatedBotProductionImg: automatedBotProductionImg,
  wynnImg: wynnImg,
  furiousJackImg: furiousJackImg,
  miniLabImg: miniLabImg,
  evieImg: evieImg,
  exoskeletonImg: exoskeletonImg,
  communityCardImg: communityCardImg,
  botCommandCenterImg: botCommandCenterImg,
  drDollyImg: drDollyImg,
  belloImg: belloImg,
  timeDeviceImg: timeDeviceImg
}

export const daisyData = {
  CardName: 'Saint Daisy, Triplet',
  FlavourText: 'ETB - Create a 1/1 pet for each human you control',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['HUMAN'],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: true,
    
  },
  CastingCost: 7,
  Health: 3,
  Attack: 3
}

export const daisyPetData = {
  CardName: 'Saint Daisy, Triplet',
  FlavourText: 'PET',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['PET'],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: true,
    
  },
  CastingCost: 7,
  Health: 1,
  Attack: 1
}

export const richardData = {
  CardName: 'Richard, Bot Commander',
  FlavourText: 'When Richard is attacking, create a 1/1 Bot token that is also attacking. When Richard blocks, all Bots gain +0/+1.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: true,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 7,
  Health: 8,
  Attack: 5
}
export const richardBotData = {
  CardName: 'Richard, Bot Commander',
  FlavourText: 'BOT',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: true,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 7,
  Health: 1,
  Attack: 1
}

export const hurrwigData = {
  CardName: 'Hurrwig, Bot Manufacturer',
  FlavourText: 'Whenever an entity with the tag \'Bot\' enters the battlefield, you may deal 2 damage to target entity.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['TECHNOCRAT','HUMAN'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: true,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 8,
  Health: 5,
  Attack: 3
}
export const assoultHorseData = {
  CardName: 'Assoult Horse',
  FlavourText: 'Charge!',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['BOT'],
  tagDummy: 'BOT',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 3,
  Health: 3,
  Attack: 2
}
export const ulrichData = {
  CardName: 'Ulrich, the Tinker',
  FlavourText: 'Whenever an Entity with the tag \'Bot\' is destroyed, draw a card.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: true,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 3,
  Health: 7,
  Attack: 3
}
export const steamData = {
  CardName: 'Steam Processor',
  FlavourText: 'Production: 6 \\nPay 6: gain 10 Wisdom.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Place',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 8,
  Health: 5,
  Attack: 3
}
export const AutomatedBotProductionData = {
  CardName: 'Automated Bot Production',
  FlavourText: 'Periodic - Create a 1/1 Bot token.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Place',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 4,
  Health: 4,
  Attack: 3
}
export const AutomatedBotProductionBotData = {
  CardName: 'Automated Bot Production',
  FlavourText: 'BOT',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 4,
  Health: 1,
  Attack: 1
}
export const wynnData = {
  CardName: 'Wynn, the Brainless Baby',
  FlavourText: 'Periodic - If Dr. Dolly is on your field. gain 5 Wisdom and +1/+1',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['HUMAN'],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: false,
    
  },
  CastingCost: 3,
  Health: 1,
  Attack: 1
}
export const furiousJackData = {
  CardName: 'Furious Jack',
  FlavourText: 'ETB - Deal 2 damage to target entity.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['HUMAN'],
  tagDummy: 'HUMAN',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: false,
    
  },
  CastingCost: 4,
  Health: 1,
  Attack: 2
}
export const miniLabData = {
  CardName: 'Dr. Dolly\'s Mini Lab',
  FlavourText: 'Hand size 5. Additionally, start with Dr. Dolly in your hand. Produce Wisdom 10. Pay 3 Mana: Get 10 Wisdom. Whenever Dr. Dolly dies, move him back to your hand.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'HQ',
  Tags: ['HUMAN'],
  tagDummy: 'HUMAN',
  Class: {
    Nature: true,
    Culture: true,
    Technology: false,
    Mysticism: true,
    
  },
  CastingCost: 4,
  Health: 18,
  Attack: 2
}
export const blasturnData = {
  CardName: 'Blasturn, the capital',
  FlavourText: 'Sacrifice a place: draw a card.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'HQ',
  Tags: ['HUMAN','TECHNOCRAT'],
  tagDummy: 'HUMAN',
  Class: {
    Nature: false,
    Culture: true,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 4,
  Health: 20,
  Attack: 2
}
export const evieData = {
  CardName: 'Evie, Damsel in Distress',
  FlavourText: 'On materialization - Manipulate target entity on the field by +2 or -2 Attack.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['HUMAN'],
  tagDummy: 'HUMAN',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: false,
    
  },
  CastingCost: 1,
  Health: 2,
  Attack: 1
}
export const exoskeletonData = {
  CardName: 'Provide Exoskeleton',
  FlavourText: 'Target entity gets +3 HP and gets the ability: Regeneration (whenever this Entity recieves damage, gain the same costAmount of health back.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Action',
  Tags: ['',null],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 6,
  Health: 2,
  Attack: 1
}
export const communityCardData = {
  CardName: 'Crowd Created Content',
  FlavourText: 'Big corporations hate this trick! \n You will be surprised when you see what happens in a community creating their own content!',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'HQ',
  Tags: ['Community','Awesome'],
  tagDummy: 'HUMAN',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: false,
    
  },
  CastingCost: -1,
  Health: 1,
  Attack: 1
}
export const botCommandCenterData = {
  CardName: 'Bot Command Center',
  FlavourText: 'Pay 10 Energy: Get 15 Wisdom \n Pay 4 Energy: Return target Entity to Owner\'s Hand.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Place',
  Tags: ['Technocrat'],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 4,
  Health: 3,
  Attack: 1
}
export const drDollyData = {
  CardName: 'Dr. Dolly',
  FlavourText: 'Whenever another entity dies, gain 1 Mana.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['HUMAN'],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: true,
    
  },
  CastingCost: 5,
  Health: 4,
  Attack: 1
}
export const belloData = {
  CardName: 'Bello, man\'s best friend',
  FlavourText: 'Periodic - If you control a Human, gain 5 Wisdom. \n If it´s Dr. Dolly instead gain 10 Wisdom.',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['Animal'],
  tagDummy: '',
  Class: {
    Nature: false,
    Culture: true,
    Technology: false,
    Mysticism: false,
    
  },
  CastingCost: 3,
  Health: 2,
  Attack: 2
}
export const timeDeviceData = {
  CardName: 'Time Manipulation Device',
  FlavourText: 'Periodic - Insight 3 \\n Pay 4: Bounce',
  RulesTexts: '',
  abilities: [],
  Notes: '',
  type: 'Place',
  Tags: ['TECHNOCRAT'],
  tagDummy: 'TECHNOCRAT',
  Class: {
    Nature: false,
    Culture: false,
    Technology: true,
    Mysticism: false,
    
  },
  CastingCost: 8,
  Health: 5,
  Attack: 3
}
