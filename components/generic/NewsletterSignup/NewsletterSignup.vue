<template>
  <div :class="{'is-modal': isModal, 'is-footer': isFooter}" class="newsletter-signup">
    <div v-if="!noPhoto && !isFooter" class="newsletter-signup__image">
      <img alt="Sign up for our newsletter!" src="@/assets/images/shared/newsletter.jpg" />
    </div>

    <div class="newsletter-signup__form">
      <form id="newsletter-signup-form" @submit.prevent="submitForm">
        <div class="newsletter-signup__description">{{ title }}</div>
        <div v-if="subtitle" class="newsletter-signup__subtitle">{{ subtitle }}</div>

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
          v-model="dataForm.email"
          :disabled="isDisabled"
          :error-message="getErrorMessages($v.value.dataForm.email)"
          :has-error="$v.value.dataForm.email.$error"
          class="input"
          name="email"
          type="email"
          placeholder="Email address*"
          @blur="$v.value.dataForm.email.$touch()"
        />

        <div class="button-container">
          <div id="newsletter-signup-email-error" class="error" v-show="emailError">
            Please check you have entered a valid email address
          </div>
          <div id="newsletter-signup-error" class="error" v-show="hasError">
            Oops. Something went wrong or this email address has already been used to subscribe.
          </div>
          <Button :id="id + 'newsletter-signup-submit'" type="submit" :disabled="isDisabled">Subscribe</Button>
          <div id="newsletter-signup-loading" v-if="loading"><LoadingIndicator /></div>
          <span id="newsletter-signup-success" v-if="sent">Successfully subscribed. Thank you!</span>
          <div class="newsletter-signup__legal">
            By clicking "Subscribe" you agree to our
            <Link to="/terms-of-use/" without-styles>Terms of Use</Link>
          </div>
        </div>
      </form>
    </div>

    <div v-if="isFooter && hasMagazineCover" class="newsletter-signup__print">
      <div class="print-content">
        <div class="print-content__cover">
          <Photo :image="magazineCover" no-pin with-object-fit-contain />
        </div>
        <div class="print-content__info">
          <span class="print-title">
            Subscribe to <br /><b>INSIDE WEDDINGS</b>
          </span>
          <ul>
            <li>
              Subscribe to Inside Weddings magazine today and get a full year (4 issues) delivered straight to your door!
            </li>
            <li>
              Subscribe to the digital edition and receive immediate access to our entire library of back issues!
            </li>
          </ul>

          <div class="print-content__buttons">
            <LinkRaw href="https://simplecirc.com/subscribe/inside-weddings" without-styles>
              <Button>Print Magazine</Button>
            </LinkRaw>
            <LinkRaw href="https://simplecirc.com/subscribe/inside-weddings-digital-edition" without-styles>
              <Button>Digital Edition</Button>
            </LinkRaw>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { getErrorMessages } from '~/utils/validation'
import { getMetaUri, postFormData, requestData } from '~/utils/api'
import InputField from '~/components/generic/InputField/InputField.vue'
import Button from '~/components/generic/Button/Button.vue'
import LoadingIndicator from '~/components/generic/LoadingIndicator/LoadingIndicator.vue'
import Link from '~/components/generic/Link/Link.vue'
import LinkRaw from '~/components/generic/LinkRaw/LinkRaw.vue'
import Photo from '~/components/generic/Photo/Photo.vue'

// define props
const props = defineProps({
  noPhoto: Boolean,
  title: { type: String, default: 'Sign up for the Inside Weddings newsletter!' },
  id: { type: String, default: '' },
  isModal: Boolean,
  isFooter: Boolean,
  subtitle: String
})

const emit = defineEmits(['signup'])

const dataForm = reactive({
  first_name: '',
  last_name: '',
  email: ''
})

const loading = ref(false)
const sent = ref(false)
const hasError = ref(false)

// validation
const rules = {
  dataForm: {
    email: { required, email }
  }
}
const $v = useVuelidate(rules, { dataForm })

// use global state (Pinia store or useState fallback)
const store = useNuxtApp().$pinia?.store || {}
const route = useRoute()

const magazineCover = computed(() => store?.globalNewsletter?.magazineCover || null)
const hasMagazineCover = computed(() => !!magazineCover.value?.original)

const isDisabled = computed(() => loading.value || sent.value)
const emailError = computed(() => $v.value.dataForm.email.$error && $v.value.dataForm.email.$dirty)

function handleSignup() {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  document.cookie = `NewsletterSubscribed=; path=/; expires=${date.toUTCString()}`
  emit('signup')
  if (props.isModal && store?.globalConfig?.CLOSE_NEWSLETTER_MODAL) {
    store.globalConfig.CLOSE_NEWSLETTER_MODAL()
  }
}

async function submitForm() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    loading.value = true
    hasError.value = false
    try {
      await postFormData(useNuxtApp().$http, 'newsletter', { ...dataForm })
      sent.value = true
      handleSignup()
    } catch (e) {
      hasError.value = true
    } finally {
      loading.value = false
    }
  }
}

// fetch magazine cover if needed
if (!hasMagazineCover.value) {
  const [data] = await requestData(
    useNuxtApp().$http,
    getMetaUri({ _parsedUrl: { pathname: '/' } }, route)
  )
  if (store?.globalNewsletter?.hydrate) {
    await store.globalNewsletter.hydrate({ data })
  }
}
</script>

<style scoped lang="scss">
.newsletter-signup {
  // Your scoped styles go here.
}
</style>