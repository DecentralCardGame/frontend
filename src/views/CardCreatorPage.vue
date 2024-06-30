<template>
  <div class="min-h-screen bg-pink-950 flex flex-col items-center">
    <div>
      <div class="pt-24 pb-4 w-full text-white text-4xl">
        Card Creator
      </div>

      <div
        v-if="successScreenVisible"
        class="w-[60rem] p-8 mb-20 text-white text-center text-xl font-['Roboto'] bg-pussy-red bg-opacity-70 shadow-xl shadow-black/25"
      >
        <div class="uppercase font-bold pt-12">
          Congratulations!
        </div>
        <div class="p-4">
          You successfully minted your card!
        </div>
        <BaseCCButton
          class="p-16 pb-60"
          :type="Color.RED"
          @click="successScreenVisible = false"
        >
          Create another Card
        </BaseCCButton>
      </div>

      <div
        v-else
        class="w-[60rem] p-8 mb-20 text-white text-center text-xl font-['Roboto'] bg-pussy-red bg-opacity-70 shadow-xl shadow-black/25"
      >
        <!-- Progress Bar -->
        <div class="w-10/12 pt-10 pb-6 h-12 mx-auto">
          <div
            class="bg-red-600 rounded-full h-1 flex items-center justify-between"
          >
            <div
              v-for="(item, idx) in progressBar"
              :key="'activeStep' + idx"
              class="flex justify-between bg-red-600 rounded-full h-1 items-center relative"
              @click="activeStep = idx"
            >
              <div
                v-if="item == 'done' || item == 'active'"
                class="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -ml-3"
              >
                <img
                  v-if="item == 'active'"
                  :src="CCLogoSmallInvert"
                  alt="check"
                >
              </div>
              <div
                v-if="item == 'open'"
                class="bg-red-600 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-3"
              >
                <div class="h-3 w-3 bg-red-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <DefineNavigationButtons>
          <div class="flex flex-row justify-end space-x-3 pb-6">
            <NavigateCCButtons
              class="pr-4 scale-[2]"
              :start="activeStep == 0"
              :end="activeStep == progressBar.length - 1"
              @forward="
                activeStep = Math.min(activeStep + 1, progressBar.length - 1)
              "
              @backward="activeStep = Math.max(activeStep - 1, 0)"
            />
            <BaseCCButton
              v-if="activeStep < progressBar.length - 1"
              class=""
              :type="Color.RED"
              @click="
                activeStep = Math.min(activeStep + 1, progressBar.length - 1)
              "
            >
              Next
            </BaseCCButton>
          </div>
        </DefineNavigationButtons>

        <!-- Class Selection -->
        <div
          v-if="activeStep == 0"
          class=""
        >
          <div class="pt-8 p-3 text-s font-bold">
            CLASSES
          </div>
          <div class="text-s pb-4">
            Select one or multiple classes for your card.
          </div>

          <div class="flex justify-between px-12">
            <div
              v-for="item in ['Technology', 'Culture', 'Nature', 'Mysticism']"
              :key="'class' + item"
              class="p-5"
              :class="{ grayscale: !model.Class[item] }"
              @click="model.Class[item] = !model.Class[item]"
            >
              <img
                class="h-32"
                :class="{
                  'border-8 border-black rounded-full': model.Class[item],
                }"
                :src="classIcons[item]"
              >
              <div class="py-5 text-s font-bold uppercase">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="pr-[4.5rem]">
            <NavigationButtons />
          </div>
        </div>

        <!-- Type Selection -->
        <div
          v-if="activeStep == 1"
          class=""
        >
          <div class="pt-8 p-3 text-s font-bold">
            TYPE
          </div>
          <div class="text-s">
            Select the type of card you want.
          </div>

          <div class="flex justify-between px-20">
            <div
              v-for="item in ['Headquarter', 'Entity', 'Action', 'Place']"
              :key="'class' + item"
              class="py-10"
              @click="model.type = item"
            >
              <img
                v-show="item == model.type"
                class="h-32"
                :src="typeIcons[item].Off"
              >
              <img
                v-show="item !== model.type"
                class="h-32"
                :src="typeIcons[item].On"
              >
              <div class="pt-3 pb-1 text-s font-bold uppercase">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="pr-[4.5rem]">
            <NavigationButtons />
          </div>
        </div>

        <!-- Card Name -->
        <div
          v-if="activeStep == 2"
          class="flex flex-row justify-center"
        >
          <div class="pt-5 pb-4 h-[26.5rem]">
            <CardComponent
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>
          <div class="text-left flex flex-col justify-between">
            <div class="pl-12 py-5 justify-center">
              <div class="py-3 text-s font-bold">
                NAME
              </div>
              <div class="py-3 text-s">
                Pick a name for your card.
              </div>
              <div class="mt-3 bg-zinc-300 bg-opacity-20 shadow-inner">
                <input
                  v-model="model.CardName"
                  class="py-3 px-2 mx-3 bg-transparent text-white text-opacity-100 text-s focus:border-black border-0 border-solid focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
                  placeholder="Coolest Name around here"
                  maxLength="25"
                >
              </div>
            </div>
            <div class="pl-[9.4rem]">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div
          v-if="activeStep == 3"
          :class="{ 'bg-white bg-opacity-50': dragActive }"
          class="flex flex-row justify-center"
          @drop.prevent="onDrop"
          @dragover.prevent="dragActive = true"
          @dragleave.prevent="dragActive = false"
          @paste="onPaste"
        >
          <div class="pl-[4rem] pt-5 pb-4 h-[26.5rem]">
            <div v-if="cropImage == ''">
              <label
                for="dropzone-file"
                class=""
              >
                <div
                  class="h-[24rem] flex px-24 bg-white bg-opacity-[15%] hover:bg-pink-950 text-white text-opacity-50 text-7xl font-bold border-4 border-gray-100 border-opacity-50"
                >
                  <span class="flex items-center">+</span>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  @change="inputFile"
                >
              </label>
            </div>
            <img
              v-if="cropImage !== ''"
              class="h-[24rem] object-none"
              width="300"
              height="400"
              :src="cropImage"
              alt="check"
            >
          </div>
          <div class="text-left flex flex-col justify-between">
            <div class="pl-12 pr-[4.5rem] py-5 justify-center">
              <div class="p-3 font-bold text-left">
                ARTWORK
              </div>
              <div class="pl-3 pb-8 text-left">
                Click, drag or paste to upload an artwork.
              </div>
              <div class="p-3 text-left font-bold">
                COPYRIGHT
              </div>

              <div
                v-if="!artistMode"
                class="flex flex-col"
              >
                <div class="px-3 flex flex-row items-start">
                  <input
                    id="false"
                    v-model="designateArtist"
                    class="p-3 border-red-600 text-red-600 text-[20px]"
                    type="radio"
                    checked
                    :value="false"
                  >
                  <div class="px-3 text-left">
                    I hereby confirm that I own the rights to commercially use
                    this artwork.
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="px-3 flex flex-row">
                    <input
                      id="true"
                      v-model="designateArtist"
                      class="p-3 border-red-600 text-red-600"
                      type="radio"
                      :value="true"
                      @change="
                        cropImage = '';
                        model.image = '';
                      "
                    >
                    <div class="px-3 text-left">
                      Instead add another artist as a collaborator.
                    </div>
                  </div>
                  <div v-if="designateArtist && !artistMode">
                    <div
                      class="w-[27.3rem] ml-[2.1rem] mt-3 bg-zinc-300 bg-opacity-20 shadow-inner"
                    >
                      <input
                        v-model="artistAddress"
                        class="w-full py-3 px-2 mx-3 bg-transparent text-white text-opacity-100 text-s focus:border-black border-0 border-solid focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
                        placeholder="Add the artist's wallet address"
                        maxLength="41"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pr-[4.45rem] justify-end">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <!-- Crop Section -->
        <div
          v-if="activeStep == 4"
          class="pl-[4.2rem] pr-[5.2rem] grid grid-cols-8 grid-rows-7"
        >
          <!-- Card Preview -->
          <div
            class="pr-[1.65rem] pt-[1.25rem] pb-[1.0rem] row-start-1 row-span-6 col-start-1 col-span-3 place-self-start"
          >
            <CardComponent
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>

          <div class="pl-4 pr-4 text-left row-start-6 col-start-1 col-span-5">
            Drag and scroll in the cropper box on right <br>
            side to adjust image.
          </div>

          <!-- Onboard Preview -->
          <div class="h-12 row-start-1 row-span-6 col-start-4 col-span-2">
            <svg
              class=""
              width="168"
              height="260"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="maskImage">
                <image
                  :xlink:href="getOBMask()"
                  width="168"
                  height="260"
                />
              </mask>
              <image
                :xlink:href="model.image"
                width="120"
                x="24"
                y="20"
                height="260"
                mask="url(#maskImage)"
              />
              <image
                :xlink:href="getOBFrame()"
                width="168"
                height="260"
              />
            </svg>
          </div>

          <!-- Cropper -->
          <div
            class="pt-[1.75rem] pb-[1.75rem] row-start-1 row-span-6 col-start-6 col-span-3"
          >
            <div class="">
              <cropper
                class="cropper"
                :src="cropImage"
                :auto-zoom="true"
                :stencil-size="{
                  width: cardBounds.x,
                  height: cardBounds.y,
                }"
                :canvas="{
                  width: cardBounds.x * 1.2,
                  height: cardBounds.y * 1.2,
                }"
                :default-size="{
                  width: cardBounds.x * 1.2,
                  height: cardBounds.y * 1.2,
                }"
                image-restriction="none"
                @change="changeCrop"
              />
            </div>
          </div>

          <div
            class="pr-[0.0rem] pt-[0.8rem] row-start-7 row-span-1 col-start-4 col-span-5"
          >
            <NavigationButtons />
          </div>
        </div>

        <!-- Flavor -->
        <div
          v-if="activeStep == 5"
          class="flex flex-row justify-center"
        >
          <div class="pt-5 pb-4 h-[26.5rem]">
            <CardComponent
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>
          <div class="text-left flex flex-col justify-between">
            <div class="pl-12 py-5 justify-center">
              <div class="py-3 text-s font-bold">
                FLAVOR
              </div>
              <div class="py-3 text-s">
                Now let's add some spice to your creation.
              </div>
              <div class="mt-3 bg-zinc-300 bg-opacity-20 shadow-inner">
                <input
                  v-model="model.FlavourText"
                  class="py-3 px-2 mx-3 bg-transparent text-white text-opacity-100 text-s focus:border-black border-0 border-solid focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
                  placeholder="Quote that represents this card."
                  maxLength="250"
                >
              </div>
            </div>
            <div class="pl-[9.4rem]">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <!-- Costs and Powers -->
        <div
          v-if="activeStep == 6"
          class="flex flex-row justify-center"
        >
          <div class="pt-5 pb-4 h-[26.5rem]">
            <CardComponent
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>
          <div class="text-left flex flex-col justify-between">
            <div class="pl-12 pr-[4.5rem] py-5 justify-center">
              <div class="py-3 text-s font-bold">
                COSTS AND POWERS
              </div>

              <div
                v-if="
                  cardRules.Card.children[getRulesType()] &&
                    cardRules.Card.children[getRulesType()].children.CastingCost
                "
                class="h-10"
              >
                Casting Cost
                <Dropdown
                  v-model="model.CastingCost"
                  :type="Color.PUSSYRED"
                  :options="getGenericCardRange('CastingCost')"
                />
                Mana
              </div>

              <!-- Special Cost -->
              <div
                v-if="
                  cardRules.Card.children[getRulesType()] &&
                    cardRules.Card.children[getRulesType()].children
                      .AdditionalCost
                "
                class="h-14"
              >
                Special Cost:
                <Dropdown
                  initial="Select Special Cost"
                  :options="getSpecialCostRange()"
                  :display-fn="specialCostLabels"
                  class="m-2"
                  @update:model-value="setAdditionalCost($event)"
                />
                <span v-if="model.AdditionalCost.DiscardCost">
                  <Dropdown
                    v-model="model.AdditionalCost.DiscardCost.Amount"
                    :options="getGenericCostRange('DiscardCost')"
                    class="m-2"
                    @update:model-value="updateAdditionalCostText"
                  />
                  cards from your hand.
                </span>
                <span v-if="model.AdditionalCost.SacrificeCost">
                  <Dropdown
                    v-model="model.AdditionalCost.SacrificeCost.Amount"
                    :options="getGenericCostRange('SacrificeCost')"
                    class="m-2"
                    @update:model-value="updateAdditionalCostText"
                  />
                  Entitites.
                </span>
                <span v-if="model.AdditionalCost.VoidCost">
                  <Dropdown
                    v-model="model.AdditionalCost.VoidCost.Amount"
                    :options="getGenericCostRange('VoidCost')"
                    class="m-2"
                    @update:model-value="updateAdditionalCostText"
                  />
                  cards from your graveyard.
                </span>
              </div>

              <!-- Delay -->
              <div
                v-if="model.type === 'Headquarter'"
                class="h-[3rem]"
              >
                <b>Delay</b> of Activation:
                <Dropdown
                  v-model="model.Delay"
                  :options="getHQDelayRange()"
                />
                turns.
              </div>

              <!-- Attack -->
              <div
                v-if="
                  model.type === 'Entity' &&
                    cardRules.Card.children[getRulesType()]
                "
                class="h-[3rem]"
              >
                Attack
                <Dropdown
                  v-model="model.Attack"
                  :options="getGenericCardRange('Attack')"
                />
              </div>

              <!-- Defense -->
              <div
                v-if="
                  model.type !== 'Action' &&
                    cardRules.Card.children[getRulesType()]
                "
                class="h-[2.5rem]"
              >
                Defense
                <Dropdown
                  v-model="model.Health"
                  :options="getGenericCardRange('Health')"
                />
              </div>

              <!-- Tags -->
              <div
                v-if="cardRules.Card"
                class="h-14"
              >
                Tags:
                <Dropdown
                  v-model="model.Tags[0]"
                  initial="Select 1st"
                  :options="getTags(0)"
                  class="m-2"
                  @update:model-value="updateTags"
                />
                <Dropdown
                  v-if="model.Tags[0]"
                  v-model="model.Tags[1]"
                  initial="Select 2nd"
                  :options="getTags(1)"
                  :display-fn="(x) => (x == '' ? '<remove>' : x)"
                  class="m-2"
                  @update:model-value="updateTags"
                />
              </div>
            </div>
            <div class="pl-[9.4rem]">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <!-- Abilities and Effects -->
        <div
          v-if="activeStep == 7"
          class="pl-1 pr-[5rem] flex flex-row justify-center"
        >
          <div class="p-[2rem] pt-5 pb-4 h-[26.5rem]">
            <CardComponent
              v-if="!isAbilityModalVisible"
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>
          <div class="text-left flex flex-col justify-between">
            <div class="py-5 justify-center">
              <div class="py-3 text-s font-bold">
                ABILITIES AND EFFECTS
              </div>
              <div
                v-if="isEmpty(abilities)"
                class="text-right"
              >
                <Checkbox v-model="clearAbilities">
                  Remove all abilities
                </Checkbox>
              </div>

              <div v-if="!clearAbilities">
                <div class="py-3 text-s">
                  Click to add abilities or effects to your card.
                </div>
                <div id="abiliy container">
                  <div
                    v-for="(abilityEntry, index) in abilities"
                    id="ability"
                    :key="abilityEntry.ability"
                    class="flex flex-col"
                  >
                    <AbilityComponent
                      id="AbilityComponent"
                      class="px-2 mb-3 flex bg-white bg-opacity-[15%] text-white text-opacity-100 font-bold border-4 border-gray-100 border-opacity-50"
                      :abilities="abilities"
                      :ability-prop="abilityEntry"
                      :dialog-prop="abilityDialog"
                      :model="model"
                      @update:ability="updateAbility($event, index)"
                    />
                  </div>
                </div>
                <div v-if="model.type === 'Action'">
                  <button
                    class=""
                    type="button"
                    @click="showAbilityModal('root')"
                  >
                    Add Effect
                  </button>
                </div>
                <div
                  v-else-if="!isAbilityModalVisible"
                  id="addmore"
                  class=""
                >
                  <button
                    class="px-[12.7rem] bg-white bg-opacity-[15%] hover:bg-pink-950 text-white text-opacity-50 text-7xl font-bold border-4 border-gray-100 border-opacity-50"
                    type="button"
                    @click="showAbilityModal('root')"
                  >
                    +
                  </button>
                </div>
                <div id="AbilityModal">
                  <AbilityModal
                    v-if="isAbilityModalVisible"
                    :abilities-prop="abilities"
                    :ability="ability"
                    :dialog-prop="abilityDialog"
                    :cardmodel="model"
                    @close="closeAbilityModal"
                    @update:ability="ability = $event"
                  />
                </div>
              </div>
            </div>
            <div class="pl-[9.4rem]">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <!-- Council Notes -->
        <div
          v-if="activeStep == 8"
          class="flex flex-row justify-center"
        >
          <div class="t-5 pb-4 h-[26.5rem]">
            <CardComponent
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>
          <div class="text-left flex flex-col justify-between">
            <div class="pl-12 py-5 justify-center">
              <div class="py-3 text-s font-bold">
                NOTES TO THE COUNCIL
              </div>
              <div class="py-3 text-s">
                Anything that you believe needs explaining.
              </div>
              <div class="mt-3 bg-zinc-300 bg-opacity-20 shadow-inner">
                <input
                  v-model="model.notes"
                  class="py-3 px-2 mx-3 bg-transparent text-white text-opacity-100 text-s focus:border-black border-0 border-solid focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
                  placeholder="Or some kind words."
                  maxLength="25"
                >
              </div>

              <!-- this only shows to Jannik and should not be available to ordinary users, design is irrelevant here -->
              <span
                v-if="address == 'cc14km80077s0hch3sh38wh2hfk7kxfau4456r3ej'"
                class=""
              >
                Balance Anchor
              </span>
              <input
                v-if="address == 'cc14km80077s0hch3sh38wh2hfk7kxfau4456r3ej'"
                v-model="model.balanceAnchor"
                type="checkbox"
                class=""
              >
            </div>
            <div class="pl-[9.4rem]">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <!-- Submit Section -->
        <div
          v-if="activeStep == 9"
          class="flex flex-row justify-center"
        >
          <div class="pt-5 pb-4 h-[26.5rem]">
            <CardComponent
              id="card"
              :active-step="activeStep"
              :display-notes="true"
              :image-u-r-l="getCardImage()"
              :model="model"
            />
          </div>
          <div class="text-left flex flex-col">
            <div class="py-5 flex flex-col items-start">
              <div class="pl-12 py-3 text-s font-bold">
                SUMMARY
              </div>
              <div
                v-if="model.FlavourText !== ''"
                class="pl-12 min-h-[4rem] text-s italic"
              >
                "{{ model.FlavourText }}"
              </div>
              <div
                v-else
                class="h-[4rem]"
              />

              <div class="">
                <!-- Edit existing card case -->
                <div v-if="mode == Mode.EDIT">
                  <div class="pt-[4.55rem] text-right">
                    <div class="pb-[1.7rem]">
                      Review and update your card.
                    </div>

                    <BaseCCButton
                      class=""
                      :type="Color.RED"
                      @click="resetCard()"
                    >
                      Discard Edit
                    </BaseCCButton>
                    <div class="flex flex-row pt-3 pl-[11.2rem]">
                      <NavigateCCButtons
                        class="pr-4 scale-[2]"
                        :start="activeStep == 0"
                        :end="activeStep == progressBar.length - 1"
                        @forward="
                          activeStep = Math.min(
                            activeStep + 1,
                            progressBar.length - 1,
                          )
                        "
                        @backward="activeStep = Math.max(activeStep - 1, 0)"
                      />
                      <BaseCCButton
                        :type="Color.RED"
                        @click="saveSubmit()"
                      >
                        Update your Card
                      </BaseCCButton>
                    </div>
                  </div>
                </div>
                <!-- New card case -->
                <div v-else>
                  <!-- Enough card frames -->
                  <div v-if="availableCardFrames != 0">
                    <div class="pt-[8rem] pr-1 text-right">
                      <div>Review and mint your card.</div>
                      <div class="text-base font-bold">
                        Your available Card Frames: {{ availableCardFrames }}
                      </div>
                    </div>

                    <div class="flex flex-row pt-[3.0rem] pl-[11.2rem]">
                      <NavigateCCButtons
                        class="pr-4 scale-[2]"
                        :start="activeStep == 0"
                        :end="activeStep == progressBar.length - 1"
                        @forward="
                          activeStep = Math.min(
                            activeStep + 1,
                            progressBar.length - 1,
                          )
                        "
                        @backward="activeStep = Math.max(activeStep - 1, 0)"
                      />
                      <BaseCCButton
                        :type="Color.RED"
                        @click="saveSubmit()"
                      >
                        Mint Card
                      </BaseCCButton>
                    </div>
                  </div>
                  <!-- Not enough card frames -->
                  <div
                    v-else
                    class="flex flex-col items-end"
                  >
                    <div class="pt-0 pr-1 text-right">
                      <div class="py-3 text-s uppercase font-bold">
                        Buy Card Frame
                      </div>
                      <div class="text-base">
                        Market price: <b> {{ cardFramePrice }} credits </b>
                        <br>
                        Your credit balance:
                        <b> {{ availableCredits }} credits </b>
                      </div>
                    </div>
                    <div class="pt-[2rem] pr-1 text-right">
                      <div>Review and mint your card.</div>
                      <div class="text-base font-bold">
                        Your available Card Frames: {{ availableCardFrames }}
                      </div>
                    </div>
                    <div class="flex flex-row pt-[2.0rem] pl-[11.2rem]">
                      <NavigateCCButtons
                        class="pr-4 scale-[2]"
                        :start="activeStep == 0"
                        :end="activeStep == progressBar.length - 1"
                        @forward="
                          activeStep = Math.min(
                            activeStep + 1,
                            progressBar.length - 1,
                          )
                        "
                        @backward="activeStep = Math.max(activeStep - 1, 0)"
                      />
                      <BaseCCButton
                        :type="Color.RED"
                        @click="buyFrameAndSubmit()"
                      >
                        Buy and Mint Card Frame
                      </BaseCCButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO IMPLEMENT PROPER ARTIST MODE

          <div
            v-if="!artistMode"
            class="creator-nav-container ccbutton"
            align="center"
          >
            <button
              v-if="activeStep > 0"
              class="back"
              @click="activeStep--"
            >
              Go Back
            </button>
            <button
              v-if="activeStep < 4"
              @click="activeStep++"
            >
              Next Step >
            </button>

          </div>
  -->
</template>

<script lang="ts">
import CCLogoSmallInvert from "@/assets/figma/CCLogoSmallInvert.png";
import HeadquarterOn from "@/assets/figma/TypesButtons/hq.png";
import HeadquarterOff from "@/assets/figma/TypesButtons/hq_unselected.png";
import ActionOn from "@/assets/figma/TypesButtons/action.png";
import ActionOff from "@/assets/figma/TypesButtons/action_unselected.png";
import EntityOn from "@/assets/figma/TypesButtons/entity.png";
import EntityOff from "@/assets/figma/TypesButtons/entity_unselected.png";
import PlaceOn from "@/assets/figma/TypesButtons/place.png";
import PlaceOff from "@/assets/figma/TypesButtons/place_unselected.png";
import MysticismIcon from "@/assets/figma/MysticismIcon.svg";
import TechnologyIcon from "@/assets/figma/TechnologyIcon.svg";
import CultureIcon from "@/assets/figma/CultureIcon.svg";
import NatureIcon from "@/assets/figma/NatureIcon.svg";
import OBAction from "@/assets/onboard/OBAction.png";
import OBEntity from "@/assets/onboard/OBEntity.png";
import OBPlace from "@/assets/onboard/OBPlace.png";
import OBHQ from "@/assets/onboard/OBHQ.png";
import OBActionMask from "@/assets/onboard/OBActionMask.png";
import OBEntityMask from "@/assets/onboard/OBEntityMask.png";
import OBPlaceMask from "@/assets/onboard/OBPlaceMask.png";
import OBHQMask from "@/assets/onboard/OBHQMask.png";
import Checkbox from "@/components/elements/Checkbox.vue";

import "vue-advanced-cropper/dist/style.css";
import { Color } from "@/components/utils/color";
import * as R from "ramda";
import { createReusableTemplate } from "@vueuse/core";

import mergeImages from "merge-images";
import CardComponent from "../components/elements/CardComponent.vue";
import BuyFrameModal from "../components/modals/BuyFrameModal.vue";
import AbilityModal from "../components/modals/AbilityModal.vue";
import AbilityComponent from "../components/elements/AbilityComponent.vue";
import { env } from "@/env";

import { atPath, uploadImg } from "@/components/utils/utils.js";

import { Cropper } from "vue-advanced-cropper";
import { Card } from "@/model/Card";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useCardsRules } from "@/def-composables/useCardRules";
import { useAddress } from "@/def-composables/useAddress";
import { useTx } from "@/def-composables/useTx";
import { useNotifications } from "@/def-composables/useNotifications";
import { validAddress } from "@/utils/validation";
import { useQuery } from "@/def-composables/useQuery";
import { useUser } from "@/def-composables/useUser";
import { isASCII } from "@/utils/utils";
import { Coin } from "@/model/Coin";
import { computed, type ComputedRef, onMounted, reactive } from "vue";

import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import NavigateCCButtons from "@/components/elements/NavigateButtons/NavigateCCButtons.vue";
import Dropdown from "@/components/elements/Dropdown/Dropdown.vue";

const [DefineNavigationButtons, NavigationButtons] = createReusableTemplate();
const { saveCardContent, addArtwork, buyCardScheme } = useTx();
const { queryQUser, queryQCardchainInfo } = useQuery();
const { user, coins, queryUser, queryCoins } = useUser();

enum Mode {
  EDIT = 0,
  CREATE = 1,
}

export default {
  name: "CardCreator",
  components: {
    Dropdown,
    DefineNavigationButtons,
    NavigationButtons,
    NavigateCCButtons,
    BaseCCButton,
    CardComponent,
    AbilityComponent,
    BuyFrameModal,
    AbilityModal,
    Cropper,
    Checkbox,
  },
  setup() {
    const typeIcons = {
      Headquarter: { On: HeadquarterOn, Off: HeadquarterOff },
      Action: { On: ActionOn, Off: ActionOff },
      Entity: { On: EntityOn, Off: EntityOff },
      Place: { On: PlaceOn, Off: PlaceOff },
    };

    const classIcons = {
      Mysticism: MysticismIcon,
      Technology: TechnologyIcon,
      Culture: CultureIcon,
      Nature: NatureIcon,
    };

    const { editCard, draft } = useCardCreatorCards();
    const { loggedIn } = useLoggedIn();
    const { rules } = useCardsRules();
    const { address } = useAddress();
    const { notifyInfo, notifyFail } = useNotifications();

    return {
      CCLogoSmallInvert,
      OBAction,
      OBEntity,
      OBPlace,
      OBHQ,
      OBActionMask,
      OBEntityMask,
      OBPlaceMask,
      OBHQMask,
      typeIcons,
      classIcons,
      cardCreatorEditCard: editCard.card,
      cardCreatorDraft: draft.card,
      cardRules: rules,
      loggedIn,
      address,
      notifyInfo,
      notifyFail,
    };
  },
  data() {
    return {
      progressBar: [
        "active",
        "open",
        "open",
        "open",
        "open",
        "open",
        "open",
        "open",
        "open",
        "open",
      ],
      dragActive: false,
      isAbilityModalVisible: false,
      isBuyFrameModalVisible: false,
      successScreenVisible: false,
      clearAbilities: false,
      activeStep: 0,
      ability: {},
      abilities: [],
      abilityDialog: {},
      model: new Card(),
      artistMode: false,
      designateArtist: false,
      artistAddress: "",
      cardBounds: { x: env.cardImgSizeX, y: env.cardImgSizeY },
      cropImage: "",
      cardID: 0,
      availableCardFrames: computed(() => user.value.ownedCardSchemes.length),
      availableCredits: computed(() => {
        let usableCoins: Coin[] = coins.value.filter(
          (coin: Coin) => coin.denom == "ucredits",
        );
        if (usableCoins.length == 0) {
          throw new Error("No usable coins available");
        }
        return Coin.from(usableCoins[0]).normalize().amount;
      }),
      cardFramePrice: 0,
      mode: Mode.CREATE,
      Mode: Mode,
    };
  },
  computed: {
    Color() {
      return Color;
    },
  },
  watch: {
    activeStep() {
      this.progressBar.forEach((item, idx) => {
        this.progressBar[idx] =
          idx > this.activeStep
            ? "open"
            : idx < this.activeStep
              ? "done"
              : "active";
      });
      if (this.activeStep == 9) {
        this.cardFramesMarketData();
        queryUser();
      }
    },
    model() {
      if (this.mode === Mode.EDIT) {
        this.cardCreatorEditCard = this.model;
      } else {
        this.cardCreatorDraft = this.model;
      }
      this.setMode();
    },
    address() {
      this.checkCardFrames();
      console.log("ADDRESS CHANGED");
    },
  },
  mounted() {
    console.log("print model after mounted", this.model);
    if (!this.loggedIn) {
      this.notifyInfo("Not logged in", "You must login to create a card.");
    }

    if (!this.cardRules) {
      // here comes a synchronous wait and it is intended
      const end = Date.now() + 1000;
      while (Date.now() < end && !this.cardRules.Card) continue;

      // if waiting did not help, route back to / (without cardRules.Card this page makes no sense)
      if (!this.cardRules)
        this.notifyFail(
          "CardRules",
          "CardRules were not properly loaded. This is really bad.",
        );
      this.$router.push("/");
    } else {
      console.log("cardRules:", this.cardRules);
    }

    this.setMode();

    // here a card is loaded if edit card via gallery was selected
    if (this.mode == Mode.EDIT) {
      this.model = this.cardCreatorEditCard;
      if (!this.model.AdditionalCost) this.model.AdditionalCost = {};
      console.log("edit card: ", this.model);

      this.cropImage = this.model.image;

      this.designateArtist = this.model.artist != this.model.owner;
      if (this.designateArtist) {
        this.artistAddress = this.model.artist;
        if (this.artistAddress === this.address) this.artistMode = true;
      }
      return;
    } else {
      this.model = this.cardCreatorDraft;
      console.log("loaded model:", this.model, R.is(Object, this.model));

      if (this.model.image) {
        this.cropImage = this.cardCreatorDraft.image;
      }
    }
  },
  methods: {
    isEmpty(a) {
      return R.isEmpty(a);
    },
    getOBMask() {
      switch (this.model.type) {
        case "Place":
          return OBPlaceMask;
        case "Entity":
          return OBEntityMask;
        case "Headquarter":
          return OBHQMask;
        case "Action":
          return OBActionMask;
      }
    },
    getOBFrame() {
      switch (this.model.type) {
        case "Place":
          return OBPlace;
        case "Entity":
          return OBEntity;
        case "Headquarter":
          return OBHQ;
        case "Action":
          return OBAction;
      }
    },
    getHQDelayRange() {
      return R.range(
        this.cardRules.Card.children[this.getRulesType()].children.Delay.min ||
          0,
        this.cardRules.Card.children[this.getRulesType()].children.Delay.max +
          1,
      );
    },
    getGenericCostRange(key: string) {
      return R.range(
        this.cardRules.Card.children[this.getRulesType()].children
          .AdditionalCost.children[key].children.Amount.min || 0,
        this.cardRules.Card.children[this.getRulesType()].children
          .AdditionalCost.children[key].children.Amount.max + 1,
      );
    },
    getSpecialCostRange() {
      let specialCosts = R.keys(
        this.cardRules.Card.children[this.getRulesType()].children
          .AdditionalCost.children,
      );
      return specialCosts;
    },
    setAdditionalCost(costType) {
      this.model.AdditionalCost = {};
      this.model.AdditionalCost[costType] = {
        Amount: 0,
      };
      this.updateAdditionalCostText();
    },
    specialCostLabels(wholeString) {
      let countUppers = (x) =>
        R.sum(R.map((x) => (x === R.toUpper(x) ? 1 : 0), R.split("", x)));

      let printString = "";
      while (
        countUppers(printString) < 2 &&
        printString.length < wholeString.length
      ) {
        printString = R.take(printString.length + 1, wholeString);
      }

      return printString.length > 1 ? R.dropLast(1, printString) : "";
    },
    getGenericCardRange(key: string): number[] {
      let range: number[] = [];
      for (
        let i =
          this.cardRules.Card.children[this.getRulesType()].children[key].min ||
          0;
        i <
        this.cardRules.Card.children[this.getRulesType()].children[key].max + 1;
        i++
      ) {
        range.push(i);
      }
      return range;
    },
    setMode() {
      if (this.cardCreatorEditCard.isEditCard()) {
        this.mode = Mode.EDIT;
      } else {
        this.mode = Mode.CREATE;
      }
    },
    changeCrop({ canvas }) {
      mergeImages([canvas.toDataURL("image/jpeg", 0.9)]).then((b64) => {
        this.srcToFile(b64, "image.jpg", "image/jpeg").then((file) => {
          uploadImg(file, env.cardImgMaxKB, (result) => {
            if (result.startsWith("Error")) {
              this.notifyFail("Failed to Upload", result);
              return;
            }
            this.model.image = result;
          });
        });
      });
    },
    srcToFile(src, fileName, mimeType) {
      return fetch(src)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], fileName, { type: mimeType });
        });
    },
    showAbilityModal(type) {
      let atRules = R.curry(atPath)(this.cardRules.Card);

      this.isAbilityModalVisible = true;

      if (type === "root") {
        if (this.abilities.length >= 3) {
          this.notifyFail(
            "Number of Abilities",
            "A card can only have a maximum of 3 Abilities.",
          );
          this.isAbilityModalVisible = false;
          return;
        }
        if (this.model.type === "no type" || this.model.type === undefined) {
          this.notifyFail(
            "No Type",
            "Card has no type, please pick a type before setting abilities.",
          );
          this.isAbilityModalVisible = false;
          return;
        }

        let newAbility = {
          path: [
            "children",
            this.getRulesType(),
            "children",
            this.getRulesType() === "Action" ? "Effects" : "Abilities",
            "children",
            this.getRulesType() === "Action" ? "Effect" : "Ability",
            "children",
          ],
        };

        let options = atRules(newAbility.path);

        let dialog = {
          title: this.model.type === "Action" ? "New Effect" : "New Ability",
          description: atRules(R.dropLast(1, newAbility.path)).description,
          type: "root",
          options: options,
          rulesPath: newAbility.path,
          abilityPath: [],
        };

        console.log("dialog", dialog);

        // this is the bugfix for replay selection bug
        R.forEachObjIndexed(function (option) {
          if (option.selected) delete option.selected;
        }, dialog.options);

        this.abilityDialog = dialog;
      } else {
        console.error("modal type unknown: ", type);
      }
    },
    closeAbilityModal() {
      console.log("ability after close modal: ", this.ability);
      this.isAbilityModalVisible = false;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    updateAbility($event, index) {
      this.ability = $event;
      this.abilities[index] = $event;

      // this is the delete case
      if ($event === null) {
        this.abilities.splice(index, 1);
      }
      console.log("abilities after update", this.abilities);

      // keep in mind this works for action cards, because effects are temporarily stored in this.abilities
      let keywordCount = R.length(
        R.flatten(R.pluck("keywords", this.abilities)),
      );
      console.log("keywordCount", keywordCount);
      if (keywordCount >= 6 && keywordCount <= 8) {
        this.notifyInfo(
          "Number of Keywords",
          "You have added " +
            keywordCount +
            " Keywords to this card. 8 is the maximum.",
        );
      } else if (keywordCount > 8) {
        this.notifyFail(
          "Number of Keywords",
          "You have added more than 8 Keywords to this card. Please limit to 8.",
        );
      }

      this.updateRulesTexts();
    },
    updateRulesTexts() {
      this.model.RulesTexts = R.map(
        this.interactionTextToString,
        this.abilities,
      );

      this.updateAdditionalCostText();
    },
    updateAdditionalCostText() {
      let setOrPrepend = (text) => {
        if (
          this.model.RulesTexts[0] &&
          R.equals("Extra", R.take(5, this.model.RulesTexts[0]))
        )
          this.model.RulesTexts[0] = text;
        else this.model.RulesTexts = R.prepend(text, this.model.RulesTexts);
      };

      if (this.model.AdditionalCost && !R.isEmpty(this.model.AdditionalCost)) {
        if (this.model.AdditionalCost.SacrificeCost) {
          let text =
            "Extra Cost - Sacrifice " +
            this.model.AdditionalCost.SacrificeCost.Amount +
            " Entity.";
          setOrPrepend(text);
        } else if (this.model.AdditionalCost.DiscardCost) {
          let text =
            "Extra Cost - Discard " +
            this.model.AdditionalCost.DiscardCost.Amount +
            " Card.";
          setOrPrepend(text);
        } else if (this.model.AdditionalCost.VoidCost) {
          let text =
            "Extra Cost - Void " +
            this.model.AdditionalCost.VoidCost.Amount +
            " Card.";
          setOrPrepend(text);
        }
      } else {
        if (
          this.model.RulesTexts[0] &&
          R.equals("Extra", R.take(5, this.model.RulesTexts[0]))
        )
          this.model.RulesTexts = R.drop(1, this.model.RulesTexts);
      }
    },
    getCardImage() {
      return this.model.image;
    },
    resetAbilities() {
      this.abilities = [];
    },
    getRulesType() {
      //return this.model.type === "Headquarter" ? "Headquarter" : this.model.type;
      return this.model.type;
    },
    getTypes() {
      return R.keys(this.cardRules.Card.children);
    },
    getTags(idx) {
      if (this.cardRules.Card) {
        let usedTags = [];
        let allTags =
          this.cardRules.Card.children.Action.children.Tags.children.Tag.enum;
        if (this.model.Tags[idx]) {
          // all tags already used except self
          usedTags = R.without(this.model.Tags[idx], this.model.Tags);
        }
        // if this is the last dropdown, allow to select nothing
        if (idx == 1) {
          return R.append("", R.without(usedTags, allTags));
        } else {
          // otherwise nothing is not an option (user must remove the last tag and not one in the middle)
          return R.without(usedTags, allTags);
        }
      } else {
        console.error("shit cardschema not available");
        return [];
      }
    },
    updateTags() {
      if (this.model.Tags[1] == "") this.model.Tags = [this.model.Tags[0]];
      if (!this.model.Tags) {
        this.model.Tags = [];
      }
    },
    interactionTextToString(ability) {
      let string = "";
      ability.interaction.forEach((entry) => {
        if (entry.btn.type !== "expandArray")
          string += entry.pre + entry.btn.label + entry.post;
      });
      return string;
    },
    async getCardFrames() {
      return await queryQUser(this.address).then((res: User) => {
        //this.availableCardFrames = res.ownedCardSchemes.length || 0
        return 0; //this.availableCardFrames
      });
    },
    checkCardFrames() {
      return !R.isEmpty(this.getCardFrames());
    },
    cardFramesMarketData() {
      queryQCardchainInfo({})
        .then((res) => {
          this.cardFramePrice = res.cardAuctionPrice.normalize().amount;
        })
        .catch((res) => {
          console.error(res);
        });
    },
    validateCreatedCard() {
      // if the artist is just uploading a new image, this is easy:
      if (this.artistMode) {
        if (!this.model.image) {
          this.notifyFail(
            "No Image",
            "Card has no image, please upload an image.",
          );
          return;
        }
        addArtwork(
          this.model.id,
          this.model.image,
          this.model.fullArt,
          this.resetCard,
          (err) => {
            this.notifyFail("Update Artwork failed", err);
            console.error(err);
          },
        );
        return;
      }

      // otherwise: check all things that must be entered:
      if (!this.model.CardName) {
        this.notifyFail("No Name", "Card has no name, please enter a name.");
        return;
      }
      if (!this.model.type || this.model.type === "no type") {
        this.notifyFail("Wrong Type", "please pick a type");
        return;
      }
      if (!this.designateArtist && !this.model.image) {
        this.notifyFail(
          "No Image",
          "Card has no image, please upload an image.",
        );
        return;
      }
      if (this.designateArtist && !validAddress(this.artistAddress)) {
        this.notifyFail(
          "Invalid Address",
          "The address given for designated artist is invalid.",
        );
        return;
      }
      if (this.designateArtist && !validAddress(this.artistAddress)) {
        this.notifyFail(
          "Invalid Address",
          "The address given for designated artist is invalid.",
        );
        return;
      }
      if (!this.model.Tags[0]) {
        this.notifyFail(
          "No Tags",
          "Card has no Tag, please pick at least one tag.",
        );
        return;
      }
      if (!this.model.FlavourText[0] && !this.abilities) {
        this.notifyFail(
          "No Flavor Text",
          "Card has no flavor text and no abilities, please enter something.",
        );
        return;
      }
      if (R.length(R.flatten(R.pluck("keywords", this.abilities))) > 8) {
        this.notifyFail(
          "Too many Keywords",
          "Card has too many Keywords. You must reduce to 8 or less.",
        );
        return;
      }
      // in the following part we check things that are only required for specific card types
      if (this.model.type !== "Headquarter") {
        if (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0) {
          this.notifyFail(
            "No Cost",
            "Card has no Casting Cost, please pick a number.",
          );
          return;
        }
      }
      if (this.model.type !== "Action") {
        if (R.isNil(this.model.Health)) {
          this.notifyFail(
            "No Health",
            "Card has no Health, please pick a number.",
          );
          return;
        }
      }
      if (this.model.type === "Entity") {
        if (R.isNil(this.model.Attack)) {
          this.notifyFail(
            "No Attack",
            "Card has no Attack, please pick a number.",
          );
          return;
        }
      }

      // finalize abilties or effects
      // this should potentially moved to somewhere else? maybe where abilities are saved
      let newModel = this.model;

      if (this.model.type !== "Action") {
        // check if the old abilities should be restored
        if (
          this.mode == Mode.EDIT &&
          !this.clearAbilities &&
          R.isEmpty(this.abilities)
        ) {
          newModel.Abilities = R.clone(this.cardCreatorEditCard.Abilities);
        }
        // this writes the relevant part of the abilities in the new model
        else {
          newModel.Abilities = R.map(
            R.pick(
              R.keys(
                this.cardRules.Card.children.Entity.children.Abilities.children
                  .Ability.children,
              ),
            ),
            this.abilities,
          );
        }
        // if an ability was created, but it has no effect, then this should be fixed
        if (newModel.Abilities.length > 0) {
          let effectsList = R.flatten(
            R.map((x) => R.values(R.pluck("Effects", x)), newModel.Abilities),
          );

          if (R.any((y) => y === undefined, effectsList)) {
            this.notifyFail(
              "Useless Ability",
              "Card has an Ability, which does not do anything. Please add an Effect to the Ability.",
            );
            return;
          }
        }
      } else if (this.model.type === "Action") {
        // check if the old effects should be restored
        if (
          this.mode == Mode.EDIT &&
          !this.clearAbilities &&
          R.isEmpty(this.abilities)
        ) {
          newModel.Effects = R.clone(this.cardCreatorEditCard.Effects);
        }
        // this writes the relevant part of the effects in the new model
        else {
          newModel.Effects = R.map(
            R.pick(
              R.keys(
                this.cardRules.definitions.Card.children.Action.children.Effects
                  .children.Effect.children,
              ),
            ),
            this.abilities,
          );
        }
        // if an ability was created, but it has no effect, then this should be fixed
        if (newModel.Effects.length == 0) {
          this.notifyFail(
            "No Effects",
            "Card has no effect. Maybe you forgot to add an effect?",
          );
          return;
        }
      }
      // check if the old Keywords and RulesTexts should be restored
      let checkAdditionalCost = () => {
        return (
          (this.model.AdditionalCost.SacrificeCost &&
            this.model.AdditionalCost.SacrificeCost.Amount > 0) ||
          (this.model.AdditionalCost.DiscardCost &&
            this.model.AdditionalCost.DiscardCost.Amount > 0) ||
          (this.model.AdditionalCost.VoidCost &&
            this.model.AdditionalCost.VoidCost.Amount > 0)
        );
      };
      if (this.mode == Mode.EDIT) {
        newModel.RulesTexts = this.cardCreatorEditCard.RulesTexts;
        if (!checkAdditionalCost()) {
          this.model.AdditionalCost = {};
        }
        this.updateAdditionalCostText();
      } else {
        if (!checkAdditionalCost()) {
          this.model.AdditionalCost = {};
        }
        this.updateRulesTexts();
      }

      newModel.image = this.model.image;
      newModel.balanceAnchor = this.model.balanceAnchor;

      // many characters will not make it into the blockchain, so here we check if all is valid ASCII
      let checkASCII = (string, origin) => {
        string.split("").forEach((char) => {
          if (!isASCII(char)) {
            console.error("char " + char + " is not ASCII compatible.");
            this.notifyFail(
              "INVALID CHARACTER",
              "You used symbol " +
                char +
                " in " +
                origin +
                " and it is not supported.",
            );
          }
        });
      };

      checkASCII(newModel.FlavourText, "Flavour Text");
      checkASCII(newModel.CardName, "Card Name");

      let newCard = newModel.toChainCard();
      newCard.artist = this.designateArtist ? this.artistAddress : this.address;

      console.log("valid card:", newCard);
      return newCard;
    },
    buyFrameAndSubmit() {
      if (!this.validateCreatedCard()) return;

      buyCardScheme(
        new Coin("credits", this.cardFramePrice).denormalize().toCompatCoin(),
        () => {
          queryUser();
          queryCoins();
          this.saveSubmit();
        },
        console.error,
      );
    },
    saveSubmit() {
      let newCard = this.validateCreatedCard();
      if (!newCard) return;

      // check if a card is edited with pre-existing ID
      if (this.mode == Mode.EDIT) {
        let handleErr = (err) => {
          this.notifyFail("Update Card failed", err);
          console.error(err);
        };

        saveCardContent(this.model.id, newCard, this.resetCard, handleErr);
        if (!this.designateArtist)
          addArtwork(
            this.model.id,
            newCard.image,
            newCard.fullArt,
            this.successScreen,
            handleErr,
          );
      } else if (!this.address) {
        this.notifyFail(
          "Unable publish Card",
          "You must be logged in with an activated account!",
        );
      } else {
        queryQUser(this.address)
          .then((res: User) => {
            if (R.isEmpty(res.ownedCardSchemes)) {
              this.notifyFail(
                "YOU MUST CONSTRUCT ADDITIONAL PYLONS",
                "You don't own any Card Frames. Please buy one before publishing.",
              );
              throw new Error(
                "account " + this.address + " does not own Card Frames",
              );
            } else {
              let id = +res.ownedCardSchemes[0];
              let handleErr = (err) => {
                this.notifyFail("Publish Card failed", err);
                console.error(err);
              };

              saveCardContent(id, newCard, this.successScreen, handleErr);
              if (!this.designateArtist)
                addArtwork(
                  id,
                  newCard.image,
                  newCard.fullArt,
                  this.successScreen,
                  handleErr,
                );
            }
          })
          .catch((err) => {
            console.error(err);
            this.notifyFail("Publish Card failed", err);
          });
      }
    },
    successScreen() {
      this.activeStep = 1;
      this.successScreenVisible = true;
    },
    resetCard() {
      this.model = new Card();
      this.artistMode = false;
      this.cropImage = "";
    },
    onDrop(event) {
      // in case the user has selected to designate an artist, we want to reset this
      this.designateArtist = false;

      // dragging stops (whitening should vanish then)
      this.dragActive = false;

      let file = event.dataTransfer.files[0];

      uploadImg(file, env.cardImgMaxKB, (result) => {
        if (result.startsWith("Error")) {
          this.notifyFail("Failed to Upload", result);
          return;
        }
        this.cropImage = result;
      });
    },
    onPaste(event) {
      // in case the user has selected to designate an artist, we want to reset this
      this.designateArtist = false;

      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const imageFile = items[i].getAsFile();
          uploadImg(imageFile, env.cardImgMaxKB, (result) => {
            if (result.startsWith("Error")) {
              this.notifyFail("Failed to Upload", result);
              return;
            }
            this.cropImage = result;
          });
          break;
        }
      }
    },
    inputFile(event) {
      // in case the user has selected to designate an artist, we want to reset this
      this.designateArtist = false;

      let file = event.target.files[0];

      uploadImg(file, env.cardImgMaxKB, (result) => {
        if (result.startsWith("Error")) {
          this.notifyFail("Failed to Upload", result);
          return;
        }
        this.cropImage = result;
      });
    },
    classStepPassed(n) {
      let exportClass = "progress-item";

      if (this.activeStep > n) {
        if (
          n === 0 &&
          this.model.CardName &&
          this.model.CardName !== "Name" &&
          this.model.image
        )
          exportClass += " progress-item-finished";
        else if (
          n === 1 &&
          this.model.Tags[0] &&
          this.model.type &&
          this.model.type !== "no type"
        )
          exportClass += " progress-item-finished";
        else if (n === 2) {
          if (
            this.model.type !== "Headquarter" &&
            (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0)
          )
            return exportClass;
          if (this.model.type !== "Action" && R.isNil(this.model.Health))
            return exportClass;
          if (this.model.type === "Entity" && R.isNil(this.model.Attack))
            return exportClass;

          exportClass += " progress-item-finished";
        } else if (n === 3) {
          exportClass += " progress-item-finished";
        }
      } else if (this.activeStep === n) {
        exportClass += " progress-item-current";
      }
      return exportClass;
    },
  },
};
</script>
