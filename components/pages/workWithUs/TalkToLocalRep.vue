<template>
    <PageSection withoutVerticalMargins>
        <div class="title">
            Undecided with the Packages? &nbsp;
            <span class="subtitle">Talk to Us!</span>
        </div>
        <div class="local-rep-link">
            <Link class="link" :to="linkTo">
                <Button
                    class="button"
                    variant="outline"
                >
                    I'd Prefer to Speak with a Local Rep
                </Button>
            </link>
        </div>
    </PageSection>
</template>

<script>
export default {
    name: "TalkToLocalRep",
    computed: {
        linkTo() {
            return '/work-with-us/contact-local-rep/';
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.title {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    @include apply-font-and-size("heading", 3);
    text-align: center;
    font-weight: 100;
    font-style: italic;

    @include medium-and-large-screens {
        margin-top: 3rem;
        flex-direction: row;
        justify-content: center;
        @include apply-font-and-size("heading", 2);
    }
}

.subtitle {
    font-style: normal;
    font-weight: 700;
    margin: 0 0.25rem;
}

.local-rep-link {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.button {
    letter-spacing: 0.1rem;
}

.title.title {
    text-transform: none;
}

</style>
