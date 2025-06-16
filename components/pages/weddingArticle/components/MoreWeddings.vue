<template>
    <PageSection class="more-weddings" withoutVerticalMargins>
        <Separator class="separator"/>
        <div class="section-header">
            <div>
                <div class="subtitle">Discover</div>
                <div class="title">More Weddings</div>
            </div>
            <!-- <DesktopView> -->
                <div>
                    <Link :to="{ name: 'weddings' }">
                        <Button
                            class="view-all-button"
                            variant="outline"
                        >
                            View All
                        </Button>
                    </Link>
                </div>
            <!-- </DesktopView> -->
        </div>
        <div>
            <Cards class="cards">
                <CardStyle3
                    v-for="item in items"
                    :key="item.id"
                    :image="item.image"
                    :linkTo="item.linkTo"
                    :title="item.title"
                    class="card"
                />
            </Cards>
        </div>
        <!-- <MobileView>
            <div>
                <Link :to="{ name: 'weddings' }">
                    <Button
                        class="view-all-button"
                        variant="outline"
                    >
                        View All
                    </Button>
                </Link>
            </div>
        </MobileView> -->
    </PageSection>
</template>

<script>
export default {
    name: 'MoreWeddings',
    computed: {
        items() {
            return this.$store.getters['api/weddingsArticle/moreWeddings']
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.separator {
    margin-top: 1rem;
    padding-top: 1rem;
    @include medium-and-large-screens {
        margin-top: 0;
        padding-top: 2rem;
    }
}

.section-header {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    @include medium-and-large-screens {
        flex-direction: row;
        text-align: left;
    }
}

.title {
    margin-top: 0.5rem;
    @include apply-font-and-size("heading", 1);
}

.subtitle {
    @include apply-font-and-size("label", 7);
    text-transform: uppercase;
    font-weight: 100;
    letter-spacing: 0.1rem;
}

.view-all-button {
    width: 100%;
    margin-top: 1.5rem;
    @include medium-and-large-screens {
        margin-top: 0;
    }
}

.cards {
    flex: 1 1 100%;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
}

.card {
    padding: 0;
    margin-top: 1rem;
    flex: 1 1 100%;

    @include medium-and-large-screens {
        flex: 0 1 calc(33% - 0.25rem) !important;
        margin-top: 2rem !important;
    }

    ::v-deep {
        .content__title {
            @include apply-font-and-size("heading", 4);
            margin-top: 1rem;
            text-align: center;
            font-weight: 100;

            @include medium-and-large-screens {
                text-align: left;
                margin-top: 1rem;
                @include apply-font-and-size("heading", 9);
            }
        }

        .image, .figure {
            height: 10rem;

            @include medium-and-large-screens {
                height: 14.25rem;
            }
        }
    }
}

.more-weddings {
    @include medium-and-large-screens {
        margin-top: 2rem;
    }
}


</style>
