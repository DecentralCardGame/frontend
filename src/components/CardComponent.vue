<template>
<svg @mouseenter="opaque = 0" @mouseleave="opaque = 1" @click="opaque = 1" width="100%" height="100%" viewBox="0 0 154 240" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    <g id="Ebene_2">
      <!-- card image -->
      <mask id="imgMask">
        <rect opacity=1 id="rect1315" width="154" height="240" x="0" y="0" fill="white" fill-opacity="1" class="cls-2" rx="8"/>
      </mask>
      <image preserveAspectRatio="xMinYMin slice" align="xMidYMid" v-bind:href="imageURL" x="0" y="0" width="154" height="240" rx="8" class="cardImage" mask="url(#imgMask)"/>
    </g>
    <g :opacity=opaque*0.8 id="rect1329" transform="matrix(1.01119,0,0,1,-0.104029,0)">
          <!-- text box -->
          <path d="M143.3,227.2C143.3,229.408 141.508,231.2 139.3,231.2L13.3,231.2C11.092,231.2 9.3,229.408 9.3,227.2L9.3,135.2L143.3,135.2L143.3,227.2Z" style="fill:rgb(255,254,252);"/>
    </g>
    <g id="Ebene1" :opacity=opaque >
        <g id="_-Abgerundetes-Rechteck-1" serif:id="(Abgerundetes Rechteck)" transform="matrix(1,0,0,0.967974,1.38778e-17,0)">
          <!-- ressource top box -->
          <path d="M146,0C150.415,0 154,3.585 154,8L154,18.725L0,18.725L0,8C0,3.585 3.585,0 8,0L146,0Z" style="fill:white;"/>
        </g>
        <g id="polygon1331" transform="matrix(1.01119,0,0,1,-0.104029,0)">
          <!-- title-text-box divider -->
          <path d="M143.3,124.6L143.3,138.6L9.3,138.6L9.3,124.6L143.3,124.6Z" style="fill:rgb(96,96,106);fill-rule:nonzero;"/>
        </g>
        <g id="polygon1333" transform="matrix(0.954207,0,0,1,4.2442,-1.37528e-13)">
          <!-- title-box -->
          <path d="M147.3,122.6L147.3,136.6L5.3,136.6L5.3,122.6L147.3,122.6Z" style="fill:rgb(204,204,204);fill-rule:nonzero;"/>
        </g>
        <g id="polygon13311" serif:id="polygon1331" transform="matrix(0.208955,0,0,1,7.35672,-114.325)">
            <!-- speed-box-divider -->
            <path d="M143.3,124.6L143.3,138.6L9.3,138.6L9.3,124.6L143.3,124.6Z" style="fill:rgb(96,96,106);fill-rule:nonzero;"/>
        </g>
        <g id="polygon13331" serif:id="polygon1333" transform="matrix(0.197183,0,0,1.59111,8.25509,-195.07)">
            <!-- speed-box -->
            <path d="M147.3,122.6L147.3,136.6L5.3,136.6L5.3,122.6L147.3,122.6Z" style="fill:rgb(204,204,204);fill-rule:nonzero;"/>
        </g>
        <g id="rect1343" transform="matrix(1.01119,0,0,1,-0.104029,0)">
            <!-- tag-box -->
            <rect x="9.3" y="233.1" width="134" height="5.3" style="fill:rgb(96,96,106);fill-rule:nonzero;"/>
        </g>
        <!-- attack-type-line -->
        <path id="line1347" d="M56,226L28,226" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
        <g id="line1349" transform="matrix(1,0,0,1,3,0)">
            <!-- type-health-line -->
            <path d="M123,226L95,226" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
        </g>
        <!-- energy symbol -->
        <g v-show="model.cost.energy" transform="matrix(1,0,0,1,46,3.7)">
            <circle id="circle833" cx="5.5" cy="5.5" r="5" style="fill:rgb(255,204,0);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <g id="g839">
                <path id="polyline837" d="M8.4,1.4L6.6,4.1L8.6,4.1L3.7,10.2L4.8,6L2.4,5.9L4.9,0.8" style="fill:rgb(255,204,0);fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            </g>
            <circle id="circle8331" serif:id="circle833" cx="5.5" cy="5.5" r="5" style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
        </g>
        <!-- food symbol -->
        <g v-show="model.cost.food" id="Ebene_1-2-5" transform="matrix(1,0,0,1,95.8,3.5)">
            <circle id="circle867" cx="5.5" cy="6" r="5" style="fill:rgb(255,153,204);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <g id="Ebene_21" serif:id="Ebene_2" transform="matrix(1,0,0,1,0,-0.04)">
                <g id="Ebene_1-2">
                    <circle cx="5.5" cy="6.04" r="5" style="fill:rgb(255,153,204);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-miterlimit:2;"/>
                    <path d="M11.66,1.5L10.16,1.5L10.16,0" style="fill:none;fill-rule:nonzero;"/>
                    <path d="M7.3,4.35L10.37,1.28" style="fill:none;fill-rule:nonzero;"/>
                    <rect x="7.55" y="7.32" width="1" height="1" style="fill:rgb(96,96,106);"/>
                    <rect x="5.96" y="8.59" width="1" height="1" style="fill:rgb(96,96,106);"/>
                </g>
            </g>
            <path id="polyline869" d="M11.7,1.5L10.2,1.5L10.2,0" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="line871" d="M7.3,4.3L10.4,1.3" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
        </g>
        <!-- generic symbol -->
        <g v-show="model.cost.generic" id="Ebene_1-2-62" transform="matrix(1,0,0,1,130.1,3.7)">
            <circle id="circle899" cx="5.5" cy="5.5" r="5" style="fill:rgb(153,204,102);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="polyline901" d="M7.9,4.1L5.5,5.5L3.1,4.1" style="fill:rgb(153,204,102);fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="polyline903" d="M7.7,7.7L5.5,5.5L3.3,7.7" style="fill:rgb(153,204,102);fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="line905" d="M5.5,2.6L5.5,5.5" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
        </g>
        <!-- iron symbol -->
        <g v-show="model.cost.iron" id="Ebene_1-2-1" transform="matrix(1,0,0,1,62.7,4.4)">
          <path id="polygon928" d="M8.1,0.5L3.1,0.5L0.6,4.8L3.1,9.2L8.1,9.2L10.6,4.8L8.1,0.5Z" style="fill:rgb(153,204,255);fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;"/>
          <circle id="circle930" cx="5.6" cy="4.8" r="2" style="fill:rgb(153,204,255);stroke:rgb(96,96,106);stroke-width:1px;"/>
        </g>
        <!-- lumber symbol -->
        <g v-show="model.cost.lumber" id="Ebene_1-2-7" transform="matrix(1,0,0,1,79.7,3.7)">
            <circle id="circle951" cx="5.5" cy="5.5" r="5" style="fill:rgb(255,153,0);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="line955" d="M6.205,6.634L9.488,2.598" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:0.51px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <rect id="rect4127" x="2.572" y="6.218" width="3.993" height="2.487" style="fill:rgb(96,96,106);"/>
            <path id="line955-3" d="M2.787,6.379L7.226,0.978" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:0.51px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="line955-5" d="M6.384,8.551L10.088,3.896" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:0.51px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
            <path id="line955-2" d="M5.872,4.327L8.039,1.693" style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:0.33px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
        </g>
        <!-- mana symbol -->
        <g v-show="model.cost.mana" id="_-Eingebettetes-Dokument-" serif:id="(Eingebettetes Dokument)" transform="matrix(1,0,0,1,118.8,9.2)">
            <g transform="matrix(1,0,0,1,-5.5,-5.5)">
                <clipPath id="_clip1">
                    <rect x="0" y="0" width="11" height="11"/>
                </clipPath>
                <g clip-path="url(#_clip1)">
                    <g id="Ebene_22" serif:id="Ebene_2">
                        <g id="Ebene_1-21" serif:id="Ebene_1-2">
                            <circle cx="5.5" cy="5.5" r="5" style="fill:rgb(153,102,255);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;"/>
                            <path d="M6,10.5L5,10.5C4.995,8.033 2.967,6.005 0.5,6L0.5,5C2.967,4.995 4.995,2.967 5,0.5L6,0.5C6.005,2.967 8.033,4.995 10.5,5L10.5,6C8.033,6.005 6.005,8.033 6,10.5ZM2.79,5.5C3.989,6.049 4.951,7.011 5.5,8.21C6.049,7.011 7.011,6.049 8.21,5.5C7.011,4.951 6.049,3.989 5.5,2.79C4.951,3.989 3.989,4.951 2.79,5.5Z" style="fill:rgb(96,96,106);fill-rule:nonzero;"/>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
    <g :opacity=opaque >
      <!-- Ressource cost -->
      <!-- Energy cost text -->
      <g v-show="model.cost.energy && !(model.type==='Headquarter')" id="g2312">
        <g id="g2278" fill-opacity="1" stroke="none" font-stretch="normal" font-style="normal" font-variant="normal" letter-spacing="0" transform="translate(-2)" word-spacing="0" writing-mode="lr-tb">
          <g id="g2603" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-weight="700" text-anchor="end" transform="translate(0 -.7)">
            <text id="text2236-1-6" x="50.7" y="13.9" fill="black" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" xml:space="preserve">
            <tspan id="tspan2234-9-8" x="50.7" y="13.9" fill="black" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.energy }}</tspan>
          </text>
            <text id="text2236-1" x="50.1" y="13.3" fill="#0cf" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" xml:space="preserve">
            <tspan id="tspan2234-9" x="50.1" y="13.3" fill="#0cf" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.energy }}</tspan>
          </text>
          </g>
        </g>
      </g>
      <!-- Iron cost text -->
      <g v-show="model.cost.iron && !(model.type==='Headquarter')" id="g2312-6" transform="translate(25.7 -.6)">
        <g id="g2278-4" fill-opacity="1" stroke="none" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" letter-spacing="0" text-anchor="start" transform="translate(-2)" word-spacing="0" writing-mode="lr-tb">
          <text id="text2236-1-6-2" x="42.7" y="13.9" fill="black" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-8-2" x="42.7" y="13.9" fill="black" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.iron }}</tspan>
        </text>
          <text id="text2236-1-7" x="42.1" y="13.3" fill="#0cf" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-6" x="42.1" y="13.3" fill="#0cf" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.iron }}</tspan>
        </text>
        </g>
      </g>
      <!-- Lumber cost text -->
      <g v-show="model.cost.lumber && !(model.type==='Headquarter')" id="g2312-1" transform="translate(42.9 -.8)">
        <g id="g2278-8" fill-opacity="1" stroke="none" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" letter-spacing="0" text-anchor="start" transform="translate(-2)" word-spacing="0" writing-mode="lr-tb">
          <text id="text2236-1-6-5" x="42.7" y="13.9" fill="black" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-8-1" x="42.7" y="13.9" fill="black" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.lumber }}</tspan>
        </text>
          <text id="text2236-1-1" x="42.1" y="13.3" fill="#0cf" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-3" x="42.1" y="13.3" fill="#0cf" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.lumber }}</tspan>
        </text>
        </g>
      </g>
      <!-- Food cost text -->
      <g v-show="model.cost.food && !(model.type==='Headquarter')" id="g2312-0" transform="translate(58.8 -.7)">
        <g id="g2278-6" fill-opacity="1" stroke="none" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" letter-spacing="0" text-anchor="start" transform="translate(-2)" word-spacing="0" writing-mode="lr-tb">
          <text id="text2236-1-6-4" x="42.7" y="13.9" fill="black" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-8-4" x="42.7" y="13.9" fill="black" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.food }}</tspan>
        </text>
          <text id="text2236-1-75" x="42.1" y="13.3" fill="#0cf" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-38" x="42.1" y="13.3" fill="#0cf" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.food }}</tspan>
        </text>
        </g>
      </g>
      <!-- Mana cost text -->
      <g v-show="model.cost.mana && !(model.type==='Headquarter')" id="g2312-2" transform="translate(77.1 -.8)">
        <g id="g2278-7" fill-opacity="1" stroke="none" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" letter-spacing="0" text-anchor="start" transform="translate(-2)" word-spacing="0" writing-mode="lr-tb">
          <text id="text2236-1-6-3" x="42.7" y="13.9" fill="black" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-8-5" x="42.7" y="13.9" fill="black" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.mana }}</tspan>
        </text>
          <text id="text2236-1-3" x="42.1" y="13.3" fill="#0cf" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-7" x="42.1" y="13.3" fill="#0cf" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.mana }}</tspan>
        </text>
        </g>
      </g>
      <!-- Generic cost text -->
      <g v-show="model.cost.generic && !(model.type==='Headquarter')" id="g2312-4" transform="translate(93 -.7)">
        <g id="g2278-80" fill-opacity="1" stroke="none" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" letter-spacing="0" text-anchor="start" transform="translate(-2)" word-spacing="0" writing-mode="lr-tb">
          <text id="text2236-1-6-0" x="42.7" y="13.9" fill="black" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-8-16" x="42.7" y="13.9" fill="black" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.generic }}</tspan>
        </text>
          <text id="text2236-1-4" x="42.1" y="13.3" fill="#0cf" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve">
          <tspan id="tspan2234-9-5" x="42.1" y="13.3" fill="#0cf" stroke-width=".3" font-family="Montserrat" font-size="12.3" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.cost.generic }}</tspan>
        </text>
        </g>
      </g>
      <!-- Ability icon 1 -->
      <g v-for="(ability, index) in model.abilities" v-bind:key="'icon'+index" id="Ebene_2-36" data-name="Ebene 2" :transform="'translate(17.4 ' + (146.1+index*20) + ')'">
        <g id="Ebene_1-2-0" data-name="Ebene 1">
          <rect id="rect1000" width="10" height="10" x=".5" y=".5" fill="none" stroke="#d99941" class="cls-1" rx="5"/>
          <path id="line1002" fill="none" stroke="#d99941" d="M.7 5.8h9.8" class="cls-1"/>
          <path id="line1004" fill="none" stroke="#d99941" d="M2.4 3.9v1.8" class="cls-1"/>
          <path id="line1006" fill="none" stroke="#d99941" d="M8.3 3.9v1.8" class="cls-1"/>
          <path id="line1008" fill="none" stroke="#d99941" d="M5.5 3.9v1.8" class="cls-1"/>
        </g>
      </g>
      <!-- Ability icon 2
      <g v-show="model.abilities[1]" id="Ebene_2-6" data-name="Ebene 2" transform="translate(17.3 146.1)">
        <g id="Ebene_1-2-2" data-name="Ebene 1">
          <rect id="rect1032" width="10" height="10" x=".5" y=".5" fill="none" stroke="#d99941" class="cls-1" rx="5"/>
          <path id="line1034" fill="none" stroke="#d99941" d="M5.5 6.5v-6" class="cls-1"/>
          <path id="line1036" fill="none" stroke="#d99941" d="M5.5 8.5v-1" class="cls-1"/>
          <path id="line1038" fill="none" stroke="#d99941" d="M2.3 4.4l1.4 1.7" class="cls-1"/>
          <path id="line1040" fill="none" stroke="#d99941" d="M8.7 4.4L7.3 6.1" class="cls-1"/>
        </g>
      </g>
      -->
      <!-- Title of the card -->
        <text id="text2410" x="81.2" y="127.4" fill="#000" fill-opacity="1" stroke="none" stroke-width=".3" font-family="Solway" font-size="10.7" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:'Solway, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" transform="scale(.94735 1.05557)" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
        <tspan id="tspan2408" x="81.2" y="127.4" stroke-width=".3" font-family="Solway" font-size="10.7" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="700" style="-inkscape-font-specification:'Solway, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center" text-anchor="middle" writing-mode="lr-tb">{{ model.name }}</tspan>
      </text>
      <!-- Speed -->
        <text id="text2236" x="23" y="19.1" font-family="Montserrat" font-size="19.5"  stroke="black" stroke-width="0.8" font-style="normal" letter-spacing="0" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
        <tspan id="tspan2234" x="23" y="19.1" font-family="Montserrat" font-size="19.5" font-style="normal" text-anchor="middle" writing-mode="lr-tb">{{ getNerfedSpeed() }}</tspan>
      </text>
      <!-- Tags -->
        <text v-for="(tag, index) in model.tag" v-bind:key="'tag'+index" id="text2527" :x="75 + index*46 - (tagLength() - 1)*23" y="237.4" fill="#FFDAA6" stroke-width=".1" font-family="Montserrat" font-size="4.6"  letter-spacing="1" text-anchor="start" xml:space="preserve">
        <tspan id="tspan2525" :x="75 + index*46 - (tagLength() - 1)*23" y="237.4" fill="#FFDAA6" fill-opacity="1" stroke-width=".1" font-family="Montserrat" font-size="4.6" font-style="medium" text-anchor="middle" writing-mode="lr-tb">{{ (tag || '').toUpperCase() }}</tspan>
      </text>
      <!-- Human readable text of the abilities -->
        <text v-for="(ability, index) in model.abilities" v-bind:key="'abilityText'+index" id="text2410-9" x="33" :y="141.1 + index*20" inline-size="18" fill="#000" fill-opacity="1" stroke="none" stroke-width=".1" font-family="Montserrat" font-size="5" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="400" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" transform="scale(.94735 1.05557)" word-spacing="0" writing-mode="lr" xml:space="preserve">
        <tspan id="tspan2430" x="33" :y="141.1 + index*20" inline-size="18" stroke-width=".1" font-family="Montserrat" font-size="5" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="400" style="-inkscape-font-specification:'Montserrat, Normal';text-align:start;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal" text-anchor="start" writing-mode="lr"> {{ability.cardText}} </tspan>
      </text>
      <!-- Type -->
        <text id="text2495" x="76.9" y="228.6" fill="#001433" fill-opacity="1" font-family="Montserrat" font-size="6.6" font-stretch="expanded" font-style="medium" letter-spacing="1" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
        <tspan id="tspan2493" x="76.9" y="228.6" fill="#001433" fill-opacity="1" font-family="Montserrat" font-size="6.6" font-stretch="expanded" font-style="medium" text-anchor="middle" writing-mode="lr-tb">{{ getType() }}</tspan>
      </text>
      <!-- Flavor text -->
        <text v-for="(text, index) in textToSvg(model.text)" v-bind:key="'flavorLine'+index" id="text2495-3" x="76.9" :y="abilitiesLength()*20 + 156.9 + index*8" fill="#000000" fill-opacity="1" stroke="none" stroke-width=".1" font-family="Montserrat" font-size="5.1" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="300" letter-spacing="0" opacity="1" style="line-height:1.25;-inkscape-font-specification:'Montserrat';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
        <tspan id="tspan2493-1" x="76.9" :y="abilitiesLength()*20 + 156.9 + index*8" fill="#000000" fill-opacity="1" stroke-width=".1" font-family="Montserrat" font-size="5.1" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="300" style="-inkscape-font-specification:'Montserrat';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center" text-anchor="middle" writing-mode="lr-tb">{{ text }}</tspan>
      </text>
      <!-- Attack -->
        <text v-show="model.attack || model.type==='Entity'" id="text2236-11" x="23" y="228.6" fill="#001433" fill-opacity="1" stroke="none" stroke-width=".2" font-family="Montserrat" font-size="9" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="500" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
        <tspan id="tspan2234-91" x="23" y="228.6" fill="#001433" fill-opacity="1" stroke-width=".2" font-family="Montserrat" font-size="9" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="500" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end" text-anchor="end" writing-mode="lr-tb">{{ model.attack }}</tspan>
      </text>
      <!-- Health -->
        <text v-show="model.health" id="text2236-11-3" x="128" y="228.6" fill="#001433" fill-opacity="1" stroke="none" stroke-width=".2" font-family="Montserrat" font-size="9" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="500" letter-spacing="0" style="line-height:1.25;-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
        <tspan id="tspan2234-91-7" x="131" y="228.6" fill="#001433" fill-opacity="1" stroke-width=".2" font-family="Montserrat" font-size="9" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="500" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" writing-mode="lr-tb">{{ model.health }}</tspan>
      </text>
    </g>
</svg>
</template>

<script>
import * as R from 'ramda'

export default {
  name: 'CardComponent',
  props: {
    model: Object,
    imageURL: {
      type: String,
      default: null
    },
    nerflevel: Number,
    displayNotes: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opaque: 1
    }
  },
  mounted: () => {
  },
  computed: {
    viewBox () {
      if (!this.displayNotes) {
        return '0 0 154 240'
      } else {
        return '0 0 210 297'
      }
    }
  },
  methods: {
    getType () {
      if (this.model.type === 'No Type') {
        return ''
      } else {
        return this.$cardSchema.definitions[this.model.type.toLowerCase()].properties.DisplayName.toUpperCase()
      }
    },
    getNerfedSpeed () {
      let speed = Math.max(1, this.model.speed + (this.model.nerflevel ? this.model.nerflevel : 0))
      return speed
    },
    tagLength () {
      if (this.model.tag) {
        return R.length(R.filter(x => x, this.model.tag))
      } else {
        return 0
      }
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
    textToSvg (text) {
      if (!text) return text

      let maxLength = 45
      let lines = ['']
      let words = text.split(' ')

      words.forEach(function (word) {
        if (R.last(lines).length + word.length > maxLength) {
          // line full, create new line
          lines.push(word + ' ')
        } else {
          if (word === '\n') {
            // newline operator, create new line
            lines.push(' ')
          } else {
            // concat to existing line
            lines[lines.length - 1] = R.concat(lines[lines.length - 1], word + ' ')
          }
        }
      })
      return lines
    }
  }
}
</script>

<style scoped>
text-shadow: none;

img {
  width: 100%;
  height: auto;
}

.cls-1{fill:#ffdfa1;stroke:#d99941}
.cls-ironsymbol{fill:#777c85;stroke:#3e4045}
.cls-lumbersymbol{fill:#d9864e;stroke:#8c4e24}
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
