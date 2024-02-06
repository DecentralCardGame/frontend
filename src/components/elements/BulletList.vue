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