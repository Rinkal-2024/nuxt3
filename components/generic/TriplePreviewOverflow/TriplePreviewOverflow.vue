<template>
  <Cards class="cards triple-preview-overflow">
    <slot />
  </Cards>
</template>

<script setup lang="ts">
import Cards from '../Cards/Cards.vue';

defineOptions({
  name: 'TriplePreviewSectionOverflow'
})
</script>


<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.cards {
    @include medium-and-large-screens {
        margin-top: 1rem;
    }
}

::v-deep .card {
    margin-top: 1rem;

    &:hover {
        .content {
            top: -1rem;
        }
    }
}

</style>
