import * as R from "ramda"
import { emptyCard } from "@/components/utils/utils.js"
import daisyImg from "./cardfiles/daisy.jpg"
import richardImg from "./cardfiles/richard.jpg"
import hurrwigImg from './cardfiles/hurrwig.jpg'
import assoultHorseImg from './cardfiles/assoultHorse.jpg'
import ulrichImg from './cardfiles/ulrich.jpg'
import steamImg from './cardfiles/steam.jpg'
import automatedBotProductionImg from './cardfiles/automatedBotProduction.jpg'
import wynnImg from './cardfiles/wynn.jpg'
import furiousJackImg from './cardfiles/furiousJack.jpg'
import miniLabImg from './cardfiles/miniLab.jpg'
import evieImg from './cardfiles/evie.jpg'
import exoskeletonImg from './cardfiles/exoskeleton.jpg'
import communityCardImg from './cardfiles/communityCard.jpg'
import botCommandCenterImg from './cardfiles/botCommandCenter.jpg'
import drDollyImg from './cardfiles/drDollyCard.jpg'
import belloImg from './cardfiles/bello.jpg'
import timeDeviceImg from './cardfiles/timeDeviceCard.jpg'

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

export const daisyData = R.merge(emptyCard, {
  CardName: 'Saint Daisy, Triplet',
  FlavourText: 'ETB - Create a 1/1 pet for each human you control',
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
})
export const daisyPetData = R.merge(emptyCard, {
  CardName: 'Saint Daisy, Triplet',
  FlavourText: 'PET',
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
})
export const richardData = R.merge(emptyCard, {
  CardName: 'Richard, Bot Commander',
  FlavourText: 'When Richard is attacking, create a 1/1 Bot token that is also attacking. When Richard blocks, all Bots gain +0/+1.',
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
})
export const richardBotData = R.merge(emptyCard, {
  CardName: 'Richard, Bot Commander',
  FlavourText: 'BOT',
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
})
export const hurrwigData = R.merge(emptyCard, {
  CardName: 'Hurrwig, Bot Manufacturer',
  FlavourText: 'Whenever an entity with the tag \'Bot\' enters the battlefield, you may deal 2 damage to target entity.',
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
})
export const assoultHorseData = R.merge(emptyCard, {
  CardName: 'Assoult Horse',
  FlavourText: 'Charge!',
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
})
export const ulrichData = R.merge(emptyCard, {
  CardName: 'Ulrich, the Tinker',
  FlavourText: 'Whenever an Entity with the tag \'Bot\' is destroyed, draw a card.',
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
})
export const steamData = R.merge(emptyCard, {
  CardName: 'Steam Processor',
  FlavourText: 'Production: 6 \\nPay 6: gain 10 Wisdom.',
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
})
export const AutomatedBotProductionData = R.merge(emptyCard, {
  CardName: 'Automated Bot Production',
  FlavourText: 'Periodic - Create a 1/1 Bot token.',
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
})
export const AutomatedBotProductionBotData = R.merge(emptyCard, {
  CardName: 'Automated Bot Production',
  FlavourText: 'BOT',
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
})
export const wynnData = R.merge(emptyCard, {
  CardName: 'Wynn, the Brainless Baby',
  FlavourText: 'Periodic - If Dr. Dolly is on your field. gain 5 Wisdom and +1/+1',
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
})
export const furiousJackData = R.merge(emptyCard, {
  CardName: 'Furious Jack',
  FlavourText: 'ETB - Deal 2 damage to target entity.',
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
})
export const miniLabData = R.merge(emptyCard, {
  CardName: 'Dr. Dolly\'s Mini Lab',
  FlavourText: 'Hand size 5. Additionally, start with Dr. Dolly in your hand. Produce Wisdom 10. Pay 3 Mana: Get 10 Wisdom. Whenever Dr. Dolly dies, move him back to your hand.',
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
})
export const blasturnData = R.merge(emptyCard, {
  CardName: 'Blasturn, the capital',
  FlavourText: 'Sacrifice a place: draw a card.',
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
})
export const evieData = R.merge(emptyCard, {
  CardName: 'Evie, Damsel in Distress',
  FlavourText: 'On materialization - Manipulate target entity on the field by +2 or -2 Attack.',
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
})
export const exoskeletonData = R.merge(emptyCard, {
  CardName: 'Provide Exoskeleton',
  FlavourText: 'Target entity gets +3 HP and gets the ability: Regeneration (whenever this Entity recieves damage, gain the same costAmount of health back.',
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
})
export const communityCardData = R.merge(emptyCard, {
  CardName: 'Crowd Created Content',
  FlavourText: 'Big corporations hate this trick! \n You will be surprised when you see what happens in a community creating their own content!',
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
})
export const botCommandCenterData = R.merge(emptyCard, {
  CardName: 'Bot Command Center',
  FlavourText: 'Pay 10 Energy: Get 15 Wisdom \n Pay 4 Energy: Return target Entity to Owner\'s Hand.',
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
})
export const drDollyData = R.merge(emptyCard, {
  CardName: 'Dr. Dolly',
  FlavourText: 'Whenever another entity dies, gain 1 Mana.',
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
})
export const belloData = R.merge(emptyCard, {
  CardName: 'Bello, man\'s best friend',
  FlavourText: 'Periodic - If you control a Human, gain 5 Wisdom. \n If it´s Dr. Dolly instead gain 10 Wisdom.',
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
})
export const timeDeviceData = R.merge(emptyCard, {
  CardName: 'Time Manipulation Device',
  FlavourText: 'Periodic - Insight 3 \\n Pay 4: Bounce',
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
})
