<template>
  <Form id="advertise-form" @submit.prevent="submitForm">
    <Title>Advertise With Us</Title>
    <FormDescription>
      <!-- Form intro paragraphs -->
    </FormDescription>

    <FormFields>
      <!-- Business info fields -->
      <InputField
        id="advertise-name" full-width required placeholder="Name*"
        v-model="form.name" :has-error="v$.name.$error"
        @blur="v$.name.$touch()"
      />
      <!-- Other fields similar -->
      <SelectDropDown
        details-id="ads-category-details"
        select-class="select-ads-category"
        :items="vendorCategories" placeholder-text="Category*"
        v-model="form.category" :has-error="v$.category.$error"
      />
      <!-- ... rest ... -->
    </FormFields>

    <FormButtons>
      <div v-if="error" class="error">Unknown error …</div>
      <Button id="advertise-submit" type="submit" :disabled="loading">
        Submit
      </Button>
      <LoadingIndicator v-if="loading" />
      <span v-if="success">Your form has been successfully submitted!</span>
    </FormButtons>
  </Form>
</template>

<script setup>
// Imports
import { reactive, ref, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, url } from '@vuelidate/validators'
import { getErrorMessages } from '~/utils/validation'

// Reactive form data
const form = reactive({
  name: '',
  title: '',
  company_name: '',
  client_name: '',
  category: null,
  phone_number: '',
  email: '',
  website: '',
  address: '',
  city: '',
  region: '',
  zip_code: '',
  country: '',
  print_advertising_advertorial_inserts: false,
  digital_advertising_sponsored_posts: false,
  vendor_and_venue_directory_listings: false,
  request_editors_circle_membership: false,
  other: false
})

// Validation rules
const rules = {
  name: { required },
  company_name: { required },
  category: { required },
  phone_number: { required },
  email: { required, email },
  website: { url }
}
const v$ = useVuelidate(rules, form)

// State flags
const loading = ref(false)
const error = ref(false)
const success = ref(false)

// Vendor categories (fetch on mount)
const vendorCategories = ref([])

async function loadVendorCategories() {
  const { data } = await $fetch('/api/vendor_categories?fields=*')
  vendorCategories.value = data
}

onMounted(loadVendorCategories)

// Submit handler
async function submitForm() {
  v$.$touch()
  if (v$.$invalid) {
    document.querySelector('.with-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  loading.value = true
  error.value = false
  success.value = false

  try {
    const payload = { ...form, category: form.category.value }
    await $fetch('/api/advertise_contact', {
      method: 'POST',
      body: payload
    })
    success.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

</script>

<style scoped lang="scss">
//// @import "~/assets/styles/partials";

p, a {
    font-size: .75rem !important;
}

.select-drop-down {
    z-index: 10;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    border: none;
    @include medium-and-large-screens {
       flex: 0 1 calc(50% - 0.45rem);
    }

}

.button:hover {
    color: white;
    background-color: #000;
}


</style>
