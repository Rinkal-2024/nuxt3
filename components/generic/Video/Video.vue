<template>
  <div class="video-wrapper">
    <lite-youtube v-if="youtube" :videoId="videoId" />
    <iframe
      v-else
      class="iframe-video"
      style="border: 0;"
      :title="video.title"
      :src="urlNoAutoplay"
      :loading="loadingProp"
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { getVideoIdFromURL } from '~/utils/video'

const props = defineProps({
  video: {
    type: Object,
    required: true
  },
  lazy: {
    type: Boolean,
    default: true
  }
})

const videoId = computed(() => getVideoIdFromURL(props.video.url_embed))
const youtube = computed(() => props.video.url_embed.includes('youtube'))
const urlNoAutoplay = computed(() =>
  props.video.url_embed.replace('autoplay=1&', '').replace('autoplay=1', '')
)

const loadingProp = computed(() => (props.lazy ? 'lazy' : 'eager'))
</script>

<style scoped>
.iframe-video {
  width: 100%;
  height: 100%;
}
</style>
