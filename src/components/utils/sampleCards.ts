import healingPriestImg from "@/assets/cardfiles/healingpriest.jpg";
import churchImg from "@/assets/cardfiles/church.jpg";
import armedSupplierImg from "@/assets/cardfiles/armedSupplier.jpg";
import wildAllianceImg from "@/assets/cardfiles/wildAlliance.jpg";
import daisyImg from "@/assets/cardfiles/daisy.jpg";
import richardImg from "@/assets/cardfiles/richard.jpg";
import hurrwigImg from "@/assets/cardfiles/hurrwig.jpg";
import assoultHorseImg from "@/assets/cardfiles/assoultHorse.jpg";
import ulrichImg from "@/assets/cardfiles/ulrich.jpg";
import steamImg from "@/assets/cardfiles/steam.jpg";
import automatedBotProductionImg from "@/assets/cardfiles/automatedBotProduction.jpg";
import wynnImg from "@/assets/cardfiles/wynn.jpg";
import furiousJackImg from "@/assets/cardfiles/furiousJack.jpg";
import miniLabImg from "@/assets/cardfiles/miniLab.jpg";
import evieImg from "@/assets/cardfiles/evie.jpg";
import exoskeletonImg from "@/assets/cardfiles/exoskeleton.jpg";
import communityCardImg from "@/assets/cardfiles/communityCard.jpg";
import botCommandCenterImg from "@/assets/cardfiles/botCommandCenter.jpg";
import drDollyImg from "@/assets/cardfiles/drDollyCard.jpg";
import belloImg from "@/assets/cardfiles/bello.jpg";
import timeDeviceImg from "@/assets/cardfiles/timeDeviceCard.jpg";
import sampleGradient from "@/assets/cardfiles/sampleGradient.jpg";
import { Card, CardClass } from "@/model/Card";

export const sampleGradientImg = sampleGradient;

export const cardJpgs = {
  churchImg: churchImg,
  armedSupplierImg: armedSupplierImg,
  wildAllianceImg: wildAllianceImg,
  healingPriestImg: healingPriestImg,
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
  timeDeviceImg: timeDeviceImg,
};

export const churchCard = Card.from({
  CardName: "Church",
  RulesTexts: ["OnSpawn: Spawn 2 1/1 recruit", "Pay 1: Strengthen TARGET 1."],
  type: "Headquarter",
  Tags: ["BUILDING"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.culture(),
  Delay: 1,
  Health: 21,
});

export const armedSupplierCard = Card.from({
  CardName: "Armed Supplier",
  RulesTexts: ["OnConstruction: Produce 1."],
  type: "Entity",
  Tags: ["HUMAN", "TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 3,
  Attack: 2,
  Health: 4,
});
export const healingPriestCard = Card.from({
  CardName: "Healing Priest",
  RulesTexts: ["OnSpawn: Heal TARGET"],
  type: "Entity",
  Tags: ["HUMAN"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.mysticism(),
  CastingCost: 3,
  Attack: 2,
  Health: 3,
});
export const wildAllianceCard = Card.from({
  CardName: "Wild Alliance",
  RulesTexts: ["Anthem ANIMAL.", "Count Forces 3.", "Spawn X 3/3 beast"],
  type: "Action",
  Tags: ["ANIMAL", "EVENT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.nature(),
  CastingCost: 8,
});

export const daisyData = Card.from({
  CardName: "Saint Daisy, Triplet",
  FlavourText: "ETB - Create a 1/1 pet for each human you control",
  type: "Entity",
  Tags: ["HUMAN"],
  Class: CardClass.culture(),
  CastingCost: 7,
  Health: 3,
  Attack: 3,
});
export const daisyPetData = Card.from({
  CardName: "Saint Daisy, Triplet",
  FlavourText: "PET",
  type: "Entity",
  Tags: ["PET"],
  Class: CardClass.mysticism(),
  CastingCost: 7,
  Health: 1,
  Attack: 1,
});
export const richardData = Card.from({
  CardName: "Richard, Bot Commander",
  FlavourText:
    "When Richard is attacking, create a 1/1 Bot token that is also attacking. When Richard blocks, all Bots gain +0/+1.",
  type: "Entity",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 7,
  Health: 8,
  Attack: 5,
});
export const richardBotData = Card.from({
  CardName: "Richard, Bot Commander",
  FlavourText: "BOT",
  type: "Entity",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 7,
  Health: 1,
  Attack: 1,
});
export const hurrwigData = Card.from({
  CardName: "Hurrwig, Bot Manufacturer",
  FlavourText:
    "Whenever an entity with the tag 'Bot' enters the battlefield, you may deal 2 damage to target entity.",
  type: "Entity",
  Tags: ["TECHNOCRAT", "HUMAN"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 8,
  Health: 5,
  Attack: 3,
});
export const assoultHorseData = Card.from({
  CardName: "Assoult Horse",
  FlavourText: "Charge!",
  type: "Entity",
  Tags: ["BOT"],
  tagDummy: "BOT",
  Class: CardClass.technology(),
  CastingCost: 3,
  Health: 3,
  Attack: 2,
});
export const ulrichData = Card.from({
  CardName: "Ulrich, the Tinker",
  FlavourText:
    "Whenever an Entity with the tag 'Bot' is destroyed, draw a card.",
  type: "Entity",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 3,
  Health: 7,
  Attack: 3,
});
export const steamData = Card.from({
  CardName: "Steam Processor",
  FlavourText: "Production: 6 \\nPay 6: gain 10 Wisdom.",
  type: "Place",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 8,
  Health: 5,
  Attack: 3,
});
export const AutomatedBotProductionData = Card.from({
  CardName: "Automated Bot Production",
  FlavourText: "Periodic - Create a 1/1 Bot token.",
  type: "Place",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 4,
  Health: 4,
  Attack: 3,
});
export const AutomatedBotProductionBotData = Card.from({
  CardName: "Automated Bot Production",
  FlavourText: "BOT",
  type: "Entity",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 4,
  Health: 1,
  Attack: 1,
});
export const wynnData = Card.from({
  CardName: "Wynn, the Brainless Baby",
  FlavourText:
    "Periodic - If Dr. Dolly is on your field. gain 5 Wisdom and +1/+1",
  type: "Entity",
  Tags: ["HUMAN"],
  Class: CardClass.culture(),
  CastingCost: 3,
  Health: 1,
  Attack: 1,
});
export const furiousJackData = Card.from({
  CardName: "Furious Jack",
  FlavourText: "ETB - Deal 2 damage to target entity.",
  type: "Entity",
  Tags: ["HUMAN"],
  tagDummy: "HUMAN",
  Class: CardClass.culture(),
  CastingCost: 4,
  Health: 1,
  Attack: 2,
});
export const miniLabData = Card.from({
  CardName: "Dr. Dolly's Mini Lab",
  FlavourText:
    "Hand size 5. Additionally, start with Dr. Dolly in your hand. Produce Wisdom 10. Pay 3 Mana: Get 10 Wisdom. Whenever Dr. Dolly dies, move him back to your hand.",
  type: "HQ",
  Tags: ["HUMAN"],
  tagDummy: "HUMAN",
  Class: CardClass.mysticism(),
  CastingCost: 4,
  Health: 18,
  Attack: 2,
});
export const blasturnData = Card.from({
  CardName: "Blasturn, the capital",
  FlavourText: "Sacrifice a place: draw a card.",
  type: "HQ",
  Tags: ["HUMAN", "TECHNOCRAT"],
  tagDummy: "HUMAN",
  Class: CardClass.technology(),
  CastingCost: 4,
  Health: 20,
  Attack: 2,
});
export const evieData = Card.from({
  CardName: "Evie, Damsel in Distress",
  FlavourText:
    "On materialization - Manipulate target entity on the field by +2 or -2 Attack.",
  type: "Entity",
  Tags: ["HUMAN"],
  tagDummy: "HUMAN",
  Class: CardClass.culture(),
  CastingCost: 1,
  Health: 2,
  Attack: 1,
});
export const exoskeletonData = Card.from({
  CardName: "Provide Exoskeleton",
  FlavourText:
    "Target entity gets +3 HP and gets the ability: Regeneration (whenever this Entity recieves damage, gain the same costAmount of health back.",
  type: "Action",
  Tags: ["", null],
  Class: CardClass.technology(),
  CastingCost: 6,
  Health: 2,
  Attack: 1,
});
export const communityCardData = Card.from({
  CardName: "Crowd Created Content",
  FlavourText:
    "Big corporations hate this trick! \n You will be surprised when you see what happens in a community creating their own content!",
  RulesTexts: [
    "Big corporations hate this trick! \n You will be surprised when you see what happens in a community creating their own content!",
  ],
  type: "HQ",
  Tags: ["Community", "Awesome"],
  tagDummy: "HUMAN",
  Class: CardClass.culture(),
  CastingCost: -1,
  Health: 1,
  Attack: 1,
});
export const botCommandCenterData = Card.from({
  CardName: "Bot Command Center",
  RulesTexts: ["OnSpawn: Anthem BOT. \\n Pay 2: Anthem BOT."],
  type: "Place",
  Tags: ["Technocrat"],
  Class: CardClass.technology(),
  CastingCost: 4,
  Health: 3,
  Attack: 1,
});
export const drDollyData = Card.from({
  CardName: "Dr. Dolly",
  FlavourText: "Whenever another entity dies, gain 1 Mana.",
  RulesTexts: ["Avenge: Produce 1"],
  type: "Entity",
  Tags: ["HUMAN"],
  Class: CardClass.mysticism(),
  CastingCost: 5,
  Health: 4,
  Attack: 1,
});
export const belloData = Card.from({
  CardName: "Bello, man's best friend",
  FlavourText:
    "Periodic - If you control a Human, gain 5 Wisdom. \n If it´s Dr. Dolly instead gain 10 Wisdom.",
  RulesTexts: ["Periodic: Count Human. Insight X"],
  type: "Entity",
  Tags: ["Animal"],
  Class: CardClass.culture(),
  CastingCost: 3,
  Health: 2,
  Attack: 2,
});
export const timeDeviceData = Card.from({
  CardName: "Time Manipulation Device",
  FlavourText: "Periodic - Insight 3 \\n Pay 4: Bounce",
  RulesTexts: ["Periodic: Insight 3 \\n Pay 4: Bounce TARGET"],
  type: "Place",
  Tags: ["TECHNOCRAT"],
  tagDummy: "TECHNOCRAT",
  Class: CardClass.technology(),
  CastingCost: 8,
  Health: 5,
  Attack: 3,
});
