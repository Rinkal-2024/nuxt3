<template>
    <a
        :href="mediaKitLink"
        class="advertise-media-kit-download-link"
        rel="noopener"
        target="_blank"
    >here</a>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "AdvertiseMediaKitDownloadLink",
    computed: {
        ...mapGetters('api/advertise', [
            'mediaKitLink'
        ]),
    }
}
</script>

<style lang="scss" scoped>
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
