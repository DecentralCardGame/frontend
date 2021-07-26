<template>
  <div>
    <ul>
      <li>List item</li>
      <li>Another list item</li>
      <li>Guess what? It's a list item</li>
      <li>This is a list item too</li>
      <li>Last list item</li>
    </ul>

    <div
        class="diamond--element"
    >
    <svg>
      <path 
        d="M10 10 H 90 V 90 H 10 L 10 10" 
        transform="rotate(45)"
        fill="none" 
        stroke-width="4px" 
        stroke="#12CECF" 
      />
    </svg>
    </div>
    
    <div
      class="text--element"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'BulletPoint',
  props: {
    text: String,
    type: String
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.text--element{
    float:left; 
    display:inline;
}
.diamond--element{
    float:left; 
    display:inline;
}

ul {
  list-style:none;
  padding-left: 1em;
}
li {
  &:before {
    content: '';
    display: inline-block;
    height: 1em;
    width: 1em;
    background-image: url(../../assets/misc/bulletpoint.svg);
    background-size: contain;
    background-repeat: no-repeat;
    margin-right:0.5em;   
  }
}

</style>