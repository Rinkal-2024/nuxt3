<template>
    <div class="mailgate">
        <NewsletterSignup class="mailgate__signup" no-photo :title="title" style="margin-top: 0" @signup="emitSignup"/>
    </div>
</template>

<script>
export default {
    name: "NewsArticleMailGate",
    data: () => ({
        title: 'Sign up for the InsideWeddings newsletter to continue reading.'
    }),
    methods: {
        emitSignup() {
            this.$emit('signup')
        }
    }
}
</script>

<style scoped lang="scss">
.mailgate {
    $blur-height: 200px;
    $side-offset: 8px;

    position: relative;
    &__signup{
        margin-top: 0;
    }
    &::before{
        position: absolute;
        content: '';
        width: calc(100% + 2*#{$side-offset});
        height: $blur-height;
        top: -$blur-height;
        left: -$side-offset;
        //background-color: rgba(200, 100, 0, 0.3);
        background: linear-gradient(to top, white 15%, transparent 100%);
    }
}
</style>
