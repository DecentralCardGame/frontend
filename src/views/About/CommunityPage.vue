<template>
  <div class="flex justify-center text-center flex-col m-16 uppercase text-xl">
    <img
      :src="logo"
      alt="logo"
      class="mx-auto w-72"
    >
    <br>
    <p>
      As a DAO, we are encouraging decentralized contributions to <br>
      the project. Join the Project by contacting us on Discord.<br>
      <b> Our Community Contributors </b>
    </p>
    <br>
    <p
      v-for="name in names"
      :key="name"
    >
      {{ name }}
    </p>
  </div>
</template>
<script setup lang="ts">
import logo from "@/assets/figma/CCLogo.png";

const names = [
  "RUSLAN",
  "“Vnode_casH”",
  "Carden",
  "cryptobtcbuyer",
  "MMS",
  "BonyNode",
  "safe",
  "sminempepe",
  "Gliderso",
  "Tarzik",
  "ArtiDS_Node",
  "Cardep",
  "stakr.space",
  "Shoni",
  "Yurbason",
  "icodragon [NODERS]",
  "JahaND",
  "gönlü zengin",
  "xAlex",
  "Sr20de",
  "Oxyde",
  "Asadovka | Nodejumper",
  "[NODERS]TEAM",
  "molla202",
  "dimasik",
  "kjnodes",
  "Cumulo",
  "Nodes|Bull Rancho",
  "NodeStake",
  "Mondrago (@Mr__)",
  "Apollo",
  "dreamstaker",
  "Lis1",
  "ser",
  "serotonin",
  "79anvi ",
  "ArcLing",
  "cryptech",
  "Anatolian Team",
  "ozzycard",
  "AlxVoy  ANODE.TEAM",
  "ITpro",
  "SINNER",
  "Biker4b",
  "sashamaxymchuk",
  "itrocket",
  "bulevar",
  "Nodeist",
  "laserlincoln",
  "cardex",
  "cardchain.acloud.pp.ua",
  "⭐️ PPNV Service ⭐️",
  "D-stake",
  "AnnaSot",
  "Decloud Nodes Lab",
  "Validator.run",
  "@JulyC92894454",
  "superjax",
  "Carder",
  "web34ever",
  "lesnik | UTSA",
  "STAVR",
  "КРИПТОГЕНОФФ",
  "lesya",
  "ramuchi.tech",
  "OranG3cluB",
  "raymondctc (@holdnostake)",
  "AM Solutions ",
  "078F5410FD08B19E",
  "KolTigin",
  "Cardel",
  "@vadyhodler777",
  "silent",
  "ark33",
  "NOXU",
  "Moonbridge",
  "liveevilll",
  "AlexeyM",
  "SRG0Z10",
  "Kolot",
  "Midora",
];
</script>
