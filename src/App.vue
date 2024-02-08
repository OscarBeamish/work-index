<template>
  <div id="app" class="min-h-screen">
    <h1 class="text-center text-7xl mb-8 mt-8">WORK INDEX</h1>
    <WorkThumbnail />
  </div>
</template>

<script>
import WorkThumbnail from '@/components/WorkThumbnail.vue';

export default {
  name: 'App',
  components: {
    WorkThumbnail
  }
}
</script>
