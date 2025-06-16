<template>
    <div class="video-wrapper">
            <lite-youtube
                v-if="youtube"
                :videoId="videoId"
            />
            <iframe
                v-else
                class="iframe-video"
                style="border: 0; "
                :title="video.title"
                :src="urlNoAutoplay"
                :loading="loadingProp"
                allowfullscreen
            />
    </div>
</template>

<script>
import {getVideoIdFromURL} from '~/utils/video'

export default {
    name: "Video",
    data: () => ({
        videoSettings: {
           modestbranding: 1,
           fs: 0,
           rel: 0
        },
        loaded: false
    }),
    props: {
        video: {
            type: Object,
            required: true
        },
        lazy: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        videoId () {
            return getVideoIdFromURL(this.video.url_embed)
        },
        youtube () {
            return this.video.url_embed.indexOf('youtube') > -1
        },
        urlNoAutoplay () {
            return this.video.url_embed
                .replace('autoplay=1&', '')
                .replace('autoplay=1', '')
        },
        loadingProp() {
            return this.lazy ? 'lazy' : 'eager'
        },
    }
}
</script>

<style scoped>
.iframe-video {
    width:100%;
    height: 100%;
}
</style>
