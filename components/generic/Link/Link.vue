<template>
  <NuxtLink
    :class="{ 'without-styles': withoutStyles, 'with-styles': !withoutStyles }"
    :to="linkTo"
    @click="onClick"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute, useNuxtApp } from '#imports'

interface LinkProps {
  to: string | Record<string, any>
  withoutStyles?: boolean
  forceRefresh?: boolean
  forceNoAmp?: boolean
}

const props = defineProps<LinkProps>()

const router = useRouter()
const nuxtApp = useNuxtApp()

const isAmp = nuxtApp.$isAMP || false // fallback if not defined

const linkTo = computed(() => {
  if (typeof props.to === 'object') {
    const path = router.resolve(props.to).href
    return isAmp && !props.forceNoAmp ? `/amp${path}` : path
  }
  let path = props.to.endsWith('/') ? props.to : `${props.to}/`
  path = path.startsWith('/') ? path : `/${path}` // ensure correct url
  return isAmp && !props.forceNoAmp ? `/amp${path}` : path
})

function onClick() {
  if (props.forceRefresh) {
    setTimeout(() => {
      nuxtApp.$nuxt?.refresh?.()
    }, 0)
  }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.without-styles {
  text-decoration: none;
  color: $color-black;

  &:hover {
    text-decoration: underline;
  }
}

.with-styles {
  font-weight: 100;
  color: $color-black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @include apply-font-and-size("link", 6);
  text-transform: uppercase;
}
</style>
