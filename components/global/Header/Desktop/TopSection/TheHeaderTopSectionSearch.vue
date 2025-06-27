<template>
  <form id="global-search-form" class="global-search-form" @submit.prevent="search">
    <SearchInputWithButton v-model="query" />
  </form>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SearchInputWithButton from '~/components/shared/SearchInputWithButton.vue'

const query = ref('')
const router = useRouter()
const route = useRoute()

const search = async () => {
  const currentRouteName = route.name

  await router.push({
    name: 'global_search',
    query: {
      query: query.value
    }
  })

  if (currentRouteName === 'global_search') {
    await nextTick(() => {
      // Simulates this.$nuxt.refresh() by navigating to the same page
      router.go(0)
    })
  }
}
</script>

<style scoped lang="scss">
.global-search-form {
  flex: 1 1;
  margin-right: 1rem;
  display: flex;
  justify-content: flex-end;
  position: relative;
}
</style>
