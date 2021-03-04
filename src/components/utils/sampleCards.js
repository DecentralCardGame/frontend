import { saintDaisy } from './cardfiles/saintDaisy.js'
import { saintDaisy_pet } from './cardfiles/saintDaisy_pet.js'
import { richard } from './cardfiles/richard.js'
import { richard_bot } from './cardfiles/richard_bot.js'
import { hurrwig } from './cardfiles/hurrwig.js'
import { assoultHorse } from './cardfiles/assoultHorse.js'
import { ulrich } from './cardfiles/ulrich.js'
import { steam } from './cardfiles/steam.js'
import { automatedBotProduction } from './cardfiles/automatedBotProduction.js'
import { automatedBotProduction_bot } from './cardfiles/automatedBotProduction_bot.js'
import { wynn } from './cardfiles/wynn.js'
import { furiousJack } from './cardfiles/furiousJack.js'
import { miniLab } from './cardfiles/miniLab.js'
import { blastburn } from './cardfiles/blastburn.js'
import { evie } from './cardfiles/evie.js'
import { exoskeleton } from './cardfiles/exoskeleton.js'
import { communityImg } from './cardfiles/communityCard.js'
import { botCommandCenter } from './cardfiles/botCommandCenter.js'
import { drDolly } from './cardfiles/drDollyCard.js'
import { bello } from './cardfiles/bello.js'
import { timeDevice } from './cardfiles/timeDeviceCard.js'

import daisyImg from "./cardfiles/daisy.jpg"

export const cardJpgs = {
  daisyImg: daisyImg
}

export const daisyData = {
  CardName: 'Bello, Man\'s Best Friend',
  FlavourText: 'Periodic - If you control a Human, gain 5 Wisdom. \n If it´s Dr. Dolly instead gain 10 Wisdom.',
  abilities: [],
  Notes: '',
  type: 'Entity',
  Tags: ['Animal'],
  tagDummy: '',
  CostType: {
    Lumber: false,
    Food: true,
    Iron: false,
    Mana: false,
    Energy: false
  },
  CastingCost: 3,
  Health: 2,
  Attack: 2
}

export const sampleCards = {
  saintDaisy: saintDaisy,
  saintDaisy_pet: saintDaisy_pet,
  richard: richard,
  hurrwig: hurrwig,
  assoultHorse: assoultHorse,
  ulrich: ulrich,
  steam: steam,
  automatedBotProduction: automatedBotProduction,
  automatedBotProduction_bot: automatedBotProduction_bot,
  richard_bot: richard_bot,
  wynn: wynn,
  furiousJack: furiousJack,
  miniLab: miniLab,
  blastburn: blastburn,
  evie: evie,
  exoskeleton: exoskeleton,
  communityImg: communityImg,
  botCommandCenter: botCommandCenter,
  drDolly: drDolly,
  bello: bello,
  timeDevice: timeDevice
}
