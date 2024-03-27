<template>
  <transition name="modal-fade">
    <div class="">
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="px-6 bg-zinc-300 bg-opacity-20 shadow-inner border border-white border-4 border-opacity-50"
        role="dialog"
      >
        <header
          id="modalTitle"
          class="p-4"
        >
          <slot name="header">
            {{ dialog.title }}
            <span
              aria-label="Close modal"
              class="ml-[32.8rem] px-2 hover:cursor-pointer bg-opacity-20 shadow-inner border border-white border-2 border-opacity-80"
              type="button"
              @click="close"
            >
              x
            </span>
          </slot>
        </header>
        <section
          id="modalDescription"
          class="flex flex-wrap flex-row justify-start"
        >
          <slot name="body">
            <!-- {{ dialog.description }} -->
            <div
              v-for="(option, index) in filterClasses(dialog.options)"
              :key="index"
              class="w-1/3 flex flex-col justify-center items-center rounded-sm text-black"
            >
              <div class="">
                <div class="p-2 m-2 bg-white bg-opacity-80">
                  <input
                    v-if="dialog.type === 'boolean'"
                    id="index"
                    v-model="option.value"
                    :value="option.name"
                    type="checkbox"
                  >
                  <button
                    v-if="dialog.type === 'enum'"
                    aria-label="Close modal"
                    class=""
                    type="button"
                    @click="
                      selected = option;
                      addAbility();
                    "
                  >
                    <img
                      class=""
                      :src="getIcon(option)"
                    >
                    {{ option.name }}
                    <span v-if="option.description">
                      {{ option.description }}
                    </span>
                  </button>

                  <!-- check if this is in use or deprecated -->
                  <input
                    v-if="dialog.type === 'stringEnter'"
                    v-model="selectedString"
                    aria-label="string select"
                    placeholder="enter text"
                    style="display: inline; color: black; height: 50px"
                  >

                  <!-- This is the standard case -->
                  <button
                    v-if="dialog.type === 'interface' || dialog.type === 'root'"
                    aria-label="Close modal"
                    class=""
                    type="button"
                    @click="
                      selected = option;
                      addAbility();
                    "
                  >
                    <div
                      class="flex flex-col items-center aspect-square justify-evenly"
                    >
                      <div class="w-9">
                        <img :src="getIcon(option)">
                      </div>
                      <div class="font-bold h-9 text-[20px] place-content-center">
                        {{ option.name }}
                      </div>
                      <div class="min-w-[11.5rem] leading-5 text-[16px] place-content-start">
                        {{ option.description }}
                      </div>
                    </div>
                  </button>

                  <label
                    v-if="
                      dialog.type !== 'interface' &&
                        dialog.type !== 'root' &&
                        dialog.type !== 'enum'
                    "
                    for="index"
                    class="text-s"
                  >
                    {{ option.name }}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <span v-if="dialog.type === 'int'"> {{ selectedCount }} </span>
            </div>
          </slot>
        </section>
        <footer class="">
          <button
            v-if="dialog.type !== 'interface' && dialog.type !== 'root'"
            aria-label="Close modal"
            class="text-s"
            type="button"
            @click="addAbility"
          >
            Add
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import * as R from "ramda";
import {
  atPath,
  createInteraction,
  filterSelection2,
  updateInteraction,
} from "../utils/utils.js";
import { useCardsRules } from "@/def-composables/useCardRules";

export default {
  name: "Modal",
  props: {
    picked: {
      type: Object,
      default() {
        return {};
      },
    },
    dialogProp: {
      type: Object,
      default() {
        return {};
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    abilityProp: {
      type: Object,
      default() {
        return {};
      },
    },
    abilitiesProp: {
      type: Array,
      default() {
        return [];
      },
    },
    cardmodel: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const { rules } = useCardsRules();

    return { cardRules: rules };
  },
  data() {
    return {
      abilitiesData: {},
      ability: {},
      dialog: {},
      selectedCount: 0,
      selectedString: "",
      selected: {},
    };
  },
  created() {
    this.dialog = this.dialogProp;
    this.ability = this.abilityProp;
    this.abilitiesData = this.abilitiesProp;
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },
    filterClasses(options) {
      if (!this.cardmodel.Class || !options) {
        return [];
      }
      let firstLetterToUpper = (string) => {
        return string[0].toUpperCase() + string.substring(1);
      };
      let cardHasClass = (x) => {
        return this.cardmodel.Class[firstLetterToUpper(R.toLower(x))];
      };
      let abilityIsValid = (x) => {
        if (!x.classes) {
          return true;
        } else {
          let ok = R.any((y) => cardHasClass(y), x.classes);
          return ok;
        }
      };
      let valids = R.filter((ability) => abilityIsValid(ability), options);

      return valids;
    },
    getIcon(option) {
      return (
        "/icon/abilities/" +
        R.toLower(R.split("-", option.name.replace(/ /g, ""))[0]) +
        ".svg"
      );
    },
    addAbility() {
      console.log("dialog type:", this.dialog.type);

      switch (this.dialog.type) {
        case "interface":
          this.handleInterface();
          break;
        case "root":
          this.handleCreateAbility();
          break;
        case "enum":
          this.handleStringInteraction();
          break;
        case "stringEnter":
          this.handleStringInteraction();
          break;
        case "boolean":
          this.handleBoolInteraction();
          break;
        default:
          console.error("this type is unkown: ", this.dialog.type);
          break;
      }
      if (!this.dialog.preventClose) {
        this.$emit("close");
      }
    },
    handleInterface() {
      let atRules = R.curry(atPath)(this.cardRules.Card);
      console.log("dialog in handle interface: ", this.dialog);

      let selection = filterSelection2(this.dialog.options, this.selected);
      let pathAtSelection = R.concat(this.dialog.rulesPath, [
        "children",
        selection.index,
      ]);
      let objAtSelection = atRules(pathAtSelection);
      console.log("objAtSelection", objAtSelection);

      // check if the 'no condition' option was selected
      if (selection.index === "noSelect") {
        this.dialog.preventClose = false;
        this.dialog.btn.label = "no condition";
        console.log("this.dialog", this.dialog);

        // check if a terminal option was selected
      } else if (objAtSelection.type === "terminal") {
        this.dialog.preventClose = false;
        this.dialog.btn.label = objAtSelection.interactionText;
        this.dialog.type = "interface";
        //this.attachToAbility(this.dialog.btn.abilityPath, objAtSelection.interactionText) // check if this is only deactivated temporarily or can be removed forever. is it because terminal is now dropdown selected?

        // check if an option was selected, which has an interaction text
      } else if (objAtSelection.interactionText) {
        // TODO here check if this is an interface (only interfaces have interaction text? yes?)
        this.dialog.preventClose = false;
        let interactionText = objAtSelection.interactionText;
        let abilityPath = R.append(selection.index, this.dialog.abilityPath);
        let rulesPath = pathAtSelection;
        let newInteraction = createInteraction(
          interactionText,
          abilityPath,
          R.append("children", rulesPath),
          this.cardRules.Card
        );

        console.log("this.ability", this.ability);
        updateInteraction(
          this.ability,
          this.ability.clickedBtn.id,
          newInteraction
        );
        this.attachToAbility(["interaction"], this.ability.interaction);

        let newEntry = {};
        newEntry[selection.index] = {};

        if (objAtSelection.singleUse) newEntry.singleUse = selection.index;

        this.attachToAbility(this.dialog.btn.abilityPath, newEntry, true);
      } else if (objAtSelection.type === "int") {
        // TODO This is deprecated (since modal does not open)
        this.dialog.preventClose = false;
        this.dialog.btn.type = "int";
        this.dialog.btn.rulesPath = pathAtSelection;
        this.dialog.btn.abilityPath = R.append(
          selection.index,
          this.dialog.abilityPath
        );
      } else if (objAtSelection.type === "enum") {
        this.dialog.preventClose = true;
        this.dialog.title = objAtSelection.name;
        this.dialog.type = objAtSelection.type;
        this.dialog.options = R.map((x) => ({ name: x }), objAtSelection.enum);
        this.dialog.btn.rulesPath = pathAtSelection;
        this.dialog.btn.abilityPath = R.append(
          selection.index,
          this.dialog.abilityPath
        );
      } else {
        // if there is no interaction text, don't close modal and present new options
        this.dialog.preventClose = true;
        this.dialog.interactionText = objAtSelection.interactionText;
        this.dialog.title = objAtSelection.name;
        this.dialog.description = objAtSelection.description;
        this.dialog.type = objAtSelection.type;
        this.dialog.options = objAtSelection.children;
        this.dialog.rulesPath = pathAtSelection;
        this.dialog.abilityPath = R.append(
          selection.index,
          this.dialog.abilityPath
        );
      }
      console.log("ability after handleInterface: ", this.ability);
    },
    handleStringInteraction() {
      this.dialog.preventClose = false;
      this.ability.clickedBtn.label = this.selectedString;
      this.attachToAbility(this.dialog.btn.abilityPath, this.selectedString);

      console.log("ability after handleString: ", this.ability);
    },
    handleBoolInteraction() {
      this.ability.clickedBtn.label = this.dialog.options[0].value
        ? R.dropLast(1, this.dialog.btn.label) + "!"
        : "-";
      this.attachToAbility(
        this.dialog.btn.abilityPath,
        this.dialog.options[0].value ? this.dialog.options[0].value : false
      );

      console.log("ability after handleBool: ", this.ability);
    },
    handleCreateAbility() {
      let atRules = R.curry(atPath)(this.cardRules.Card);

      let selection = filterSelection2(this.dialog.options, this.selected);
      let pathAtSelection = R.concat(this.dialog.rulesPath, [selection.index]);
      let objAtSelection = atRules(pathAtSelection);
      let interactionText = atPath(
        this.cardRules.Card,
        R.append(selection.index, this.dialog.rulesPath)
      ).interactionText;

      let abilityPath = [selection.index];
      let rulesPath = R.concat(this.dialog.rulesPath, [
        selection.index,
        "children",
      ]);

      if (!objAtSelection.interactionText) {
        let newAbility = {
          interaction: createInteraction(
            "§" + selection.index,
            [],
            this.dialog.rulesPath,
            this.cardRules.Card
          ),
        };
        newAbility.clickedBtn = newAbility.interaction[0].btn;
        newAbility[selection.index] = {
          path: this.dialog.rulesPath,
        };
        this.ability = newAbility;
        this.abilitiesData.push(newAbility);

        this.attachToAbility(["interaction"], newAbility.interaction);
        this.attachToAbility([selection.index, "path"], this.dialog.rulesPath);
        this.attachToAbility(["clickedBtn"], newAbility.interaction[0].btn);

        // if there is no interaction text, don't close modal and present new options
        this.dialog.preventClose = false;
        this.dialog.btn = { abilityPath: [] };
        this.dialog.interactionText = objAtSelection.interactionText;
        this.dialog.title = objAtSelection.name;
        this.dialog.description = objAtSelection.description;
        this.dialog.type = objAtSelection.type;
        this.dialog.options = objAtSelection.children;
        this.dialog.rulesPath = pathAtSelection;
        this.dialog.abilityPath = R.append(
          selection.index,
          this.dialog.abilityPath
        );

        return;
      }

      let newAbility = {
        interaction: createInteraction(
          interactionText,
          abilityPath,
          rulesPath,
          this.cardRules.Card
        ),
        keywords: [selection.index],
      };
      newAbility[selection.index] = {
        path: this.dialog.rulesPath,
      };

      this.abilitiesData.push(newAbility);
      console.log("pushed new ability:", newAbility);
    },
    attachToAbility(path, object, updateKeywords = false) {
      console.log(
        "attaching ",
        object,
        " to ",
        path,
        "with keywords: ",
        R.keys(object)
      );

      let ability = R.assocPath(path, object, this.ability);

      if (updateKeywords) {

        ability.keywords = ability.keywords
          ? R.concat(ability.keywords, R.keys(object))
          : R.keys(object);

      }

      this.$emit("update:ability", ability);
    },
  },
};
</script>
