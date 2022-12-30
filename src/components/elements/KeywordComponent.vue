<template>
  <div>
    <div
      v-for="(keyword, index) in keywordDescriptions"
      :key="index"
      class="Keywords"
    >
      <p
        class="Keyword"
      >
        {{ keyword[0] }}
      </p>
      <p>{{ keyword[1] }}</p>
      <br>
    </div>
  </div>
</template>

<script>

export default {
  name: "KeywordComponent",
  props: {
    keywords: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      keywordDescriptions: []
    };
  },
  watch: {
    keywords: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.keywordDescriptions = []
      this.keywords.forEach(ability => {
        ability.forEach(keyword => {
          this.keywordDescriptions.push([keyword, this.$rulesDefinitions[this.firstLetterToLower(keyword)].description]);
        });
      });
    },
    firstLetterToLower(string) {
        return string[0].toLowerCase() + string.substring(1);
    },
  }
};
</script>

<style>
.Keyword {
  font-weight: bold;
}
</style>

