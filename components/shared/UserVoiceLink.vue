<template>
    <span
        @click="openUserVoiceModal"
        class="link"
    >
        <slot></slot>
    </span>
</template>

<script>
export default {
    name: 'UserVoiceLink',
    methods: {
        openUserVoiceModal() {
            if (window && window.UserVoice && window.UserVoice.push) {
                window.UserVoice.push([
                    "showLightbox",
                    "classic_widget",
                    {
                        mode: "support",
                        primary_color: "#000000",
                        link_color: "#303030",
                        topic_id: "81543"
                    }
                ]);
            }
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.link {
    font-weight: 100;
    color: $color-black;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    @include apply-font-and-size("link", 6);
    text-transform: uppercase;
}

</style>
