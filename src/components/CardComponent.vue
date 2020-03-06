<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="550" v-bind:viewBox="viewBox" >
    <defs/>
    <defs>
      <clipPath>
        <circle cx="5.5" cy="5.5" r="5" class="cls-1"/>
      </clipPath>
    </defs>
    <g>
      <g>
        <!-- card image background -->
        <mask id="imgMask">
        <rect id="rect1315" width="154" height="240" x="0" y="0" fill="white" fill-opacity="1" class="cls-2" rx="8"/>
         </mask>
        <!-- card image -->
        <image preserveAspectRatio="xMinYMin slice" align="xMidYMid" v-bind:href="imageURL" x="0" y="0" width="154" height="240" rx="8" class="cardImage" mask="url(#imgMask)"/>

        <path id="line1313" fill="none" stroke="#ffb300" stroke-linecap="round" stroke-linejoin="round" d="M101 190.9v-20" class="cls-1"/>

        <!-- background of whole card -->
        <!--rect id="rect1315" width="154" height="240" x="0" y="0" fill="#5f6069" fill-opacity="1" class="cls-2" rx="8"/-->

        <!-- text box shadow -->
        <path id="path1317" fill="#001433" d="M140.3 132.3h-126a4 4 0 00-4 4v92a4 4 0 004 4q62.4-1.4 126 0a4 4 0 004-4q-1.5-46.6 0-92a4 4 0 00-4-4z" class="cls-3"/>
        <!-- title banner wedges -->
        <!--path id="polygon1319" fill="#001433" d="M149.3 134.1l2 7.1H1.3l2.1-7.1-2.1-7.2h150z" class="cls-banderole-back"/-->

        <!-- lower border lines -->
        <!--path id="path1321" fill="none" stroke="#d99941" d="M4.3 138.7v93.1a4 4 0 004 4h136a4 4 0 004-4v-93.1" class="cls-4"/-->
        <!-- title box drop shadow edges -->
        <path id="polygon1325" fill="#a37331" d="M141.2 136.6h6.1l-6.1 3.9z" class="cls-6"/>
        <path id="polygon1327" fill="#a37331" d="M11.4 136.6H5.3l6.1 3.9z" class="cls-6"/>

        <!-- ressource cost box drop shadow -->
        <rect id="rect1329" width="134" height="18" x="10.3" y="1" fill="black" fill-opacity="1" rx="4"/>

        <!-- ressource cost box -->
        <rect id="rect1329" width="134" height="18" x="9.3" y="0" fill="#fffefc" fill-opacity="1" class="cls-7" rx="4"/>

        <!-- text box -->
        <rect id="rect1329" width="134" height="100" x="9.3" y="131.2" fill="#fffefc" fill-opacity="1" class="cls-7" rx="4"/>
        <!-- title box drop shadow -->
        <path id="polygon1331" fill="#d99941" d="M143.3 131.6v7H9.3v-14h134z"/>
        <!-- title box -->
        <path id="polygon1333" fill="#ffdfa1" d="M147.3 129.6v7H5.3v-14h142z"/>

        <!-- what is this? -->
        <!--path id="rect1335" fill="#a37331" d="M3.8 140.6h1v.6h-1z" class="cls-6"/-->
        <!--path id="rect1337" fill="#a37331" d="M147.8 140.6h1v.6h-1z" class="cls-6"/-->

        <!-- text box background -->
        <!--rect id="rect1341" width="134" height="100" x="9.3" y="18.1" fill="#f2f2f2" class="cls-7" /-->

        <!-- tag box -->
        <path id="rect1343" fill="#001433" fill-opacity="1" d="M9.3 233.1h134v5.3H9.3z"/>
        <!-- attack - type - health lines -->
        <path id="line1347" fill="none" stroke="#d99941" stroke-width="1" d="M56 226H28" class="cls-4"/>
        <path id="line1349" fill="none" stroke="#d99941" stroke-width="1" d="M123 226H95" class="cls-4"/>
        <!-- upper border lines -->
        <!--path id="path1351" fill="none" stroke="none" d="M148.3 108.4V28" class="cls-10"/>
        <path id="path1353" fill="none" stroke="none" d="M4.3 28v80.4" class="cls-10"/-->
        <!-- upper line begin end dashes -->
        <!--path id="path1355" fill="none" stroke="none" d="M148.3 111.4v-2" class="cls-10"/>
        <path id="path1357" fill="none" stroke="none" d="M4.3 109.4v2" class="cls-10"/>
        <path id="path1359" fill="none" stroke="none" d="M148.3 113.4v-1" class="cls-10"/>
        <path id="path1361" fill="none" stroke="none" d="M4.3 112.4v1" class="cls-10"/>
        <path id="path1363" fill="none" stroke="none" d="M148.3 25v2" class="cls-10"/>
        <path id="path1365" fill="none" stroke="none" d="M4.3 27v-2" class="cls-10"/>
        <path id="path1367" fill="none" stroke="none" d="M148.3 23v1" class="cls-10"/>
        <path id="path1369" fill="none" stroke="none" d="M4.3 24v-1" class="cls-10"/-->
        <!-- speed box pentagon -->
        <path id="path1371" fill="#001433" d="M19.9 33a70.3 70.3 0 0113.7-11.3c-3-6.7-5-12-5.4-14.6L5.5 6 3.1 25.7z" class="cls-3"/>
        <path id="polygon1373" fill="#ffdaa6" d="M19.1 32.1l13.7-11.2-5.4-14.7-22.7-1-2.4 19.7z"/>
        <!-- upper cut shadows -->
        <!--path id="polygon1375" fill="#001433" d="M145.8 118.1l4.6-2.3-1.3 3.3-3.3 1.8z" class="cls-3"/>
        <path id="polygon1377" fill="#001433" d="M150.4 121.3l1.5.3-1.1 1.5-2-.5z" class="cls-3"/>
        <path id="polygon1379" fill="#001433" d="M8.5 116.3l-4.6-.9 2.2 4 3.2.5z" class="cls-3"/>
        <path id="polygon1381" fill="#001433" d="M2.9 119.4H1l.9 2.5 3.2-.3z" class="cls-3"/-->
        <!-- bar between attack | health -->
        <!--path id="line1349-2" fill="#6c6c6c" fill-opacity="1" stroke="#6c6c6c" stroke-opacity="1" stroke-width=".4" d="M126.9 228.3v-5.9" class="cls-4"/-->
      </g>
    </g>
    <!-- Energy symbol -->
    <g v-show="model.cost.energy" id="Ebene_2-7" data-name="Ebene 2" transform="translate(46 3.7)">
      <g>
        <circle id="circle833" cx="5.5" cy="5.5" r="5" fill="#ffdfa1" stroke="#d99941" class="cls-energysymbol"/>
        <g id="g839" class="cls-4" clip-path="url(#clip-path)">
          <path id="polyline837" fill="#ffdfa1" stroke="#d99941" d="M8.4 1.4L6.6 4.1h2l-4.9 6.1L4.8 6l-2.4-.1L4.9.8" class="cls-energysymbol2"/>
        </g>
      </g>
    </g>
    <!-- Food symbol -->
    <g v-show="model.cost.food" id="Ebene_2-7" data-name="Ebene 2" transform="translate(95.8 3.5)">
      <g id="Ebene_1-2-5" data-name="Ebene 1">
        <circle id="circle867" cx="5.5" cy="6" r="5" fill="#ffdfa1" stroke="#d99941" class="cls-foodsymbol"/>
        <path id="polyline869" fill="none" stroke="#d99941" d="M11.7 1.5h-1.5V0" class="cls-foodsymbol"/>
        <path id="line871" fill="none" stroke="#d99941" d="M7.3 4.3l3.1-3" class="cls-foodsymbol"/>
        <path
           d="M 6.8923791,3.961162 C 6.4929971,3.9031371 5.9668653,3.982055 5.3005007,4.1532126 4.6341361,4.3243701 3.8308891,4.5868692 3.3332689,4.9050504 2.8356487,5.2232316 2.6465278,5.5962211 2.5120228,6.0416592 2.3775178,6.4870972 2.2988525,7.0010333 2.3409691,7.3726705 2.3830857,7.7443077 2.5458232,7.9700395 2.8197183,8.2228472 3.0936133,8.4756548 3.4773678,8.7542724 3.8747123,8.9594641 4.2720568,9.1646557 4.6826259,9.2962485 5.0167984,9.2827538 5.3509709,9.2692591 5.6091512,9.1111896 5.8033737,8.950904 5.9975963,8.7906183 6.129726,8.6267781 6.2867872,8.351817 6.4438484,8.0768559 6.6292266,7.684915 6.7210133,7.3592275 6.8128,7.03354 6.8128,6.76967 6.8443665,6.4860657 6.8759331,6.2024613 6.9393063,5.896152 7.041894,5.6361276 7.1444818,5.3761031 7.2870695,5.1595816 7.4261719,4.9627851 7.5652743,4.7659885 7.7027973,4.5861509 7.6349247,4.4006081 7.5670522,4.2150654 7.2917611,4.0191869 6.8923791,3.961162 Z"
           id="path3883" class="cls-foodsymbol2"/>
      </g>
    </g>
    <!-- Generic symbol -->
    <g v-show="model.cost.generic" id="Ebene_2-35" data-name="Ebene 2" transform="translate(130.1 3.7)">
      <g id="Ebene_1-2-62" data-name="Ebene 1">
        <circle id="circle899" cx="5.5" cy="5.5" r="5" fill="#ffdfa1" stroke="#d99941" class="cls-1"/>
        <path id="polyline901" fill="none" stroke="#d99941" d="M7.9 4.1L5.5 5.5 3.1 4.1" class="cls-2"/>
        <path id="polyline903" fill="none" stroke="#d99941" d="M7.7 7.7L5.5 5.5 3.3 7.7" class="cls-2"/>
        <path id="line905" fill="none" stroke="#d99941" d="M5.5 2.6v2.9" class="cls-2"/>
      </g>
    </g>
    <!-- Iron symbol -->
    <g v-show="model.cost.iron" id="Ebene_2-9" data-name="Ebene 2" transform="translate(62.7 4.4)">
      <g id="Ebene_1-2-1" data-name="Ebene 1">
        <path id="polygon928" d="M8.1.5h-5L.6 4.8l2.5 4.4h5l2.5-4.4z" class="cls-ironsymbol"/>
        <circle id="circle930" cx="5.6" cy="4.8" r="2" class="cls-ironsymbol"/>
      </g>
    </g>
    <!-- Lumber symbol -->
    <g v-show="model.cost.lumber" id="Ebene_2-2" data-name="Ebene 2" transform="translate(79.7 3.7)">
      <g id="Ebene_1-2-7" data-name="Ebene 1">
        <circle style="fill:#ffdfa1;stroke:#d99941" class="cls-lumbersymbol" r="5" cy="5.5" cx="5.5" id="circle951" />
        <path style="fill:none;stroke:#d99941;stroke-width:0.50581414" class="cls-lumbersymbol" d="M 6.2050315,6.6340744 9.4882116,2.5980456" id="line955"/>
        <rect id="rect4127" width="3.992759" height="2.4867184" x="2.5718465" y="6.2177548" style="fill:#d99941" />
        <path style="fill:none;stroke:#d99941;stroke-width:0.50581414" class="cls-lumbersymbol" d="M 2.7865415,6.3794861 7.2255201,0.97751345" id="line955-3"/>
        <path style="fill:none;stroke:#d99941;stroke-width:0.50581414" class="cls-lumbersymbol" d="M 6.3837759,8.5509865 10.087976,3.8958114" id="line955-5"/>
        <path style="fill:none;stroke:#d99941;stroke-width:0.33204007" class="cls-lumbersymbol" d="M 5.8723076,4.3274695 8.0394768,1.6926238" id="line955-2"/>
      </g>
    </g>
    <!-- Mana symbol -->
    <g v-show="model.cost.mana" id="Ebene_2-0" data-name="Ebene 2" transform="translate(113.3 3.7)">
      <g id="Ebene_1-2-9" data-name="Ebene 1">
        <circle id="circle977" cx="5.5" cy="5.5" r="5" fill="none" stroke="#d99941" class="cls-manasymbol"/>
        <path id="path979" fill="none" d="M6 10.5H5A4.5 4.5 0 00.5 6V5A4.5 4.5 0 005 .5h1A4.5 4.5 0 0010.5 5v1A4.5 4.5 0 006 10.5zm-3.2-5a5.5 5.5 0 012.7 2.7 5.5 5.5 0 012.7-2.7 5.5 5.5 0 01-2.7-2.7 5.5 5.5 0 01-2.7 2.7z" class="cls-manasymbol2"/>
      </g>
    </g>
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
    <text id="text2236" x="17" y="24.1" font-family="Montserrat" font-size="19.5"  stroke="black" stroke-width="0.8" font-style="normal" letter-spacing="0" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
    <tspan id="tspan2234" x="17" y="24.1" font-family="Montserrat" font-size="19.5" font-style="normal" text-anchor="middle" writing-mode="lr-tb">{{ getNerfedSpeed() }}</tspan>
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
    <text id="text2495" x="75.1" y="228.6" fill="#001433" fill-opacity="1" font-family="Montserrat" font-size="6.6" font-stretch="expanded" font-style="medium" letter-spacing="1" text-anchor="start" word-spacing="0" writing-mode="lr-tb" xml:space="preserve">
    <tspan id="tspan2493" x="75.1" y="228.6" fill="#001433" fill-opacity="1" font-family="Montserrat" font-size="6.6" font-stretch="expanded" font-style="medium" text-anchor="middle" writing-mode="lr-tb">{{ cardType }}</tspan>
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
    <tspan id="tspan2234-91-7" x="128" y="228.6" fill="#001433" fill-opacity="1" stroke-width=".2" font-family="Montserrat" font-size="9" font-stretch="normal" font-style="normal" font-variant="normal" font-weight="500" style="-inkscape-font-specification:'Montserrat, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" text-anchor="start" writing-mode="lr-tb">{{ model.health }}</tspan>
  </text>
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
      cardType: ''
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
    getSchema () {
      return this.$cardSchema.then(x => {
        return x
      }).catch(x => {
        console.error(x)
      })
    },
    getType () {
      return this.$cardSchema.definitions[this.model.type.toLowerCase()].properties.DisplayName
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
