<template id="theCardSvg">
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 154 240"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="fill-rule:evenodd;clip-rule:evenodd;"
    @mouseenter="cardmouseenter"
    @mouseleave="cardmouseleave"
    @click="cardmouseclick"
  >
    <!-- card image -->
    <g id="Ebene_2">
      <mask id="imgMask">
        <rect
          id="rect1315"
          opacity="1"
          width="154"
          height="240"
          x="0"
          y="0"
          fill="white"
          fill-opacity="1"
          class="cls-2"
          rx="8"
        />
      </mask>
      <image
        preserveAspectRatio="xMinYMin slice"
        align="xMidYMid"
        :href="imageURL"
        x="0"
        y="0"
        width="154"
        height="240"
        rx="8"
        class="cardImage"
        mask="url(#imgMask)"
      />
    </g>
    <!-- text box -->
    <g
      :opacity="opaque*0.8"
      transform="matrix(0.986969,0,0,1,1.66464,-0.992511)"
    >
      <g id="Ebene4">
        <path
          d="M4.33,138.7L4.33,231.81C4.33,234.004 6.136,235.81 8.33,235.81L144.33,235.81C146.524,235.81 148.33,234.004 148.33,231.81L148.33,138.7"
          style="fill:white;fill-rule:nonzero;stroke:white;stroke-width:1px;"
        />
      </g>
    </g>
    <!-- class top background -->
    <g
      :opacity="opaque"
      transform="matrix(1,0,0,0.967974,1.38778e-17,0)"
    >
      <g id="Ebene1">
        <path
          id="_-Abgerundetes-Rechteck-"
          serif:id="(Abgerundetes Rechteck)"
          d="M146,0C150.415,0 154,3.585 154,8L154,18.725L0,18.725L0,8C0,3.585 3.585,0 8,0L146,0Z"
          style="fill:white;"
        />
      </g>
    </g>
    <!-- title, tag and top ressource box -->
    <g
      id="Schraeg"
      :opacity="opaque"
    >
      <!-- tag box -->
      
      <g transform="matrix(0.0991046,0,0, 0.322856,71.962,232.17)">
        <g transform="scale(1,1.2)">
          <g transform="translate(0 -3)">
            <path
              d="M-610.05,0.928L712.217,0.928L707.752,19.35L-614.516,19.35L-610.05,2.928Z"
              style="fill:rgb(96,96,106);"
            />
          </g>
        </g>
      </g>
      <!-- left line -->
      <g
        :opacity="1"
        transform="matrix(0.519675,0,0,1,22.0546,-0.0)"
      >
        <path
          d="M66.56,222.91L12.22,222.91"
          style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;"
        />
      </g>
      <!-- right line -->
      <g
        :opacity="1"
        transform="matrix(0.519675,0,0,1,90.1594,-0.0)"
      >
        <path
          d="M66.56,222.91L12.22,222.91"
          style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;"
        />
      </g>
      <!-- ressource box drop shadow -->
      <g transform="matrix(0.447919,0,0,1.4592,-8.02371,-2.27304)">
        <path
          d="M55.913,2.928L99.007,2.928L94.542,13.979L51.447,13.979L55.913,2.928Z"
          style="fill:rgb(96,96,106);"
        />
      </g>
      <!-- ressource box -->
      <g transform="matrix(0.447919,0,0,1.4592,-10.0237,-4.27304)">
        <path
          d="M55.913,2.928L99.007,2.928L94.542,13.979L51.447,13.979L55.913,2.928Z"
          style="fill:rgb(204,204,204);"
        />
      </g>
      <!-- title box drop shadow -->
      <g transform="matrix(0.447919,0,0,1.4592,-15.801,118.727)">
        <path
          d="M51.404,2.932L371.377,2.928L366.912,15.35L46.939,15.354L51.404,2.932Z"
          style="fill:rgb(96,96,106);"
        />
      </g>
      <!-- title box -->
      <g transform="matrix(0.447919,0,0,1.4592,-17.801,116.727)">
        <path
          d="M51.447,2.928L371.377,2.928L366.912,15.35L46.982,15.35L51.447,2.928Z"
          style="fill:rgb(204,204,204);"
        />
      </g>
    </g>
    <!-- icons -->
    <g
      id="Icons-Spacing-Grey"
      :opacity="opaque"
      serif:id="Icons Spacing Grey"
    >
      <!-- energy icon -->
      <g
        :opacity="opaque"
        transform="matrix(0.928122,0,0,0.780528,14.3377,2.27483)"
      >
        <g
          v-show="model.CostType.Energy"
          id="Ebene3"
        >
          <path
            d="M42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063L43.871,9.063L42.019,14.712Z"
            style="fill:rgb(255,204,0);"
          />
          <path
            d="M42.295,10.344L40.585,10.344C40.147,10.344 39.753,10.028 39.587,9.546C39.422,9.063 39.519,8.51 39.833,8.146L45.117,2.012C45.467,1.606 46.003,1.53 46.423,1.828C46.842,2.126 47.041,2.723 46.906,3.282L46.148,6.423L47.786,6.424C48.219,6.425 48.611,6.734 48.779,7.209C48.947,7.685 48.859,8.233 48.555,8.602L42.789,15.608C42.431,16.043 41.865,16.119 41.435,15.789C41.005,15.459 40.83,14.814 41.016,14.247L42.295,10.344ZM40.585,9.063L43.871,9.063L42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063Z"
            style="fill:rgb(102,102,102);"
          />
        </g>
        <g
          v-show="!model.CostType.Energy"
          id="Ebene3"
          opacity="0.2"
        >
          <path
            d="M42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063L43.871,9.063L42.019,14.712Z"
            style="fill:rgb(204,204,204);"
          />
          <path
            d="M42.295,10.344L40.585,10.344C40.147,10.344 39.753,10.028 39.587,9.546C39.422,9.063 39.519,8.51 39.833,8.146L45.117,2.012C45.467,1.606 46.003,1.53 46.423,1.828C46.842,2.126 47.041,2.723 46.906,3.282L46.148,6.423L47.786,6.424C48.219,6.425 48.611,6.734 48.779,7.209C48.947,7.685 48.859,8.233 48.555,8.602L42.789,15.608C42.431,16.043 41.865,16.119 41.435,15.789C41.005,15.459 40.83,14.814 41.016,14.247L42.295,10.344ZM40.585,9.063L43.871,9.063L42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063Z"
            style="fill:rgb(102,102,102);"
          />
        </g>
      </g>
      <!-- food icon -->
      <g
        :opacity="opaque"
        transform="matrix(0.900887,0,0,0.900887,109.698,4.15101)"
      >
        <g
          v-show="model.CostType.Food"
          id="Ebene_1-2-5"
        >
          <g transform="matrix(1.06878,0,0,1.06878,-116.112,-4.60135)">
            <g id="Ebene_2">
              <path
                d="M114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
                style="fill:rgb(255,153,102);"
              />
              <path
                d="M115.566,6.712C115.339,6.493 115.025,6.389 114.712,6.429L111.606,6.829C111.338,6.864 111.094,7.001 110.926,7.212L109.811,8.612C109.695,8.758 109.62,8.933 109.595,9.117L109.29,11.321C109.249,11.62 109.339,11.922 109.539,12.148L111.063,13.883C111.25,14.095 111.514,14.222 111.795,14.235L114.346,14.353C114.645,14.367 114.936,14.251 115.144,14.035L116.594,12.525C116.742,12.37 116.839,12.174 116.871,11.962L117.321,9.016C117.372,8.683 117.258,8.346 117.016,8.112L115.566,6.712ZM114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
                style="fill:rgb(96,96,106);"
              />
            </g>
          </g>
          <g
            id="polyline869"
            transform="matrix(1,0,0,1,-1.4296,1.27398)"
          >
            <path
              d="M11.7,1.5L10.2,1.5L10.2,0"
              style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;"
            />
          </g>
          <g
            id="line871"
            transform="matrix(0.935484,0,0,0.933333,-0.958627,1.56064)"
          >
            <path
              d="M7.3,4.3L10.4,1.3"
              style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1.07px;stroke-linecap:round;"
            />
          </g>
        </g>
        <g
          v-show="!model.CostType.Food"
          id="Ebene_1-2-5"
          opacity="0.2"
        >
          <g transform="matrix(1.06878,0,0,1.06878,-116.112,-4.60135)">
            <g id="Ebene_2">
              <path
                d="M114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
                style="fill:rgb(204,204,204);"
              />
              <path
                d="M115.566,6.712C115.339,6.493 115.025,6.389 114.712,6.429L111.606,6.829C111.338,6.864 111.094,7.001 110.926,7.212L109.811,8.612C109.695,8.758 109.62,8.933 109.595,9.117L109.29,11.321C109.249,11.62 109.339,11.922 109.539,12.148L111.063,13.883C111.25,14.095 111.514,14.222 111.795,14.235L114.346,14.353C114.645,14.367 114.936,14.251 115.144,14.035L116.594,12.525C116.742,12.37 116.839,12.174 116.871,11.962L117.321,9.016C117.372,8.683 117.258,8.346 117.016,8.112L115.566,6.712ZM114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
                style="fill:rgb(96,96,106);"
              />
            </g>
          </g>
          <g
            id="polyline869"
            transform="matrix(1,0,0,1,-1.4296,1.27398)"
          >
            <path
              d="M11.7,1.5L10.2,1.5L10.2,0"
              style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;"
            />
          </g>
          <g
            id="line871"
            transform="matrix(0.935484,0,0,0.933333,-0.958627,1.56064)"
          >
            <path
              d="M7.3,4.3L10.4,1.3"
              style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1.07px;"
            />
          </g>
        </g>
      </g>
      <!-- iron icon -->
      <g
        v-show="model.CostType.Iron"
        :opacity="opaque"
        transform="matrix(0.601191,0,0,0.601191,29.7156,4.26699)"
      >
        <g id="Ebene7">
          <path
            d="M74.009,5.549C73.996,5.462 81.671,5.602 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549Z"
            style="fill:rgb(153,204,204);"
          />
          <path
            d="M72.932,4.273C73.001,4.218 73.078,4.165 73.164,4.115C73.225,4.078 73.559,3.887 74.166,3.867C75.384,3.826 81.543,3.943 81.931,3.901C82.513,3.839 83.047,4.024 83.463,4.541C83.689,4.822 83.942,5.602 83.888,6.22C83.859,6.549 83.697,7.365 82.655,7.716C82.425,7.794 81.836,7.891 81.209,8.14C80.748,8.323 80.154,8.589 80.134,9.293C80.129,9.455 80.166,9.655 80.182,9.734C80.298,9.749 80.699,9.799 80.78,9.807C82.017,9.932 82.274,10.89 82.326,11.234C82.392,11.667 82.375,12.502 82.368,12.665C82.368,12.681 82.367,12.689 82.367,12.689C82.331,13.581 81.599,14.285 80.706,14.286L72.319,14.292C71.404,14.293 70.66,13.553 70.655,12.638L70.649,11.535C70.644,10.768 71.164,10.098 71.908,9.912C71.908,9.912 72.26,9.877 72.703,9.761C72.119,9.536 71.547,9.314 71.155,9.079C70.351,8.598 69.171,7.883 68.634,7.425C68.277,7.12 68.072,6.82 67.975,6.617C67.689,6.021 67.769,5.506 67.958,5.103C68.142,4.711 68.528,4.146 69.52,4.086C70.215,4.044 71.37,4.184 72.367,4.255C72.54,4.268 72.754,4.272 72.932,4.273ZM75.665,5.387L75.672,5.471L75.675,5.522C77.955,5.529 81.802,5.588 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549C74.005,5.523 74.696,5.517 75.676,5.522L75.672,5.453L75.664,5.376C75.66,5.351 75.657,5.327 75.654,5.302L75.665,5.387ZM82.214,7.212L82.241,7.212C82.256,7.211 82.271,7.21 82.286,7.209L82.214,7.212Z"
            style="fill:rgb(96,96,106);"
          />
        </g>
      </g>
      <g
        v-show="!model.CostType.Iron"
        opacity="0.2"
        transform="matrix(0.601191,0,0,0.601191,29.7156,4.26699)"
      >
        <g
          id="Icons-Spacing-Grey"
          serif:id="Icons Spacing Grey"
        >
          <path
            d="M74.009,5.549C73.996,5.462 81.671,5.602 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549Z"
            style="fill:rgb(204,204,204);"
          />
          <path
            d="M72.932,4.273C73.001,4.218 73.078,4.165 73.164,4.115C73.225,4.078 73.559,3.887 74.166,3.867C75.384,3.826 81.543,3.943 81.931,3.901C82.513,3.839 83.047,4.024 83.463,4.541C83.689,4.822 83.942,5.602 83.888,6.22C83.859,6.549 83.697,7.365 82.655,7.716C82.425,7.794 81.836,7.891 81.209,8.14C80.748,8.323 80.154,8.589 80.134,9.293C80.129,9.455 80.166,9.655 80.182,9.734C80.298,9.749 80.699,9.799 80.78,9.807C82.017,9.932 82.274,10.89 82.326,11.234C82.392,11.667 82.375,12.502 82.368,12.665C82.368,12.681 82.367,12.689 82.367,12.689C82.331,13.581 81.599,14.285 80.706,14.286L72.319,14.292C71.404,14.293 70.66,13.553 70.655,12.638L70.649,11.535C70.644,10.768 71.164,10.098 71.908,9.912C71.908,9.912 72.26,9.877 72.703,9.761C72.119,9.536 71.547,9.314 71.155,9.079C70.351,8.598 69.171,7.883 68.634,7.425C68.277,7.12 68.072,6.82 67.975,6.617C67.689,6.021 67.769,5.506 67.958,5.103C68.142,4.711 68.528,4.146 69.52,4.086C70.215,4.044 71.37,4.184 72.367,4.255C72.54,4.268 72.754,4.272 72.932,4.273ZM75.665,5.387L75.672,5.471L75.675,5.522C77.955,5.529 81.802,5.588 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549C74.005,5.523 74.696,5.517 75.676,5.522L75.672,5.453L75.664,5.376C75.66,5.351 75.657,5.327 75.654,5.302L75.665,5.387ZM82.214,7.212L82.241,7.212C82.256,7.211 82.271,7.21 82.286,7.209L82.214,7.212Z"
            style="fill:rgb(96,96,106);"
          />
        </g>
      </g>
      <!-- mana icon -->
      <g
        :opacity="opaque"
        transform="matrix(1,0,0,1,0.791233,0)"
      >
        <g
          id="_-Eingebettetes-Dokument-"
          serif:id="(Eingebettetes Dokument)"
          transform="matrix(0.992943,0,0,0.989034,134.563,9.12312)"
        >
          <g transform="matrix(1,0,0,1,-5.5,-5.5)">
            <clipPath id="_clip1">
              <rect
                x="0"
                y="0"
                width="11"
                height="11"
              />
            </clipPath>
            <g clip-path="url(#_clip1)">
              <g
                v-show="model.CostType.Mana"
                id="Ebene_21"
                serif:id="Ebene_2"
              >
                <g id="Ebene_1-2">
                  <path
                    d="M5.5,0.928L7.012,4.08L9.344,5.5L7.071,7.174L5.5,9.464L4.121,6.977L1.788,5.5L4.316,3.856L5.5,0.928Z"
                    style="fill:rgb(204,153,255);"
                  />
                  <path
                    d="M6,10.5L5,10.5C4.995,8.033 2.967,6.005 0.5,6L0.5,5C2.967,4.995 4.995,2.967 5,0.5L6,0.5C6.005,2.967 8.033,4.995 10.5,5L10.5,6C8.033,6.005 6.005,8.033 6,10.5ZM2.79,5.5C3.989,6.049 4.951,7.011 5.5,8.21C6.049,7.011 7.011,6.049 8.21,5.5C7.011,4.951 6.049,3.989 5.5,2.79C4.951,3.989 3.989,4.951 2.79,5.5Z"
                    style="fill:rgb(96,96,106);fill-rule:nonzero;"
                  />
                </g>
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                />
                <g transform="matrix(1,0,0,1,-9.19823,0)">
                  <path
                    d="M10.5,5.5L9.698,5.5"
                    style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                  />
                </g>
                <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,-9.19823)">
                  <path
                    d="M10.5,5.5L9.698,5.5"
                    style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                  />
                </g>
                <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,3.55271e-15)">
                  <path
                    d="M10.5,5.5L9.698,5.5"
                    style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                  />
                </g>
              </g>
              <g
                v-show="!model.CostType.Mana"
                id="Ebene_2"
                opacity="0.2"
              >
                <g id="Ebene_1-2">
                  <path
                    d="M5.5,0.928L7.012,4.08L9.344,5.5L7.071,7.174L5.5,9.464L4.121,6.977L1.788,5.5L4.316,3.856L5.5,0.928Z"
                    style="fill:rgb(204,204,204);"
                  />
                  <path
                    d="M6,10.5L5,10.5C4.995,8.033 2.967,6.005 0.5,6L0.5,5C2.967,4.995 4.995,2.967 5,0.5L6,0.5C6.005,2.967 8.033,4.995 10.5,5L10.5,6C8.033,6.005 6.005,8.033 6,10.5ZM2.79,5.5C3.989,6.049 4.951,7.011 5.5,8.21C6.049,7.011 7.011,6.049 8.21,5.5C7.011,4.951 6.049,3.989 5.5,2.79C4.951,3.989 3.989,4.951 2.79,5.5Z"
                    style="fill:rgb(96,96,106);fill-rule:nonzero;"
                  />
                </g>
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                />
                <g transform="matrix(1,0,0,1,-9.19823,0)">
                  <path
                    d="M10.5,5.5L9.698,5.5"
                    style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                  />
                </g>
                <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,-9.19823)">
                  <path
                    d="M10.5,5.5L9.698,5.5"
                    style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                  />
                </g>
                <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,3.55271e-15)">
                  <path
                    d="M10.5,5.5L9.698,5.5"
                    style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <!-- lumber icon -->
      <g
        :opacity="opaque"
        transform="matrix(1,0,0,1,0.791233,0)"
      >
        <g transform="matrix(1.02546,0,0,1.02546,94.5416,9.32348)">
          <g transform="matrix(1,0,0,1,-5.5,-5.5)">
            <g
              id="Ebene_22"
              serif:id="Ebene_2"
            >
              <g
                v-show="model.CostType.Lumber"
                id="Ebene_1-21"
                serif:id="Ebene_1-2"
              >
                <path
                  d="M9.5,7.5L5.5,0.5L1.677,7.5L9.5,7.5Z"
                  style="fill:rgb(153,204,102);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                />
                <path
                  d="M5.5,10.33L5.5,5.5"
                  style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2;"
                />
              </g>
              <g
                v-show="!model.CostType.Lumber"
                id="Ebene_1-2"
                opacity="0.2"
              >
                <path
                  d="M9.5,7.5L5.5,0.5L1.677,7.5L9.5,7.5Z"
                  style="fill:rgb(204,204,204);stroke:rgb(96,96,106);stroke-width:1px;"
                />
                <path
                  d="M5.5,10.33L5.5,5.5"
                  style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-miterlimit:2;"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
    <g :opacity="opaque">
      <!-- Ability icon 1 -->
      <g
        v-for="(ability, index) in model.abilities"
        id="Ebene_2-36"
        :key="'icon'+index"
        data-name="Ebene 2"
        :transform="'translate(17.4 ' + (146.1+index*20) + ')'"
      >
        <g
          id="Ebene_1-2-0"
          data-name="Ebene 1"
        >
          <rect
            id="rect1000"
            width="10"
            height="10"
            x=".5"
            y=".5"
            fill="none"
            stroke="#d99941"
            class="cls-1"
            rx="5"
          />
          <path
            id="line1002"
            fill="none"
            stroke="#d99941"
            d="M.7 5.8h9.8"
            class="cls-1"
          />
          <path
            id="line1004"
            fill="none"
            stroke="#d99941"
            d="M2.4 3.9v1.8"
            class="cls-1"
          />
          <path
            id="line1006"
            fill="none"
            stroke="#d99941"
            d="M8.3 3.9v1.8"
            class="cls-1"
          />
          <path
            id="line1008"
            fill="none"
            stroke="#d99941"
            d="M5.5 3.9v1.8"
            class="cls-1"
          />
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
      <text
        id="text2410"
        x="81.2"
        y="127.4"
        fill="#000"
        fill-opacity="1"
        stroke="none"
        stroke-width=".3"
        font-family="Museo700-Regular"
        font-size="10.7"
        font-stretch="normal"
        font-style="normal"
        font-variant="normal"
        font-weight="700"
        letter-spacing="0"
        style="line-height:1.25;-inkscape-font-specification:'Museo700-Regular, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start"
        text-anchor="start"
        transform="scale(.94735 1.05557)"
        word-spacing="0"
        writing-mode="lr-tb"
        xml:space="preserve"
      >
        <tspan
          id="tspan2408"
          x="81.2"
          y="127.4"
          stroke-width=".3"
          font-family="Museo500-Regular"
          font-size="10.7"
          font-stretch="normal"
          font-style="normal"
          font-variant="normal"
          font-weight="500"
          style="-inkscape-font-specification:'Museo700-Regular, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center"
          text-anchor="middle"
          writing-mode="lr-tb"
        >{{ model.CardName }}</tspan>
      </text>
      <!-- Ressource Cost -->
      <text
        id="text2236"
        x="23.5"
        y="14.1"
        font-family="Museo500-Regular"
        font-size="13"
        stroke="black"
        stroke-width="0.3"
        font-style="normal"
        letter-spacing="0"
        text-anchor="start"
        word-spacing="0"
        writing-mode="lr-tb"
        xml:space="preserve"
      >
        <tspan
          id="tspan2234"
          x="23.5"
          y="14.1"
          font-family="Museo500-Regular"
          font-size="13"
          font-style="normal"
          text-anchor="middle"
          writing-mode="lr-tb"
        >{{ getNerfedCost() }}</tspan>
      </text>
      <!-- Tags -->
      <text
        id="text2527"
        key="tag"
        x="77"
        y="237.4"
        fill="#FFDAA6"
        stroke-width=".1"
        font-family="Roboto"
        font-size="6.6"
        letter-spacing="1"
        text-anchor="start"
        xml:space="preserve"
      >
        <tspan
          id="tspan2525"
          x="77"
          y="237.4"
          fill="#FFDAA6"
          fill-opacity="1"
          stroke-width=".1"
          font-family="Roboto"
          font-size="6.6"
          font-style="medium"
          text-anchor="middle"
          writing-mode="lr-tb"
        >{{ getTags() }}
        </tspan>
      </text>

      <!-- Tags old -->
      <!--text
        v-for="(tag, index) in model.Tags"
        id="text2527"
        :key="'tag'+index"
        :x="75 + index*46 - (tagLength() - 1)*23"
        y="237.4"
        fill="#FFDAA6"
        stroke-width=".1"
        font-family="Roboto"
        font-size="6.6"
        letter-spacing="1"
        text-anchor="start"
        xml:space="preserve"
      >
        <tspan
          id="tspan2525"
          :x="75 + index*46 - (tagLength() - 1)*23"
          y="237.4"
          fill="#FFDAA6"
          fill-opacity="1"
          stroke-width=".1"
          font-family="Roboto"
          font-size="6.6"
          font-style="medium"
          text-anchor="middle"
          writing-mode="lr-tb"
        >{{ (tag || '').toUpperCase() }}</tspan>
      </text-->
      <!-- Human readable text of the abilities -->
      <text
        v-for="(text, index) in textToSvg(getAbilityText())"
        id="text2410-9"
        :key="'abilityText'+index"
        x="33"
        :y="156.9 + index*fontSpacing(getAbilityText())"
        inline-size="18"
        fill="#000"
        fill-opacity="1"
        stroke="none"
        stroke-width=".1"
        font-family="Roboto"
        font-size="5"
        font-stretch="normal"
        font-style="normal"
        font-variant="normal"
        font-weight="400"
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
          x="33"
          :y="156.9 + index*fontSpacing(getAbilityText())"
          inline-size="18"
          stroke-width=".1"
          font-family="Roboto"
          font-size="5"
          font-stretch="normal"
          font-style="normal"
          font-variant="normal"
          font-weight="400"
          style="-inkscape-font-specification:'Roboto, Normal';text-align:start;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal"
          text-anchor="start"
          writing-mode="lr"
        > {{ text }} </tspan>
      </text>
      <!-- Type -->
      <text
        id="text2495"
        x="76.9"
        y="225.6"
        fill="#001433"
        fill-opacity="1"
        font-family="Roboto"
        font-size="6.6"
        font-stretch="expanded"
        font-style="medium"
        letter-spacing="1"
        text-anchor="start"
        word-spacing="0"
        writing-mode="lr-tb"
        xml:space="preserve"
      >
        <tspan
          id="tspan2493"
          x="76.9"
          y="225.6"
          fill="#001433"
          fill-opacity="1"
          font-family="Roboto"
          font-size="6.6"
          font-stretch="expanded"
          font-style="medium"
          text-anchor="middle"
          writing-mode="lr-tb"
        >{{ getType() }}</tspan>
      </text>
      <!-- Flavor text -->
      <text
        v-for="(text, index) in textToSvg(model.FlavourText)"
        id="text2495-3"
        :key="'flavorLine'+index"
        fill="#000000"
        fill-opacity="1"
        stroke="none"
        stroke-width=".1"
        font-family="Roboto"
        font-size="5.1"
        font-stretch="normal"
        font-style="normal"
        font-variant="normal"
        font-weight="300"
        letter-spacing="0"
        opacity="1"
        style="line-height:1.25;-inkscape-font-specification:'Roboto';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start"
        word-spacing="0"
        writing-mode="lr-tb"
        xml:space="preserve"
      >
        <tspan
          id="tspan2493-1"
          x="26.9"
          :y="abilitiesLength()*20 + 156.9 + index*fontSpacing(model.FlavourText)"
          fill="#000000"
          fill-opacity="1"
          stroke-width=".1"
          font-family="Roboto"
          :font-size="fontSize(model.FlavourText)"
          font-stretch="normal"
          font-style="normal"
          font-variant="normal"
          font-weight="300"
          style="-inkscape-font-specification:'Roboto';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:justify"
          text-anchor="start"
          writing-mode="horizontal-tb"
        >{{ text }}</tspan>
      </text>
      <!-- Attack -->
      <text
        v-show="model.type === 'Entity'"
        id="text2236-11"
        x="23"
        y="225.6"
        fill="#001433"
        fill-opacity="1"
        stroke="none"
        stroke-width=".2"
        font-family="Roboto"
        font-size="9"
        font-stretch="normal"
        font-style="normal"
        font-variant="normal"
        font-weight="500"
        letter-spacing="0"
        style="line-height:1.25;-inkscape-font-specification:'Roboto, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start"
        text-anchor="start"
        word-spacing="0"
        writing-mode="lr-tb"
        xml:space="preserve"
      >
        <tspan
          id="tspan2234-91"
          x="23"
          y="225.6"
          fill="#001433"
          fill-opacity="1"
          stroke-width=".2"
          font-family="Roboto"
          font-size="9"
          font-stretch="normal"
          font-style="normal"
          font-variant="normal"
          font-weight="500"
          style="-inkscape-font-specification:'Roboto, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:end"
          text-anchor="end"
          writing-mode="lr-tb"
        >{{ model.Attack }}</tspan>
      </text>
      <!-- Health -->
      <text
        v-show="model.type !== 'Action'"
        id="text2236-11-3"
        x="128"
        y="225.6"
        fill="#001433"
        fill-opacity="1"
        stroke="none"
        stroke-width=".2"
        font-family="Roboto"
        font-size="9"
        font-stretch="normal"
        font-style="normal"
        font-variant="normal"
        font-weight="500"
        letter-spacing="0"
        style="line-height:1.25;-inkscape-font-specification:'Roboto, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start"
        text-anchor="start"
        word-spacing="0"
        writing-mode="lr-tb"
        xml:space="preserve"
      >
        <tspan
          id="tspan2234-91-7"
          x="131"
          y="225.6"
          fill="#001433"
          fill-opacity="1"
          stroke-width=".2"
          font-family="Roboto"
          font-size="9"
          font-stretch="normal"
          font-style="normal"
          font-variant="normal"
          font-weight="500"
          style="-inkscape-font-specification:'Roboto, Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start"
          text-anchor="start"
          writing-mode="lr-tb"
        >{{ model.Health }}</tspan>
      </text>
    </g>
  </svg>
</template>

<script>
import * as R from 'ramda'
import * as svg1 from 'save-svg-as-png'

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
      opaque: 1,
      clicked: false
    }
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
  created () {
    if (this.model.Notes.startsWith('ability: ')) {
      this.model.abilities = [{cardText: this.model.Notes.substring(9)}]
      this.model.FlavourText = ''
    }
  },
  methods: {
    cardmouseleave() {
      this.opaque = 1;
      this.clicked = false;
    },
    cardmouseclick() {
      if (this.isMobileDevice()) {
        this.opaque = this.clicked? 1 : 0
        this.clicked = !this.clicked
      }
      else {
        this.opaque = 1;
        if (this.clicked) {
          //this.saveSingleCard()
        }
        this.clicked = true
      }
    },
    cardmouseenter() {
      this.opaque = 0;
    },
    getType () {
      if (R.toLower(this.model.type) === 'no type' || !this.model.type) {
        return ''
      } else {
        let type = this.$cardRules.children[this.model.type === 'HQ' ? 'Headquarter' : this.model.type]
        if (type) {
          return type.name.toUpperCase()
        } else {
          console.error('Invalid card type. Must be one of the following: ' + R.values(R.pluck('name', this.$cardRules.children)) + '. Instead is: ' + type )
        }
      }
    },
    getNerfedCost () {
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
    getAbilityText () {
      if (this.model.Notes.startsWith('ability: ')) {
        return this.model.Notes.substring(9)
      }
      else return ''
    },
    textToSvg (text) {
      if (!text) return text

      let maxLength = 47
      if (text.length < 100)
        maxLength = 25
      else if (text.length < 200)
        maxLength = 29

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
    fontSize (text) {
      if (text.length < 100)
        return 8.1
      else if (text.length < 200)
        return 7.1
      else
        return 6.1
    },
    fontSpacing (text) {
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
