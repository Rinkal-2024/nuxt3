<template>
    <div class="prev-or-next-post">
        <div v-if="!$isAMP" class="back-to-list">
            <Link
                :to="backToLink"
                class="link"
                withoutStyles
            >
                {{ backToListLabel }}
            </Link>
        </div>
        <div class="prev-or-next-container">
            <div v-if="previous" class="prev-post">
                <div class="title">
                    <Link :to="previousUrl" class="label">
                        {{ previous.label }}
                    </Link>
                    <Link :to="previousUrl" class="link">
                        <h2>{{ previous.title }}</h2>
                    </Link>
                </div>
                <Photo :image="previous.image"/>
            </div>
            <div v-if="next" class="next-post">
                <div class="title">
                    <Link :to="nextUrl" class="label">
                        {{ next.label }}
                    </Link>
                    <Link :to="nextUrl" class="link">
                        <h2>{{ next.title }}</h2>
                    </Link>
                </div>
                <Photo :image="next.image"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrevOrNextPost',
    props: {
        backToLink: {
            type: String | Object,
            default: '/'
        },
        backToListLabel: {
            type: String,
            required: true
        },
        previous: {
            type: Object | null,
            default: null
        },
        next: {
            type: Object | null,
            default: null
        }
    },
    computed: {
        previousUrl() {
            const url = this.$router.resolve(this.previous.linkTo).href
            if (this.$isAMP) {
                return `/amp${url}`
            }
            return url
        },
        nextUrl() {
            const url = this.$router.resolve(this.next.linkTo).href
            if (this.$isAMP) {
                return `/amp${url}`
            }
            return url
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";



.prev-or-next-post {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    background-color: $color-white;

    @include medium-and-large-screens {
        margin-top: 1rem;
        margin-bottom: -5rem;
    }

    .prev-or-next-container {
        flex: 1 1 85%;
        display: flex;
        border-top: $border-width solid $color-grey;
        align-items: center;

        @include medium-and-large-screens {
            margin-bottom: 3rem;
            justify-content: center;
        }
    }

    .prev-post {
        display: flex;
        justify-content: center;
        align-content: center;
        text-align: center;
        flex-direction: row-reverse;
        padding: 1rem 0;
        flex: 0 1 100%;
        position: relative;

        ::v-deep {
            & ~ div {
                border-left: $border-width solid $color-grey;
            }

            .label {
                @include apply-font-and-size("label", 6);
                color: $color-black;
                letter-spacing: 0.05rem;

                @include medium-and-large-screens {
                    color: $color-darker-grey;
                }
            }

            .title {
                a {
                    display: none;
                    @include medium-and-large-screens {
                        display: flex;
                        flex-direction: column;
                        margin: 0 1rem 0 1rem;
                    }
                }

                h2 {
                    @include hidden-for-small-and-visible-for-medium-and-large-screens;
                    @include apply-font-and-size("heading", 4);
                    font-weight: 100;
                    font-style: normal;
                    color: $color-black;
                    text-transform: none;
                }
            }

            .image {
                @include hidden-for-small-and-visible-for-medium-and-large-screens;
                width: 7.5rem;
                height: 5rem;
                position: relative;
            }

            .label {
                @include medium-and-large-screens {
                    padding-right: 2rem;
                }
            }

            .link {
                &:before {
                    position: absolute;
                    content: "";
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1;
                }
            }
        }

        @include medium-and-large-screens {
            text-align: left;
            justify-content: flex-end;
            margin: 0.5rem 0;
            flex: 1;
        }

        @include large-screens {
            padding: 1rem 0 1rem 2rem;
        }
    }

    .next-post {
        display: flex;
        justify-content: center;
        align-content: center;
        text-align: center;
        flex-direction: row;
        padding: 1.5rem 0;
        flex: 1 1 100%;
        position: relative;

        @include medium-and-large-screens {
            text-align: right !important;
            justify-content: flex-end;
            padding: 1.5rem 0 1rem 0;
            margin: 0.5rem 0 0.5rem 0;
            flex: 1;
        }

        ::v-deep {
            & ~ div {
                border-left: $border-width solid $color-grey;
            }

            .label {
                @include apply-font-and-size("label", 6);
                color: $color-black;
                letter-spacing: 0.05rem;

                @include medium-and-large-screens {
                    color: $color-darker-grey;
                }
            }

            .title {
                a {
                    display: none;
                    @include medium-and-large-screens {
                        display: flex;
                        flex-direction: column;
                        margin: 0 1rem 0 1rem;
                    }
                }

                h2 {
                    @include hidden-for-small-and-visible-for-medium-and-large-screens;
                    @include apply-font-and-size("heading", 4);
                    font-weight: 100;
                    font-style: normal;
                    color: $color-black;
                    text-transform: none;
                }
            }

            .image {
                @include hidden-for-small-and-visible-for-medium-and-large-screens;
                width: 7.5rem;
                flex: 0 0 7.5rem;
                height: 5rem;
                position: relative;
            }

            .link {
                &:before {
                    position: absolute;
                    content: "";
                    height: 100%;
                    width: 100%;
                    top: 0;
                    right: 0;
                    z-index: 1;
                }
            }
        }

        @include large-screens {
            padding: 1rem 0 1rem 2rem;
        }
    }
}

.back-to-list {
    @include apply-font-and-size("label", 6);
    display: none;

    @include medium-and-large-screens {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 1 100%;
        min-height: 5rem;
        text-align: center;
        border-top: $border-width solid $color-grey;
        margin-bottom: 3rem;
    }

    @include large-screens {
        flex: 1 1 15%;
    }

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 1 100%;
        height: calc(100% - 1rem);
        font-weight: 100;
        text-transform: uppercase;

        @include large-screens {
            flex: 1 1 15%;
            border-right: $border-width solid $color-grey;
        }
    }
}

</style>
