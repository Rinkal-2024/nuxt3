<template>
  <div :class="['newsletter-signup', { 'is-modal': isModal, 'is-footer': isFooter }]">
    <!-- Header Image -->
    <div v-if="!noPhoto && !isFooter" class="newsletter-signup__image">
      <img alt="Sign up for our newsletter!" src="@/assets/images/shared/newsletter.jpg" />
    </div>

    <!-- Signup Form -->
    <div class="newsletter-signup__form">
      <form @submit.prevent="submitForm">
        <h2 class="newsletter-signup__description">{{ title }}</h2>
        <p v-if="subtitle" class="newsletter-signup__subtitle">{{ subtitle }}</p>

        <div class="split-fields">
          <InputField
            v-for="field in ['first_name','last_name']"
            :key="field"
            :id="`${id}-${field}`"
            v-model="dataForm[field]"
            :disabled="isDisabled"
            :placeholder="field === 'first_name' ? 'First name' : 'Last name'"
            class="field"
          />
        </div>

        <InputField
          :id="`${id}-email`"
          v-model="dataForm.email"
          :disabled="isDisabled"
          :error-message="emailError"
          :has-error="v$.dataForm.email.$invalid && v$.dataForm.email.$dirty"
          name="email"
          type="email"
          placeholder="Email address*"
          @blur="v$.dataForm.email.$touch()"
        />

        <div class="button-container">
          <Button type="submit" :disabled="isDisabled">Subscribe</Button>
          <LoadingIndicator v-if="loading" class="loading-indicator" />
          <p v-if="sent" class="success">Successfully subscribed. Thank you!</p>
          <p v-if="hasError" class="error">
            Oops. Something went wrong or this email address is already used.
          </p>
        </div>

        <p class="newsletter-signup__legal">
          By clicking "Subscribe" you agree to our
          <NuxtLink to="/terms-of-use" class="link">Terms of Use</NuxtLink>
        </p>
      </form>
    </div>

    <div v-if="isFooter && magazineCover" class="newsletter-signup__print">
      <Photo :image="magazineCover" no-pin with-object-fit-contain />
      <div class="print-content__info">
        <h3 class="print-title">Subscribe to <br /><b>INSIDE WEDDINGS</b></h3>
        <ul>
          <li>Get a full year (4 issues) delivered to your door!</li>
          <li>Instant access to digital back issues.</li>
        </ul>
        <div class="print-content__buttons">
          <a href="https://simplecirc.com/subscribe/inside-weddings" target="_blank" rel="noopener">
            <Button>Print Magazine</Button>
          </a>
          <a
            href="https://simplecirc.com/subscribe/inside-weddings-digital-edition"
            target="_blank"
            rel="noopener"
          >
            <Button>Digital Edition</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useRuntimeConfig } from '#imports'
import InputField from '../InputField/InputField.vue'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator.vue'
import Button from '../Button/Button.vue'
import Photo from '../Photo/Photo.vue'
import { useNewsletterStore } from '~/store/global/newsletter'

// Props
const props = defineProps({
  noPhoto: { type: Boolean, default: false },
  isModal: Boolean,
  isFooter: Boolean,
  subtitle: String,
  title: { type: String, default: 'Sign up for the Inside Weddings newsletter!' },
  id: { type: String, default: '' },
})

// Reactive State & Validation
const dataForm = reactive<{ [key: string]: string }>({ first_name: '', last_name: '', email: '' })
const rules = { dataForm: { email: { required, email } } }
const v$ = useVuelidate(rules, { dataForm })

// UI State
const loading = ref(false)
const sent = ref(false)
const hasError = ref(false)
const config = useRuntimeConfig()
const store = useNewsletterStore()

// Computed
const isDisabled = computed(() => loading.value || sent.value)
const magazineCover = computed(() => store.magazineCover)
console.log("magazineCover" ,magazineCover)
const emailError = computed(() =>
  v$.value.dataForm.email.$error
    ? v$.value.dataForm.email.$errors.map((e) => e.$message).join(', ')
    : ''
)

// Form Submit
async function submitForm() {
  v$.value.$touch()
  if (v$.value.$invalid) return

  loading.value = true
  hasError.value = false

  try {
    const res = await $fetch(`${config.public.baseUrl}/newsletter`, {
      method: 'POST',
      body: dataForm,
    })
    sent.value = true
    document.cookie = `NewsletterSubscribed=1; Path=/; Max-Age=${60 * 60 * 24 * 30}`
    await store.hydrate({ data: [] })
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
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