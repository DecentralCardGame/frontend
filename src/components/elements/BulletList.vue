<template>
  <div>
    <ul>
      <li       
        v-for="(line, index) in text"
        :key="index"
        :class="{ 'filled': type[index]==='filled' }"
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
    text: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
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
  margin: 1rem;
  &:before {
    content: '';
    display: inline-block;
    height: 1rem;
    width: 1rem;
    background-image: url(../../assets/misc/bulletpoint.svg);
    background-size: contain;
    background-repeat: no-repeat;
    margin-right:0.5em;
  }
}

.filled{
  &:before {
    background-image: url(../../assets/misc/bulletpoint-filled.svg)
  }
}

</style>