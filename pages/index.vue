<script setup>
import { useAsyncData, useHead, useNuxtApp, useRoute } from '#app'
import { useStore } from '@/store/config' 
import { getMetaUri, requestData } from '~/utils/api'
import { getImageSrcSet, getImageSizes } from '~/utils/imgSrcSet'

// Store and app context
const store = useStore()
const route = useRoute()
const nuxtApp = useNuxtApp()

// Fetch data
const { data: homepageData } = await useAsyncData('home', async () => {
  const [meta, data] = await requestData(nuxtApp.$http, getMetaUri(nuxtApp.ssrContext?.req, route), 'home/?fields=*')
  await store.api.home.hydrate({ meta, data })
  return { meta, data }
})

// Computed for carousel
const homePageCarouselItems = computed(() => store.home.newsCarousel.items)

// SEO and preload main image
const headData = store.api.home.head
const mainImage = homePageCarouselItems.value?.[0]?.image

useHead({
  ...headData,
  script: [
    ...(headData.script || []),
    {
      type: 'application/ld+json',
      children: JSON.stringify(store.api.home.structuredData)
    }
  ],
  link: mainImage
    ? [
        {
          rel: 'preload',
          fetchpriority: 'high',
          as: 'image',
          imagesrcset: getImageSrcSet(mainImage),
          imagesizes: getImageSizes(100)
        },
        ...(headData.link || [])
      ]
    : headData.link
})
</script>

<template>
  <div>
    <ClientOnly>
      <HomePageNewsCarousel v-if="!$isAMP" />
    </ClientOnly>

    <template v-if="$isAMP">
      <amp-carousel
        id="home-page-news-carousel"
        height="320"
        layout="fixed-height"
        loop
        on="slideChange:carousel-dots.toggle(index=event.index, value=true)"
        type="slides"
      >
        <CarouselItem
          v-for="(item, index) in homePageCarouselItems"
          :key="item.id"
          :amp-photo-height="320"
          :image="item.image"
          :lazy="index > 1"
          :subtitle="item.subtitle"
          :title="item.title"
          :to="item.linkTo"
          with-photo-credits-position="topRight"
        />
      </amp-carousel>

      <amp-selector
        id="carousel-dots"
        class="carousel-dots"
        layout="container"
        on="select:home-page-news-carousel.goToSlide(index=event.targetOption)"
      >
        <button
          v-for="(_, index) in homePageCarouselItems"
          :key="index"
          :id="`dot--${index}`"
          :option="index"
          :selected="index === 0"
        />
      </amp-selector>
    </template>

    <HomePageLatestWeddingNews />
    <HomePageWeddingsCarousel />

    <Suspense>
      <LazyHomePageNewRealWeddings />
    </Suspense>

    <LazyPageSectionSeparator />
    <Suspense>
      <LazyHomePageWeddingInspiration />
    </Suspense>

    <ClientOnly>
      <BuildYourWeddingTeam v-if="!$isAMP" />
    </ClientOnly>

    <Suspense>
      <LazyGetToKnowSection />
    </Suspense>

    <LazyPageSectionSeparator />
    <Suspense>
      <LazyLocationsWeLove />
    </Suspense>

    <LazyPageSectionSeparator />
    <Suspense>
      <LazyHomePageHoneymoonsDestination />
    </Suspense>

    <LazyPageSectionSeparator />
    <LazyHomePageWebsiteDescription />
  </div>
</template>
