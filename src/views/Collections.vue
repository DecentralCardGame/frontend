<template>
  <div>
    <div class="peterSolar">
      <div class="child general">
        <h2>Collection</h2>
        <div v-if="!editStory">
          {{ collection.story }}
          <button
            v-if="$store.getters['common/wallet/address'] === collection.storyWriter && collection.status === 'design'"
            @click="editStory = true"
          >
            Edit story
          </button>
        </div>
        <div v-else>
          <textarea
            v-model="collection.story"
            placeholder="story"
            rows="10"
            cols="40"
          />
          <button
            class="btn--default"
            @click="editStory = false"
          >
            Update
          </button>
        </div>
        <br>
      </div>
      <div class="child contribs">
        def
      </div>
      <div class="child image">
        ghi
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Collections",
  components: {},
  data() {
    return {
      editStory: false,
      id: 0,
      collection: {
        artwork: "",
        name: "",
      },
    }
  },
  mounted() {
    this.id = parseInt(this.$route.params.id)
    this.getCollection()
  },
  methods: {
    getCollection() {
      this.$cardChain.getCollection(this.id)
      .then(res => {
        this.collection = res.c
        console.log(this.collection)
        if (!this.collection.artwork) {
          this.collection.artwork = "Avatar0.png"
        }
      })
    }
  }
}
</script>

<style lang="scss">

.peterSolar {
  margin-top:10px;
  .child {
    background: #F5F5F5;
    margin:3%;
    padding:25px;
    display:inline-block;
  }
}

.general {
  width: 50%
}

</style>
