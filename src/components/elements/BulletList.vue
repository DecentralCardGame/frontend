<template>
  <div>
    <ul
      
      
    >
      <li       
        v-for="(line, index) in text"
        :class="{ 'teal': type==='teal', 'negated': false }"
        :key="index"
      >
        {{ line }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'BulletList',
  props: {
    text: Array,
    type: String,
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.type)
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

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

.teal{
  &:before {
    background-image: url(../../assets/misc/bulletpoint-teal.svg)
  }
}

</style>