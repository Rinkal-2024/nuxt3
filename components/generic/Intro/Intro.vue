<template>
    <PageSection
        class="section"
        fullWidth
        withoutVerticalMargins
    >
        <div class=intro>
            <h1 class="subtitle">
                <span class="decorative">Are You a </span>Wedding
                Professional?
            </h1>
            <h2 class="title">Become a Business Member</h2>
            <Button
                small
                class="button scroll-down"
                @click="onButtonClick"
            >
                Sign up now
            </Button>
        </div>
        <Photo class="intro-image" :lazy="false" :image="image"/>
    </PageSection>

</template>

<script>
export default {
    name: "Intro",
    props: {
        image: {
            type: Object,
            required: true
        }
    },
    methods: {
        onButtonClick() {
            this.$emit('buttonClick')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.section {
    position: relative;
}

.intro {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 20rem;
    text-align: center;
    @include medium-and-large-screens {
        height: 26rem;
    }
}

.title,
.subtitle,
.button {
    z-index: 1;
    color: $color-white;
   
}

.button{
     &:hover {
        background: $color-white;
    }
}

.subtitle {
    @include apply-font-and-size("heading", 3);
    font-weight: 100;

    .decorative {
        font-style: italic;
    }

    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 2);
    }
}

.title {
    @include apply-font-and-size("heading", 2);
    font-weight: 100;
    font-style: normal;
    margin-top: 0;

    @include medium-and-large-screens {
        @include apply-font-and-size("heading", 1);
    }
}

.button {
    margin-top: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 100;

    @include medium-and-large-screens {
        margin-top: 3.5rem;
    }
}

.intro-image {
    width: 100%;
    position: absolute;
    height: 100%;
    z-index: 0;
    top: 0;
    overflow: hidden;
}

</style>
