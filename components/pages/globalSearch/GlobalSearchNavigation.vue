<template>
  <ul class="list">
    <!-- You can wrap this in <ClientOnly> if conditionally rendered -->
    <li class="list-item no-margin">IN:</li>

    <li class="list-item">
      <NuxtLink
        class="link"
        :class="{ 'active-link': !categoryParam }"
        :to="getCategoryLink()"
        @click="onFilter"
      >
        All
      </NuxtLink>
    </li>

    <li class="list-item">
      <NuxtLink
        class="link"
        :class="{ 'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.WEDDINGS }"
        :to="getCategoryLink('weddings')"
        @click="onFilter"
      >
        Real weddings
      </NuxtLink>
    </li>

    <li class="list-item">
      <NuxtLink
        class="link"
        :class="{ 'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.NEWS }"
        :to="getCategoryLink('news')"
        @click="onFilter"
      >
        News
      </NuxtLink>
    </li>

    <li class="list-item">
      <NuxtLink
        class="link"
        :class="{ 'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.VENDORS }"
        :to="getCategoryLink('vendors')"
        @click="onFilter"
      >
        Venues & Vendors
      </NuxtLink>
    </li>

    <li class="list-item">
      <NuxtLink
        class="link"
        :class="{ 'active-link': categoryParam === GLOBAL_SEARCH_PAGE_CATEGORIES.GALLERIES }"
        :to="getCategoryLink('galleries')"
        @click="onFilter"
      >
        Photo Galleries
      </NuxtLink>
    </li>

    <li class="list-item total-count" v-if="totalCount">
      {{ totalCount }} Results
    </li>
  </ul>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import GLOBAL_SEARCH_PAGE_CATEGORIES from '~/constants/globalSearchPageCategories'

defineProps({
  totalCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['filter'])

const route = useRoute()

const categoryParam = computed(() => route.query.category)

function getCategoryLink(category) {
  const query = { ...route.query }
  const name = 'global_search' // replace with your actual named route if necessary

  if (category) {
    query.category = category
  } else {
    delete query.category
  }

  return {
    name,
    query
  }
}

function onFilter() {
  emit('filter')
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.list {
  display: flex;
  list-style: none;
  flex: 1 1 100%;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  justify-content: center;

  @include medium-and-large-screens {
    justify-content: flex-start;
  }
}

.list-item {
  @include apply-font-and-size("label", 13);
  letter-spacing: 0.1rem;
  font-weight: 100;
  text-transform: uppercase;
  margin: 1.5rem 0 0 0.75rem;

  @include medium-and-large-screens {
    margin-left: 2rem;
  }

  &.no-margin {
    margin-left: 0;
  }
}

.link {
  @include apply-font-and-size("link", 13);
}

.total-count {
  display: flex;
  justify-content: center;
  text-align: center;
  flex: 1 1 100%;
  text-transform: uppercase;

  @include medium-and-large-screens {
    justify-content: flex-end;
    flex: 1 1 auto;
  }
}

.active-link {
  text-decoration: underline;
  pointer-events: none;
}
</style>
