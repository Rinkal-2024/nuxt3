<template>
  <div class="vendor-page">
    <Breadcrumbs />
    <PageSection
      :description="landingPageIntroduction"
      :description-as-html="introductionIsHtml"
      :title="landingPageTitle"
      class="find-local-vendors-section"
      titleTag="h1"
      withoutVerticalMargins
    >
      <h2 class="title">Find Local Wedding Vendors</h2>
      <div class="search-form-bordered">
        <VendorSearchForm :categories="categories" />
        <InvitationToBusiness />
      </div>
    </PageSection>

    <PageSection
      class="wedding-vendor-category-carousel"
      subtitle="Easily find a professional vendor or services for your upcoming wedding"
      subtitleTag="p"
      title="Wedding Vendor Categories"
      withBackground
      without-top-body-margin
    >
      <CategoryCarousel
        :categories="categories"
        urlPrefix="/vendor/search/category/"
        linkToLabel="View vendors"
      />
    </PageSection>

    <PageSection
      subtitle="The best in the industry, their work reflects a commitment to creativity and excellence."
      title="We Highly Recommend"
    >
      <VendorsList
        :loading="loading"
        :page="currentVendorPage"
        :vendors="vendors"
        :with-load-more-button="hasMoreVendors"
        vendorLoadMoreId="top-vendors-load-more"
        @loadMore="loadMoreVendors"
      />
      <template v-if="!$isAMP">
        <AccordionText
          v-show="landingPageDescription"
          :html="landingPageDescription"
          class="description"
          low-profile
        />
      </template>
    </PageSection>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVendorStore } from '~/store/api/vendor'
import { getMetaUri, requestData, createParamsString } from '~/utils/api'
import { processAdsOnPage } from '~/utils/adapex'

// Pinia store
const vendorStore = useVendorStore()

// Reactive state
const currentVendorPage = ref(1)
const loading = ref(false)
const hasMoreVendors = ref(true)

// Get data from the store
const categories = computed(() => vendorStore.categories)
const vendors = computed(() => vendorStore.vendors)
const landingPageTitle = computed(() => vendorStore.landingPageTitle)
const landingPageSubtitle = computed(() => vendorStore.landingPageSubtitle)
const landingPageIntroduction = computed(() => vendorStore.landingPageIntroduction)
const landingPageDescription = computed(() => vendorStore.landingPageDescription)

// Computed to check if introduction is HTML
const introductionIsHtml = computed(() => Array.isArray(landingPageIntroduction.value))

// Fetch vendors using asyncData equivalent
onMounted(async () => {
  const route = useRoute()
  const params = {
    fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
    isPaid: true,
    limit: 15,
    membership__account_type: 'TOP_LEVEL',
    sections: ['vendors-categories'],
  }

  const page = route.query.page || 1
  params.offset = (page - 1) * 15
  const paramsParsed = createParamsString(params)

  const [meta, data, info] = await requestData(
    useHttp(),
    getMetaUri(route),
    `vendors/${paramsParsed}`,
    'vendors_landing_page'
  )

  // If no vendors found on this page, redirect
  if (page > 1 && data.items.length === 0) {
    useRouter().push('/vendor/')
  }

  data.info = info
  await vendorStore.hydrate({ meta, data })
})

// Load more vendors when called
const loadMoreVendors = async () => {
  loading.value = true
  const exclude = vendors.value.map(v => v.id).join(',')
  const params = {
    fields: 'id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary',
    isPaid: true,
    limit: 15,
    exclude,
    order: 'random',
  }
  const paramsParsed = createParamsString(params)

  const newVendors = await useHttp().$get(`vendors/${paramsParsed}`)
  newVendors.items = newVendors.items.filter(v => ['TOP_LEVEL', 'MEDIUM_LEVEL'].includes(v.membership.account_type))

  if (newVendors.items.length) {
    await vendorStore.addVendors(newVendors.items)
  } else {
    hasMoreVendors.value = false
  }

  loading.value = false
}

// Head management for SEO
useHead(vendorStore.head)
</script>

<style scoped lang="scss">
/* Your styles here */
</style>