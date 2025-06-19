<template>
  <PageSection
    :title="title"
    without-vertical-margins
    class="search-section"
  >
    <GalleriesFiltersForm
      :colors="colors"
      :initialValue="initialValue"
    />
    <!-- <MobileView>
      <PageSectionSeparator/>
    </MobileView> -->
  </PageSection>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  initialValue: {
    type: Object,
    default: () => ({})
  }
})

const store = useStore()

// Getters
const colors = computed(() => store.getters['api/galleries/colors'])
const categories = computed(() => store.getters['api/galleries/categories'])
const images = computed(() => store.getters['api/galleries/images'])
const totalPages = computed(() => store.getters['api/galleries/totalPages'])
const isMobile = computed(() => store.getters['global/config/isMobile'])

// Computed properties
const isFullWidth = computed(() => isMobile.value)
const title = computed(() => (isMobile.value ? 'Find Inspiration' : ''))
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.search-section {
  display: flex;
  flex-direction: column;

  @include medium-and-large-screens {
    margin-top: 0;
    display: flex;
    flex-direction: row;
  }
}
</style>
