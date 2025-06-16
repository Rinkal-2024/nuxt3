<template>
    <div class="back-to-link">
        <Icon name="leftArrow" />
        <Link v-if="linkTo" :to="linkTo">
            <slot />
        </Link>
        <span class="back-button" v-else>
            <slot />
        </span>
    </div>
</template>

<script>
export default {
    name: 'BackToLink',
    props: {
        linkTo: {
            type: String|Object,
            default: null
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.back-to-link {
    padding: 1.25rem 0;
    display: flex;
    align-items: center;
    justify-items: center;

    ::v-deep img {
        margin-right: 0.5rem;
        width: 15px;
        height: 15px;
    }

    ::v-deep a {
        @include apply-font-and-size("link-decorative", 3);
        font-style: italic;
        text-transform: capitalize;
        line-height: 0;
        margin-top: 5px;
    }

    //@include medium-and-large-screens {
    //    display: none;
    //}
}

.back-button {
     font-style: italic;
     &:hover {
        text-decoration: underline;
     };
}

</style>
