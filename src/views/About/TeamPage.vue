<template>
  <div class="bg-black text-white flex justify-center">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-16 m-24">
      <div
        v-for="item in items"
        class="uppercase text-center w-[15rem]"
      >
        <img
          :alt="item.name"
          :src="item.pic"
          class="rounded-full mb-2"
        >
        <p class="font-bold">
          {{ item.name }}
        </p>
        <p>{{ item.desc }}</p>
      </div>
      <img
        alt="logo"
        class="w-[15rem]"
        :src="logo"
      >
      <div>
        <p class="font-bold uppercase">
          Honourable Mentions
        </p>
        <br>
        <p>
          Harold Zellner<br>
          Thilo Billerbeck <br>
          Andy Frankenberger <br>
          Tom König <br>
          Jette Czoschke <br>
          Danny Czoschke
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import patrick from "@/assets/team/patrick.webp";
import anna from "@/assets/team/anna.webp";
import marius from "@/assets/team/marius.webp";
import peer from "@/assets/team/peer.webp";
import niko from "@/assets/team/niko.webp";
import jannik from "@/assets/team/jannik.webp";
import kosta from "@/assets/team/kosta.webp";
import benny from "@/assets/team/benny.webp";
import stefi from "@/assets/team/stefi.webp";
import noah from "@/assets/team/noah.webp";
import logo from "@/assets/figma/CCLogo.png";

const items: { pic: any; name: string; desc: string }[] = [
  { pic: patrick, name: "Technical lead", desc: "Patrick" },
  { pic: anna, name: "Anna", desc: "Creative lead" },
  { pic: marius, name: "Marius", desc: "Game Dev lead" },
  { pic: peer, name: "Peer", desc: "Blockchain Dev" },
  { pic: niko, name: "Niko", desc: "Unity Dev" },
  { pic: jannik, name: "Jannik", desc: "Game Design" },
  { pic: kosta, name: "Kosta", desc: "2D Artist" },
  { pic: benny, name: "Benny", desc: "2D / 3D Artist" },
  { pic: stefi, name: "Stefi", desc: "2D Artist" },
  { pic: noah, name: "Noah", desc: "Game Design" },
];
</script>
