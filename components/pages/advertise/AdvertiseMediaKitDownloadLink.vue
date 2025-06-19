<template>
  <a
    :href="mediaKitLink"
    class="advertise-media-kit-download-link"
    rel="noopener"
    target="_blank"
  >
    here
  </a>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const mediaKitLink = computed(() => store.getters['api/advertise/mediaKitLink'])
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.advertise-media-kit-download-link {
  @include apply-font-and-size("paragraph", 3);
  margin: 0;
  text-decoration: underline;
  text-transform: none;
  font-weight: bold;
  color: black;
}
</style>
