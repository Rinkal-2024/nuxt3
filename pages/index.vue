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
import HomePageWeddingsCarousel from "~/components/pages/home/HomePageWeddingsCarousel.vue";
import { useWeddingsCarouselStore } from "~/store/home/weddingsCarousel";
import { useHomeNewRealWeddingsStore } from "~/store/home/newRealWeddings";
import { useHomeWeddingInspirationStore } from "~/store/home/weddingInspiration";
import BuildYourWeddingTeam from "~/components/shared/sections/BuildYourWeddingTeam/BuildYourWeddingTeam.vue";
import { useBuildYourWeddingTeamStore } from "~/store/shared/buildYourWeddingTeam";
import { useGetToKnowStore } from "~/store/shared/getToKnow";
import { useHomeLocationsWeLoveStore } from "~/store/home/locationsWeLove";
import { useHomeHoneymoonsWidgetStore } from "~/store/home/honeymoonsWidget";


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
const weddingsCarouselStore = useWeddingsCarouselStore()
const newRealWeddingsStore = useHomeNewRealWeddingsStore()
const newWeddingInspirationStore = useHomeWeddingInspirationStore();
const newBuildYourWeddingTeamStore = useBuildYourWeddingTeamStore();
const getToKnowStore = useGetToKnowStore();
const locationsWeLove = useHomeLocationsWeLoveStore();
const newHoneymoonsWidgetStore = useHomeHoneymoonsWidgetStore();

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
    console.log("Home page" , fetchedData.value)
  }
  newsCarouselStore.hydrate(fetchedData.value.items?.[0]?.news_carousel || []);
  latestNewsStore.hydrate(fetchedData.value.items?.[0]?.latest_news || []);
  weddingsCarouselStore.hydrate(fetchedData.value.items?.[0]?.weddings_carousel || [])
  newRealWeddingsStore.hydrate(fetchedData.value.items?.[0]?.new_weddings || [])
  newWeddingInspirationStore.hydrate(fetchedData.value.items?.[0]?.gallery_categories || []);
  newBuildYourWeddingTeamStore.hydrate(fetchedData.value.items?.[0]?.vendor_categories || []);
  getToKnowStore.hydrate(fetchedData.value.items?.[0]?.vendor_widget || []);
  locationsWeLove.hydrate(fetchedData.value.items?.[0].location_widget || []);
  newHoneymoonsWidgetStore.hydrate(fetchedData.value.items[0].honeymoon_widget || [])

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
    <HomePageNewsCarousel v-if="homePageCarouselItems.length" />
    <HomePageLatestWeddingNews />
    <LazyHomePageWeddingsCarousel />
    <LazyHomePageNewRealWeddings />
    <LazyPageSectionSeparator />
    <LazyHomePageWeddingInspiration />
    <LazyBuildYourWeddingTeam />
    <LazyGetToKnowSection />
    <LazyPageSectionSeparator />
    <LazyLocationsWeLove />
    <LazyPageSectionSeparator />
    <LazyHomePageHoneymoonsDestination />
    <LazyPageSectionSeparator />
    <LazyHomePageWebsiteDescription />
  </div>
</template>

