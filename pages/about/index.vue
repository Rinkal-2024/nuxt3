<script setup lang="ts">
import { useHead } from '#imports'
import { useFetch, useRoute } from '#app'
import { createParamsString, getMetaUri, requestData } from '~/utils/api'
import HtmlView from '@/components/generic/HtmlView/HtmlView.vue'
import PageSection from '@/components/generic/PageSection/PageSection.vue'

// Replace this with your actual data composable or pinia store
const route = useRoute()
const params = { fields: '*' }
const paramsParsed = createParamsString(params)

const { data: response } = await useAsyncData('about', async () => {
  const metaUri = getMetaUri(undefined, route)
  const dataUri = `flat_pages/about/${paramsParsed}`
  const [meta, data] = await requestData($fetch, metaUri, dataUri)

  // This is where you'd store in Pinia if you're using it
  return { meta, data }
})

const title = response.value?.data?.title ?? ''
const body = response.value?.data?.body ?? ''

useHead({
  title: title,
  meta: [
    {
      name: 'description',
      content: 'About Inside Weddings – your stylish wedding resource',
    },
  ],
})
</script>

<template>
  <PageSection title-tag="h1" :title="title" without-vertical-margins class="about-page">
    <div class="about-page-content">
      <div class="about-page-content-column-left">
        Inside Weddings is a premier wedding resource for the stylish and
        sophisticated bride and groom. With a quarterly print magazine known
        for featuring more pages of Real Weddings than any publication in
        the industry and an interactive website that's continually updated
        with resources, wedding inspiration, and the latest nuptial news,
        Inside Weddings is truly the insider's guide to weddings with style.
      </div>
      <div class="about-page-content-column-right">
        <HtmlView :html="body" />
      </div>
    </div>
  </PageSection>
</template>

<style scoped lang="scss">
// If you're using Vite injection, make sure your config loads the mixins
// Otherwise, uncomment and manually import them
// @use '~/assets/styles/partials/mixins/responsiveness.scss' as *;
// @use '~/assets/styles/partials/mixins/fontsAndTexts.scss' as *;

.about-page-image {
  width: 100%;
}

.about-page.about-page {
  margin-top: 2rem;

  @include small-and-medium-screens {
    margin-top: 5rem;
  }
}

.about-page-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 1;

  @include medium-and-large-screens {
    flex-wrap: nowrap;
  }

  @include apply-font-and-size("paragraph", 3);

  .about-page-content-column-left {
    margin: 3.75%;
    font-style: italic;
    @include apply-font-and-size("paragraph", 4);
    line-height: 1.5rem;

    @include medium-and-large-screens {
      flex: 1;
      justify-content: space-around;
    }
  }

  .about-page-content-column-right {
    margin: 3.75%;

    ::v-deep(.html-view p) {
      font-size: 0.95rem !important;
      line-height: 1.7rem;
      color: #222;
      -webkit-font-smoothing: antialiased;
    }

    @include medium-and-large-screens {
      flex: 2;
      width: 70%;
      margin-right: 20%;
    }
  }
}
</style>
