<template>
    <Modal with-dark-close-button flex @onClose="onClose" class="modal">
        <img src="~/assets/images/shared/newsletter.jpg" alt="" class="image" />
        <NewsletterSignup no-photo is-modal />
    </Modal>
</template>

<script>
export default {
    name: "NewsletterSignupModal",
    methods: {
        onClose() {
            this.$store.commit('global/config/CLOSE_NEWSLETTER_MODAL')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.modal.modal {
    z-index: 10;
}

.image.image {
    width: 200px;
    max-width: 200px;
    height: 480px;
    min-height: 480px;
    object-fit: cover;
}

@include small-screens {

    //.modal.modal {
    //    max-width: 90vw !important;
    //    overflow: scroll;
    //}

    .image.image {
        display: none;
    }
}

</style>
