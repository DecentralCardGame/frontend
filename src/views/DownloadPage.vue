<template>
  <FadeTeaserSmall>
    <TeaserHeader
      v-if="!invite"
      heading-class="text-cc-red"
    >
      <template #heading>
        Play the Game!
      </template>
      <template #content>
        <p>
          Check out our alpha version and be part of the early development.
        </p>
        <div
          class="flex gap-4 flex-col pt-8"
        >
          <template v-if="user.earlyAccess?.active">
            <BaseCCButton
              :type="Color.RED"
              @click="downloadLatest"
            >
              Download Gameclient
            </BaseCCButton>
            <BaseCCButton
              v-if="!user.earlyAccess?.invitedByUser"
              :type="Color.TEAL"
              @click="invite = true"
            >
              Early Access for a Friend
            </BaseCCButton>
          </template>
          <template v-else>
            <p>For Early Access join our Discord</p>
            <LinkCCButton
              :type="Color.TEAL"
              to="https://discord.gg/ZKKbhUs"
            >
              Join Discord
            </LinkCCButton>
          </template>
        </div>
      </template>
    </TeaserHeader>
    <TeaserHeader
      v-else
      heading-class="text-[#40C1C7]"
    >
      <template #heading>
        Early access for a friend
      </template>
      <template #content>
        Insert the wallet address of your friend that you want to play with.
        <div class="grid grid-cols-2 gap-4 pt-8">
          <CCAddressInput
            v-model="inviteAddress"
            v-model:validated="addressValid"
            class="text-black col-span-2"
          />
          <BaseCCButton
            :type="Color.RED"
            @click="downloadLatest"
          >
            Download Gameclient
          </BaseCCButton>
          <BaseCCButton
            :type="Color.TEAL"
            :diabled="!addressValid"
          >
            Invite
          </BaseCCButton>
        </div>
      </template>
    </TeaserHeader>
  </FadeTeaserSmall>
</template>

<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import FadeTeaserSmall from "@/components/elements/Teaser/FadeTeaserSmall.vue";
import TeaserHeader from "@/components/elements/Teaser/TeaserHeader.vue";
import { Color } from "@/components/utils/color";
import {useUser} from "@/def-composables/useUser";
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import {ref} from "vue";
import CCAddressInput from "@/components/elements/CCInput/CCAddressInput.vue";

const {user} = useUser()
const addressValid = ref(false)
const inviteAddress = ref("")
const invite = ref(false)

const downloadLatest = () => {
  console.log("download ")
}

</script>
