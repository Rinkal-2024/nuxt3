<script setup>
import { defineAsyncComponent, computed } from "vue";

import { useAsyncData, useRuntimeConfig, useHead } from "#app";

import { useApiHomeStore } from "~/store/api/home";

import { useHomeNewsCarouselStore } from "~/store/home/newsCarousel";

import { getImageSrcSet, getImageSizes } from "~/utils/imgSrcSet";

import HomePageNewsCarousel from "~/components/pages/home/HomePageNewsCarousel.vue";
import CarouselItem from "~/components/generic/Carousel/CarouselItem.vue";
import HomePageLatestWeddingNews from "~/components/pages/home/HomePageLatestWeddingNews/HomePageLatestWeddingNews.vue";
import { useLatestNewsStore } from '~/store/home/latestNews'

// Lazy-loaded components

const LazyHomePageWeddingsCarousel = defineAsyncComponent(() =>
  import("~/components/pages/home/HomePageWeddingsCarousel.vue")
);

const LazyHomePageNewRealWeddings = defineAsyncComponent(() =>
  import("~/components/pages/home/HomePageNewRealWeddings.vue")
);

const LazyHomePageWeddingInspiration = defineAsyncComponent(() =>
  import("~/components/pages/home/HomePageWeddingInspiration.vue")
);

const LazyBuildYourWeddingTeam = defineAsyncComponent(() =>
  import(
    "~/components/shared/sections/BuildYourWeddingTeam/BuildYourWeddingTeam.vue"
  )
);

const LazyGetToKnowSection = defineAsyncComponent(() =>
  import("~/components/shared/sections/GetToKnow/GetToKnowSection.vue")
);

const LazyLocationsWeLove = defineAsyncComponent(() =>
  import("~/components/shared/sections/LocationsWeLove/LocationsWeLove.vue")
);

const LazyHomePageHoneymoonsDestination = defineAsyncComponent(() =>
  import("~/components/pages/home/HomePageHoneymoonsDestination.vue")
);

const LazyPageSectionSeparator = defineAsyncComponent(() =>
  import("~/components/generic/PageSectionSeparator/PageSectionSeparator.vue")
);

const LazyHomePageWebsiteDescription = defineAsyncComponent(() =>
  import("~/components/pages/home/HomePageWebsiteDescription.vue")
);

const config = useRuntimeConfig();

const apiStore = useApiHomeStore();

const newsCarouselStore = useHomeNewsCarouselStore();
const latestNewsStore = useLatestNewsStore()

const { data: fetchedData, error } = await useAsyncData(
  "homeData",
  async () => {
    const response = await fetch(`${config.public.baseUrl}home/?fields=*`);

    if (!response.ok) {
      throw new Error("Failed to fetch home data");
    }

    return response.json();
  }
);

if (fetchedData.value) {
  await apiStore.hydrate({
    meta: null,

    data: {
      items: fetchedData.value,
    },
  });
  if (fetchedData.value) {
    console.log("HOMe page" , fetchedData.value)
  }
  newsCarouselStore.hydrate(fetchedData.value.items?.[0]?.news_carousel || []);
  latestNewsStore.hydrate(fetchedData.value.items?.[0]?.latest_news || []);
  
}
const homePageCarouselItems = computed(() => newsCarouselStore.items);
const head = apiStore.head || {};

head.script ||= [];

head.script.push({
  json: apiStore.structuredData,
  type: "application/ld+json",
});

const mainImage = newsCarouselStore.items?.[0]?.image;

if (mainImage) {
  head.link ||= [];

  head.link.unshift({
    rel: "preload",

    fetchpriority: "high",

    as: "image",

    imagesrcset: getImageSrcSet(mainImage),

    imagesizes: getImageSizes(100),
  });
}


// const { data: latestNewsData } = await useAsyncData('latestNewsData', async () => {
//   const res = await fetch(`${config.public.baseUrl}latest-news/?fields=*`)
//   if (!res.ok) throw new Error('Failed to fetch latest wedding news')
//   return await res.json()
// })

// if (latestNewsData.value) {
//   latestNewsStore.hydrate(latestNewsData.value.items || [])
// }

useHead(head);
</script>

<template>
  <div>
    <ClientOnly>
      <HomePageNewsCarousel />
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
  </div>
</template>
