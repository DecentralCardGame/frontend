<template id="theCardSvg">
  <svg
    width="100%"
    height="100%"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="fill-rule:evenodd;clip-rule:evenodd;"
  >
    <!-- Keyword explanation -->
      <g
        transform="translate(0,0)"
      >
        <!-- grey box -->
        <g
          :opacity="0.9"
          transform="matrix(0.986969,0,0,1,1.66464,-120.992511)"
        >
          <g id="Ebene4">
            <path
              d="M4.33,138.7L4.33,231.81C4.33,234.004 6.136,235.81 8.33,235.81L144.33,235.81C146.524,235.81 148.33,234.004 148.33,231.81L148.33,138.7"
              style="fill:white;fill-rule:nonzero;stroke:white;stroke-width:1px;"
            />
          </g>
        </g>
        <text
          v-for="(text, index) in textToSvg(keywordDescriptions)"
          id="text2410-9"
          :key="'keywordText'+index"
          fill="#000"
          letter-spacing="0"
          style="line-height:1.25;-inkscape-font-specification:'Roboto, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start"
          text-anchor="start"
          transform="scale(.94735 1.05557)"
          word-spacing="0"
          writing-mode="lr"
          xml:space="preserve"
        >
          <tspan
            id="tspan2430"
            x="15"
            :y="30 + index*fontSpacing(keywordDescriptions)"
            fill-opacity="1"
            stroke-width=".1"
            font-family="Roboto"
            :font-size="fontSize(keywordDescriptions)"
            font-stretch="normal"
            font-style="normal"
            font-variant="normal"
            font-weight="300"
            style="-inkscape-font-specification:'Roboto, Normal';text-align:start;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal"
            text-anchor="start"
            writing-mode="lr"
          > {{ text }} </tspan>
        </text>
      </g>
      <!-- experimental for new cardframe -->
      <!--image x="-50" y="-20" width="250" height="250" href="../../assets/Cardback.svg" /-->
  </svg>
</template>

<script>
import * as R from 'ramda'
import * as svg1 from 'save-svg-as-png'
import { icon } from '@/components/utils/utils.js'

export default {
  name: 'CardComponent',
  props: {
    model: Object,
    displayNotes: {
      type: Boolean,
      default: false
    },
    hoverBehavior: String
  },
  data () {
    return {
      opaque: 1,
      clicked: false,
      keywordDescriptions: ""
    }
  },
  computed: {
    viewBox () {
      if (this.displayNotes) {
        return '0 0 154 240'
      } else {
        return '0 0 210 240'
      }
    }
  },
  created () {
    let firstLetterToLower = string => {
      return string[0].toLowerCase() + string.substring(1)
    }
    this.model.Keywords.forEach(ability => {
      ability.forEach(keyword => {
        this.keywordDescriptions = R.concat(this.keywordDescriptions, 
          keyword + " - " + this.$rulesDefinitions[firstLetterToLower(keyword)].description + " \\n "
        )
      })
    })
  },
  methods: {
    cardmouseleave() {
      if (this.hoverBehavior === 'none') return 

      this.opaque = 1;
      this.displayNotes = 1;
      this.clicked = false;
    },
    cardmouseclick() {
      if (this.hoverBehavior === 'none') return 

      if (this.isMobileDevice()) {
        this.opaque = this.clicked? 1 : 0
        this.displayNotes = this.clicked? 1 : 0
        this.clicked = !this.clicked
      }
      else {
        this.opaque = 1;
        this.displayNotes = 1;
        if (this.clicked) {
          //this.saveSingleCard()
        }
        this.clicked = true
      }
    },
    cardmouseenter() {
      if (this.hoverBehavior === 'none') return 

      this.opaque = 0;
      this.displayNotes = 0;
    },
    getType () {
      if (R.toLower(this.model.type) === 'no type' || !this.model.type) {
        return ''
      } else {
        let type = this.model.type === 'Headquarter' ? 'HQ' : this.model.type
        if (type) {
          return type.toUpperCase()
        } else {
          console.error('Invalid card type. Must be one of the following: ' + R.values(R.pluck('name', this.$cardRules.children)) + '. Instead is: ' + type )
        }
      }
    },
    getNerfedCost () {
      if (this.model.type === 'Headquarter') {  
        return this.model.Delay ? this.model.Delay : '?'
      }
      if (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0) {
        return '-'
      }
      let cost = Math.max(0, this.model.CastingCost + (this.model.nerflevel ? this.model.nerflevel : 0))
      return cost
    },
    tagLength () {
      if (this.model.Tags) {
        return R.length(R.filter(x => x, this.model.Tags))
      } else {
        return 0
      }
    },
    getTags () {
      return this.model.Tags.join(' - ').toUpperCase() || ''
    },
    abilitiesLength () {
      if (this.model.abilities) {
        if (R.isEmpty(this.model.abilities)) {
          return 0
        }
        return R.length(this.model.abilities)
      } else if (this.model.effects) {
        if (R.isEmpty(this.model.effects)) {
          return 0
        }
        return R.length(this.model.effects)
      } else {
        return 0
      }
    },
    getAbilityYPos(abilityIndex, extraLines) {
      let keywords = this.getKeywords()

      let summedLength = 0
      for (let i = 0; i < abilityIndex; i++) {
        summedLength += keywords[i].length > 1 ? keywords[i].length - 1 : keywords[i].length
      }

      return 145 + 13*summedLength + 8*abilityIndex + 10*extraLines
    },
    getAbilityText () {
      let additionalCostText = []

      if (this.model.AdditionalCost) {
        if (this.model.AdditionalCost.SacrificeCost) {
          additionalCostText.push("Extra Cost - Sacrifice " + this.model.AdditionalCost.SacrificeCost.Amount + " Entity.")
        }
        else if (this.model.AdditionalCost.DiscardCost) {
          additionalCostText.push("Extra Cost - Discard " + this.model.AdditionalCost.DiscardCost.Amount + " Card.")
        }
        else if (this.model.AdditionalCost.VoidCost) {
          additionalCostText.push("Extra Cost - Void " + this.model.AdditionalCost.VoidCost.Amount + " Card.")
        }
      }
      return R.concat(additionalCostText, this.model.RulesTexts)
    },
    textToSvg (text) {
      if (!text) return text

      let maxLength = 57
      if (text.length < 100)
        maxLength = 35
      else if (text.length < 200)
        maxLength = 39

      let lines = ['']
      let words = text.split(' ')

      words.forEach(function (word) {
        if (R.last(lines).length + word.length > maxLength) {
          // line full, create new line
          lines.push(word + ' ')
        } else {
          if (word === '\\n') {
            // newline operator, create new line
            lines.push(' ')
          } else {
            // concat to existing line
            lines[lines.length - 1] = R.concat(lines[lines.length - 1], word + ' ')
          }
        }
      })
      return lines
    },
    getKeywords() {
      let additionalCostPseudoKeyword = [[]]

      if (this.model.AdditionalCost) {
        if (this.model.AdditionalCost.SacrificeCost) {
          additionalCostPseudoKeyword[0].push("Tribute")
        }
        else if (this.model.AdditionalCost.DiscardCost) {
          additionalCostPseudoKeyword[0].push("DiscardPay")
        }
        else if (this.model.AdditionalCost.VoidCost) {
          additionalCostPseudoKeyword[0].push("Dissolve")
        }
      }

      return additionalCostPseudoKeyword[0].length > 0 ? 
        R.concat(additionalCostPseudoKeyword, this.model.Keywords) : 
        this.model.Keywords
    },
    getIcon(name) {
      return icon(R.toLower(R.split('-', name)[0]))
    },
    fontSize (rawText) {
      let text = R.type(rawText) === "String" ? rawText : R.join(" ", rawText)
      if (text.length < 100)
        return 8.1
      else if (text.length < 200)
        return 7.1
      else
        return 6.1
    },
    fontSpacing (rawText) {
      let text = R.type(rawText) === "String" ? rawText : R.join(" ", rawText)
      if (text.length < 100)
        return 12
      else if (text.length < 200)
        return 10
      else
        return 8
    },
    saveSingleCard () {
      let clickedCard = document.getElementById('theCardSvg')
      svg1.saveSvgAsPng(clickedCard, this.model.CardName + '.png', {scale: 5})
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}

.cls-1{fill:#ffdfa1;stroke:#d99941}
.cls-ironsymbol{fill:#777c85;stroke:#3e4045}
.cls-Naturesymbol{fill:#d9864e;stroke:#8c4e24}
.cls-manasymbol{fill:#8000ff;stroke:#a496ff}
.cls-manasymbol2{fill:#a496ff;stroke:none}
.cls-foodsymbol{fill:#fae3d7;stroke:#e05d16}
.cls-foodsymbol2{fill:#e05d16;stroke:#e05d16}
.cls-energysymbol{fill:#ffe100;stroke:#ff5e00}
.cls-energysymbol2{fill:#ffe100;stroke:#ff5e00}
.cls-10,.cls-4{fill:none}
.cls-3{fill:#001433}
.cls-banderole-back{fill:#D99941}
.cls-4{stroke:#d99941}
.cls-5{fill:#d99941}
.cls-6{fill:#a37331}
.cls-7{fill:#f2f2f2}
.cls-10{stroke:#001433}
.cost{stroke:#d99941;fill:none}
.cost-fill {fill:#d99941}

</style>
