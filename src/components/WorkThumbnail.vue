<template>
  <div class="flex">
    <!-- Fixed Menu on the left -->
  <div class="w-1/4 fixed top-0 left-0 h-screen pl-6 overflow-auto ">
    <ul class='mt-8'>
      <!-- <li class='menu-title text-2xl'>DIVA WORK INDEX</li> -->
      <li v-for="work in sortedWorks" :key="work.title" class="mb-2 cursor-pointer hover:text-blue-600" @click="scrollToSection(work.title)">
        {{ reformatDate(work.title) }}
      </li>
    </ul>
  </div>

    <!-- Main Content -->
    <div class="max-w-screen-xl mx-auto ml-1/4 overflow-hidden">
      <div  v-for="work in sortedWorks" :key="work.title" class="my-8 py-8" :ref="work.title">
        <h2 class="text-2xl mb-4">{{ reformatDate(work.title) }}</h2>
        <div class="grid grid-cols-2 gap-4 max-w-screen-xl mx-auto w-full">
          <div v-for="asset in assetSort([...work.images, ...work.videos])" :key="asset.src" class="flex-shrink-0 mb-6">
            <img v-if="asset.type === 'image'" :src="asset.src" alt="Work Thumbnail" class="w-auto max-w-full h-auto">
            <video v-if="asset.type === 'video'" :src="asset.src" preload="metadata" @click="toggleVideoPlay($event)" controls class="w-auto max-w-full h-auto"></video>
            <h2 class="mt-2 text-center">{{ asset.filename }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkThumbnail",
  data() {
    return {
      works: []
    };
  },
  mounted() {
    fetch("http://localhost:3001/getWorks")
      .then(res => res.json())
      .then(data => {
        this.works = data;
        console.log(data);
      });
  },
  computed: {
    sortedWorks() {
      return [...this.works] // make a shallow copy of the array
        .sort((workA, workB) => {
          const assetA = workA.images[0] || workA.videos[0];
          const assetB = workB.images[0] || workB.videos[0];

          if (!assetA || !assetB) return 0;

          const aPrefix = parseInt(assetA.filename.substring(0, 4), 10);
          const bPrefix = parseInt(assetB.filename.substring(0, 4), 10);

          if (isNaN(aPrefix) || isNaN(bPrefix)) return 0;

          return bPrefix - aPrefix;  // reversed the order for descending sort
        })
        .map(work => ({
          ...work,
          images: this.assetSort([...work.images]), // also make a copy here
          videos: this.assetSort([...work.videos])  // and here
        }));
    }
  },
  created() {
    fetch("/data/workData.json")
      .then(response => response.json())
      .then(data => {
        this.works = data;
      });
  },
  methods: {
    assetSort(assets) {
      return assets.sort((a, b) => {
        const aPrefix = parseInt(a.filename.substring(0, 4), 10);
        const bPrefix = parseInt(b.filename.substring(0, 4), 10);

        if (isNaN(aPrefix) || isNaN(bPrefix)) return 0;

        return bPrefix - aPrefix;  // reversed the order for descending sort
      });
    },
    toggleVideoPlay(event) {
      const videoElement = event.target;
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    },
    reformatDate(date) {
      const year = date.slice(0, 2);
      const month = date.slice(2, 4);
      const day = date.slice(4, 6);
      return `${day}/${month}/${year}`;
    },
    scrollToSection(title) {
      this.$refs[title][0].scrollIntoView({
        behavior: "smooth"
      });
    }
  }
}
</script>
