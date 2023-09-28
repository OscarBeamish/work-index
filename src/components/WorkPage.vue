<template>
  <div class="work-detail" v-if="workData">
    <img :src="workData.thumbnail" alt="Thumbnail">
    <h1>{{ workData.title }}</h1>
    <p>{{ workData.description }}</p>
    <!-- You can add more detailed layout here using the content from JSON -->
  </div>
</template>

<script>
export default {
  name: "WorkPage",
  data() {
    return {
      workData: null
    };
  },
  created() {
    fetch("/data/workData.json")
      .then(response => response.json())
      .then(data => {
        const id = this.$route.params.id;
        this.workData = data.find(work => work.id === id);
      });
  }
}
</script>

<style scoped>
/* Styles specific to the WorkPage */
</style>
