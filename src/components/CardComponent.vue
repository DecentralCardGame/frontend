<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="700" v-bind:viewBox="viewBox" version="1">
    <defs>
      <clipPath id="d">
        <path d="M0 0h1920v2800H0z"/>
      </clipPath>
      <clipPath id="b">
        <path d="M0 0h1920v2800H0z"/>
      </clipPath>
      <clipPath id="c">
        <path d="M1433 2384h64v-36h-64z"/>
      </clipPath>
      <clipPath id="a">
        <path d="M1150 2115h349v214h-349z"/>
      </clipPath>
    </defs>
    <path v-if="displayNotes" d="M50 222l-6 63 17-5 22 5 19-3 44 9 18-3 11 3-7-76-118 4z" fill="#12d1d1"/>
    <path d="M38 20v201h135l6-201z" fill="#fff"/>
    <path d="M34 216h137V15H34z" fill="#12d1d1"/>
    <path d="M35 128h135v-24H35zM58 212h89v-12H58zM35 195h135v-11H35z" fill="none" stroke="#000"/>
    <path d="M139 177h19v-6h-19z" fill="none"/>
    <text y="119" x="47" style="-inkscape-font-specification:Museo-700" text-anchor="middle" font-weight="600" font-size="7" font-family="Museo 700" stroke-width="0">
      <tspan x="100" y="119">{{ model.name }} {{ model.article }} {{ model.surname }}</tspan>
    </text>
    <text y="208" x="80" style="-inkscape-font-specification:Museo-700" text-anchor="middle" font-weight="600" font-size="7" font-family="Museo 700" stroke-width="0">
      <tspan x="100" y="208">{{ model.type }}</tspan>
    </text>
    <path v-if="displayNotes" d="M45 220l-5 62 16-5 22 5 19-2 44 9 18-3 12 3-7-69-119-3z" fill="#fff"/>
    <text y="192" x="40" style="-inkscape-font-specification:Museo-700" text-anchor="middle" font-weight="600" font-size="7" font-family="Museo 700" stroke-width="0">
      <tspan x="105" y="192">{{ model.tags }}</tspan>
    </text>
    <text inline-size="180" v-if="activeStep > 1" y="139" x="87" transform="skewX(-17)" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="7" font-family="Museo 700" stroke-width="0">
      <tspan x="85" y="139">{{ model.ability + " " + model.description }}</tspan>
    </text>
    <text v-if="activeStep > 2"  y="176" x="141" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="4" font-family="Museo 700" stroke-width="0">
      <tspan x="141" y="176">periodic</tspan>
    </text>
    <path v-if="activeStep >= 1" d="M141 19l-4 7 8 1-7 8 11-8-6-3 2-5z" fill="#fff"/>
    <g v-if="activeStep >= 1"  clip-path="url(#b)" transform="matrix(.30788 0 0 -.30788 -305 755)">
      <g clip-path="url(#c)">
        <text transform="matrix(1 0 0 -1 1447 2356)" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="28" font-family="Museo 700" fill="#d61224">
          <tspan x="0" y="0">{{ model.cost.energy }}</tspan>
        </text>
      </g>
    </g>
    <path v-if="activeStep >= 1"  d="M82 20l-8 5 1 5 8 3 3-2 2-4-2-3h-7l-2 3 3 2 3 1 1-2-1-2-2 1 1 1M90 30l1-4 14 1 1-5h-7v8zM116 25l-7 2 1 3 3 3h8l-3-6 2-3h2l2-2-3-1h-2l-2-1-2 1 2 2zM128 32l-2-2 3-8 2-2 1 3 4 7-3 3-3-1z" fill="none" stroke="#fff" stroke-width="1.5393999999999999"/>
    <g v-if="activeStep >= 1" clip-path="url(#d)" transform="matrix(.30788 0 0 -.30788 -305 755)">
      <path d="M1488 2367l12-3v-12l-10-2-8 5-1 10 6 16 23 4 1-15h-15l4 18s15 1 18-3 1-31 1-31l-32 7z" fill="none" stroke="#fff" stroke-width="5"/>
    </g>
    <text v-if="activeStep >= 1" y="31" x="80" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="9" font-family="Museo 700" fill="#f29121" stroke-width="0">
      <tspan x="80" y="31">{{ model.cost.lumber }}</tspan>
    </text>
    <text v-if="activeStep >= 1"  y="30" x="97" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="9" font-family="Museo 700" fill="#001433" stroke-width="0">
      <tspan x="97" y="30">{{ model.cost.food }}</tspan>
    </text>
    <text v-if="activeStep >= 1"  y="30" x="128" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="9" font-family="Museo 700" stroke-width="0">
      <tspan x="128" y="30">{{ model.cost.mana }}</tspan>
    </text>
    <text v-if="activeStep >= 1"  y="31" x="113" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="9" font-family="Museo 700" stroke-width="0">
      <tspan x="113" y="31">{{ model.cost.iron }}</tspan>
    </text>
    <text v-if="activeStep >= 1" t y="28" x="156" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="9" font-family="Museo 700" stroke-width="0">
      <tspan x="156" y="28">{{ model.cost.generic }}</tspan>
    </text>
    <path v-if="activeStep >= 1" d="M46 8L25 19l10 17h14l13-10 3-15z" fill="#d61224"/>
    <path v-if="activeStep >= 1" d="M44 6L23 18l11 16h13l13-10 3-14z" fill="#fff"/>
    <path v-if="activeStep >= 1" d="M44 6L23 18l11 16h13l13-10 3-14z" fill="none" stroke="#fff" stroke-width=".61576"/>
    <text v-if="activeStep >= 1"  y="28" x="38" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="23" font-family="Museo 700" fill="#d61224" stroke-width="0">
      <tspan x="38" y="28">{{ model.ticks }}</tspan>
    </text>
    <path v-if="activeStep >= 1" d="M41 104l-1-10 7-3 2 3 4-3 2 3 4-3 3 3 2 12-6 3-3-3 3-4-3 1-1 3h-3l-1-2h-2v2l-3 1-2-2z" fill="#d61224"/>
    <path v-if="activeStep >= 1" d="M39 102v-9l6-3 2 3 5-3 1 3 4-4 3 4 3 12-7 2-3-2 3-4h-3l-1 3-3 1-1-3h-2v3l-2 1-3-2z" fill="#fff"/>
    <path v-if="activeStep >= 1" d="M39 102v-9l6-3 2 3 5-3 1 3 4-4 3 4 3 12-7 2-3-2 3-4h-3l-1 3-3 1-1-3h-2v3l-2 1-3-2z" fill="none" stroke="#fff" stroke-width=".30788"/>
    <text v-if="activeStep >= 1" y="100" x="46" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="10" font-family="Museo 700" fill="#d61224" stroke-width="0">
      <tspan x="46" y="100">{{ model.attack }}</tspan>
    </text>
    <path v-if="activeStep >= 1" d="M150 93l-3-3-4 2-2 4 7 10 4 4 14-11v-8l-5-2-4 2-4 3v2z" fill="#d61224"/>
    <path v-if="activeStep >= 1" d="M148 91l-3-3-4 1-3 5 8 10 4 4 14-11v-8l-5-2-4 2-4 3-1 1z" fill="#fff"/>
    <text v-if="activeStep >= 1" y="98" x="152" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="9" font-family="Museo 700" fill="#d61224" stroke-width="0">
      <tspan x="152" y="98">{{ model.defense }}</tspan>
    </text>
    <text v-if="activeStep >= 2 && displayNotes" y="233" x="124" transform="skewX(-17)" style="-inkscape-font-specification:Museo-700" font-weight="600" font-size="7" font-family="Museo 700" stroke-width="0">
      <tspan x="124" y="233">{{ model.notes }}</tspan>
    </text>
    <image v-bind:xlink:href="imageURL" width="100" height="200" class="cardImage"/>
  </svg>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardComponent',
  props: {
    model: Object,
    imageURL: {
      type: String,
      default: null
    },
    activeStep: {
      type: Number,
      default: 3
    },
    displayNotes: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cardID: 0
    }
  },
  mounted: () => {
  },
  computed: {
    viewBox () {
      if (!this.displayNotes) {
        return '0 0 210 240'
      } else {
        return '0 0 210 297'
      }
    }
  },
  methods: {
    vote (voteType) {
      axios.put(
        this.apiURL + '/cardservice/vote_card',
        {
          'base_req': {
            'from': 'globally fetched users key',
            'chain_id': this.chainID,
            'sequence': '18',
            'account_number': '0',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'voter': 'globally fetched users key',
          'votetype': voteType,
          'cardid': this.cardID
        }).then(response => (this.cards = response.data))
    },
    transfer (reciever) {
      axios.post(
        this.apiURL + '/cardservice/transfer_card',
        {
          'base_req': {
            'from': 'globally fetched users key',
            'chain_id': this.chainID,
            'sequence': '2',
            'account_number': '0',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'sender': 'globally fetched users key',
          'receiver': reciever,
          'cardid': this.cardID
        }).then(response => (this.cards = response.data))
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
