<template>
    <div :class="{'is-modal': isModal, 'is-footer': isFooter}" class="newsletter-signup">
        <div v-if="!noPhoto && !isFooter" class="newsletter-signup__image">
            <img alt="Sign up for our newsletter!" src="@/assets/images/shared/newsletter.jpg">
        </div>
        <div class="newsletter-signup__form">
            <form id="newsletter-signup-form">
                <div class="newsletter-signup__description">
                    {{ title }}
                </div>
                <div v-if="subtitle" class="newsletter-signup__subtitle">
                    {{ subtitle }}
                </div>

                <div class="split-fields">
                    <div class="field">
                        <InputField
                            :id="id + 'newsletter-signup-firstname'"
                            v-model="dataForm.first_name"
                            :disabled="isDisabled"
                            name="first_name"
                            placeholder="First name"
                        />
                    </div>
                    <div class="field">
                        <InputField
                            :id="id + 'newsletter-signup-lastname'"
                            v-model="dataForm.last_name"
                            :disabled="isDisabled"
                            name="last_name"
                            placeholder="Last name"
                        />
                    </div>
                </div>
                <InputField
                    :id="id + 'newsletter-signup-email'"
                    v-model="$v.dataForm.email.$model"
                    :disabled="isDisabled"
                    :error-message="getErrorMessages($v.dataForm.email)"
                    :has-error="$v.dataForm.email.$error"
                    class="input"
                    name="email"
                    type="email"
                    placeholder="Email address*"
                    @blur="$v.dataForm.email.$touch()"
                />
                <div class="button-container">
                    <div id="newsletter-signup-email-error" class="error hidden">Please check you have entered a valid email address</div>
                    <div id="newsletter-signup-error" class="error hidden">Oops. Something went wrong or this email address has already been used to subscribe.</div>
                    <Button :id="id + 'newsletter-signup-submit'" type="submit" >Subscribe</Button>
                    <div id="newsletter-signup-loading" class="hidden"><LoadingIndicator/> </div>
                    <span id="newsletter-signup-success" class="hidden">Successfully subscribed. Thank you!</span>
                    <div class="newsletter-signup__legal">By clicking "Subscribe" you agree to our
                        <Link to="/terms-of-use/" without-styles>Terms of Use</Link>
                    </div>
                </div>
            </form>
        </div>
        <div v-if="isFooter && hasMagazineCover" class="newsletter-signup__print">
            <div class="print-content">
                <div class="print-content__cover">
                    <Photo :image="magazineCover" no-pin with-object-fit-contain/>
                </div>
                <div class="print-content__info">
                    <span class="print-title">Subscribe to <br> <b>INSIDE WEDDINGS</b></span>
                    <ul>
                        <li>Subscribe to Inside Weddings magazine today and get a full year (4
                            issues) delivered straight to your door!
                        </li>
                        <li>Subscribe to the digital edition and receive immediate access to our
                            entire library of back issues!
                        </li>
                    </ul>

                    <div  class="print-content__buttons">
                        <LinkRaw href="https://simplecirc.com/subscribe/inside-weddings"
                                 without-styles>
                            <Button>Print Magazine</Button>
                        </LinkRaw>
                        <LinkRaw
                            href="https://simplecirc.com/subscribe/inside-weddings-digital-edition"
                            without-styles>
                            <Button>Digital Edition</Button>
                        </LinkRaw>
                    </div>
                </div>
            </div>
            <!-- <div v-if="isMobile" class="print-content__buttons">
                <LinkRaw href="https://simplecirc.com/subscribe/inside-weddings" without-styles>
                    <Button>Print Magazine</Button>
                </LinkRaw>
                <LinkRaw href="https://simplecirc.com/subscribe/inside-weddings-digital-edition"
                         without-styles>
                    <Button>Digital Edition</Button>
                </LinkRaw>
            </div> -->
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {email, required} from "vuelidate/lib/validators";
import {getErrorMessages} from "~/utils/validation";
import {validationMixin} from 'vuelidate'
import {mapGetters} from "vuex";
import {getMetaUri, postFormData, requestData} from "~/utils/api";

export default {
    name: "NewsletterSignup",
    mixins: [validationMixin],
    data: () => ({
        dataForm: {
            first_name: '',
            last_name: '',
            email: '',
        },
        loading: false,
        sent: false,
        hasError: false,
        dataLoaded: false
    }),
    props: {
        noPhoto: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Sign up for the Inside Weddings newsletter!'
        },
        id: {
            type: String,
            default: ''
        },
        isModal: {
            type: Boolean,
            default: false
        },
        isFooter: {
            type: Boolean,
            default: false
        },
        subtitle: {
            type: String,
            default: ''
        }
    },
    validations: {
        dataForm: {
            email: {required, email}
        }
    },
    methods: {
        getErrorMessages(errors) {
            return getErrorMessages(errors)
        },
        submitForm() {
            if (!this.$v.dataForm.$invalid) {
                this.sendFormData()
            } else {
                this.$v.dataForm.$touch()
            }
        },
        async sendFormData() {
            this.loading = true
            this.hasError = false
            const finalDataForm = {...this.dataForm}
            try {
                await postFormData(this.$http, 'newsletter', finalDataForm)
                this.sent = true
                this.handleSignup()
            } catch {
                this.hasError = true
            } finally {
                this.loading = false
            }
        },
        handleSignup() {
            const signupCookieDate = new Date()
            signupCookieDate.setDate(signupCookieDate.getDate() + 30)
            const signupCookieDateString = signupCookieDate.toUTCString()
            document.cookie = `NewsletterSubscribed=;path=/;expires=${signupCookieDateString};`;
            this.$emit('signup')
            if (this.isModal) {
                this.$store.commit('global/config/CLOSE_NEWSLETTER_MODAL')
            }
        }
    },
    computed: {
        ...mapGetters('global/newsletter', [
            'magazineCover',
            'currentData'
        ]),
        ...mapGetters('global/config', [
            'isMobile'
        ]),
        isDisabled() {
            return this.loading || this.sent
        },
        hasMagazineCover() {
            return !!this.magazineCover?.original
        }
    },
    async fetch() {
        // if(!this.magazineCover?.original) {
        const [data] = await requestData(
            this.$http,
            getMetaUri({_parsedUrl: {pathname: '/'}}, this.$route),
        )

        await this.$store.dispatch('global/newsletter/hydrate', {
            data
        })
        this.dataLoaded = true
        // }
    },
    fetchOnServer: true
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.newsletter-signup {
    margin: 1.5rem 0;
    padding-bottom: 1rem;
    @include apply-font-and-size("label", 4);
    border: 1px solid $input-border-color;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    .button-container {
        padding: 0 0.5rem;
        width: 100%;
        //max-width: $max-width;
        text-align: center;

        button {
            width: 100%;
        }
    }

    &.is-modal {
        margin: 1rem 0 0 0;
        border: none;

        .split-fields {
            flex-flow: column nowrap;

            .field {
                width: 100%;
            }
        }

        img {
            width: 150px;
            max-width: 150px;
            height: 400px;
            object-fit: cover;
        }
    }

    &.is-footer {
        $max-width: 600px;
        background-color: $color-darker-white;
        border: none;
        margin-bottom: -3rem;
        padding-top: 1rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;

        .newsletter-signup__description {
            @include apply-font-and-size("heading", 9);
        }

        @include small-and-medium-screens {
            padding-bottom: 2rem;
            flex-flow: column nowrap;
        }

        .newsletter-signup__form {
            max-width: $max-width;
            flex: 1;
        }

        .newsletter-signup__print {
            max-width: $max-width;
            flex: 1;
            @include small-and-medium-screens {
                padding: 1rem;
            }

            .print-title {
                @include apply-font-and-size("heading", 9);
                font-size: 1.4rem;
                line-height: 1.8rem;
                @include small-and-medium-screens {
                    font-size: 1.3rem;
                    line-height: 1.6rem;
                }
            }

            .print-content {
                display: flex;
                flex-flow: row wrap;

                &__cover {
                    width: 40%;
                    //height: 300px;
                    figure {
                        height: 100%;
                        width: 100%;
                    }

                    ::v-deep img {
                        object-fit: contain;
                        height: auto;
                        width: auto;
                        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.5);
                    }
                }

                &__info {
                    width: 60%;
                    padding-left: 1rem;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-between;

                    ul {
                        padding-left: 1rem;
                        @include apply-font-and-size("link", 7);
                        @include small-and-medium-screens {
                            @include apply-font-and-size("link", 5);
                        }
                        text-transform: uppercase;
                        letter-spacing: 0.08rem;

                        li {
                            margin-bottom: 0.5rem;
                        }
                    }
                }

                &__buttons {
                    display: flex;
                    flex-flow: row wrap;

                    a {
                        flex: 1;
                        padding: 0.25rem;

                        button {
                            padding: 0.5rem;
                            width: 100%;
                            white-space: nowrap;
                        }
                    }

                    @include small-and-medium-screens {
                        margin-top: 0.5rem;
                    }
                }
            }

        }

        .newsletter-signup__description {
            font-size: 2rem;
            line-height: 2.5rem;
            font-weight: bold;
        }

        .button-container {
            max-width: $max-width;
        }
    }

    &__image img {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 280px;
        padding: 0.5rem 0.5rem 0;
    }

    &__form {
        width: 100%;
        padding: 1rem 1rem 0 1rem;
    }

    &__description {
        margin-bottom: 1.5rem;
        text-align: center;
        @include apply-font-and-size("heading", 3);
        @include small-and-medium-screens {
            @include apply-font-and-size("heading", 2)
        }
    }

    .split-fields {
        display: flex;
        flex-flow: row wrap;

        .field {
            flex: 1;
            min-width: 200px;
            padding: 0 0.5rem;
        }
    }

    .input {
        padding: 0 0.5rem;
    }

    .error {
        //height: 30px; // To prevent shift when message appears
        color: $color-red;
        @include apply-font-and-size('article', 6);
        padding: 0.5rem 1rem 0;
        text-align: center;
    }

    &__subtitle {
        text-align: center;
        margin-top: -1rem;
        margin-bottom: 1rem;
        @include apply-font-and-size("heading", 5);
        @include small-and-medium-screens {
            @include apply-font-and-size("heading", 3)
        }
    }

    .loading-indicator {
        margin: 0 auto;
        width: 1rem;
        height: 1rem;
    }
}

.newsletter-signup__legal {
    @include apply-font-and-size("link", 13);
    @include small-and-medium-screens {
        @include apply-font-and-size("link", 6);
    }
    text-transform: uppercase;
    color: $color-darker-grey;
    margin-top: 0.75rem;
    letter-spacing: 0.1rem;
    text-align: center;

    a {
        color: black;
        font-weight: bold;
        text-decoration: underline;
        @include apply-font-and-size("link", 13);
        @include small-and-medium-screens {
          @include apply-font-and-size("link", 6);
        }
    }
}


</style>
