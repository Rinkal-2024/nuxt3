<template>
    <li class="social-links__item">
        <a
            :href="to"
            rel="nofollow noopener noreferrer"
            target="_blank"
        >
            <Icon :name="name"></Icon>
        </a>
    </li>
</template>

<script>
export default {
    name: 'SocialLinksItem',
    props: {
        to: {
            type: String,
            default: '/',
            validator: value => {
                try {
                    new URL(value)
                    return true
                } catch {
                    return false
                }

            }
        },
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.social-links__item {
    @include apply-zero-padding-and-margin-for-first-and-last-child;
    margin: 0 0.15rem;
    white-space: nowrap;

    a {
        display: flex;
    }
}

</style>
