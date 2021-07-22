<template>
  <div>
    <div
        class="diamond--element"
    >
    <svg>
      <path 
        d="M10 10 H 90 V 90 H 10 L 10 10" 
        transform="rotate(45)"
        fill="none" 
        stroke-width="4px" 
        stroke="black" 
      />
    </svg>
    </div>
    
    <div
      class="text--element"
    >
      {{ BulletInfo }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'BulletPoint',
  data () {
    return {
        BulletInfo: "blabla"
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
</style>