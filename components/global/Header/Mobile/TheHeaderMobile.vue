<template>
  <div class="website-header__contents--mobile">
    <TheHeaderMobileSidebar />
    <TheHeaderMobileLogo class="logo" />
    <TheHeaderMobileSearchToggle @toggle="toggleSearch" class="search-toggle" />
    <TheHeaderMobileSearchToggle
      ref="search"
      v-show="isSearchVisible"
      @hide="hideSearch"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import TheHeaderMobileSidebar from './TheHeaderMobileSidebar.vue'
import TheHeaderMobileLogo from './TheHeaderMobileLogo.vue'
import TheHeaderMobileSearchToggle from './TheHeaderMobileSearchToggle.vue'

const isSearchVisible = ref(false)
const search = ref(null)

function toggleSearch() {
  isSearchVisible.value = !isSearchVisible.value
  if (isSearchVisible.value) {
    focusInput()
  }
}

function hideSearch() {
  isSearchVisible.value = false
}

function focusInput() {
  nextTick(() => {
    search.value?.focusInput()
  })
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.website-header__container {
  width: 100%;
  max-width: 1440px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  background: #fff;
}

.website-header__contents--mobile {
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: $color-white;
  @include medium-and-large-screens {
    display: none;
  }
}

.logo {
  height: 3rem;
}
</style>
