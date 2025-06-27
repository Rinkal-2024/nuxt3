<template>
  <div class="news-categories">
    <Button
      v-for="category in categories"
      :key="category.id"
      :data-id="category.id"
      class="news-categories__btn"
      :class="{ selected: category.id === 1 }"
      :name="category.name"
    >
      {{ category.name }}
    </Button>
  </div>
</template>

<script setup>
import Button from '~/components/generic/Button/Button.vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">

.news-categories {
    display: flex;
    align-items: flex-start;
    margin-right: 1.25rem;
    flex-wrap: wrap;
    flex: 1 1 100%;
    justify-content: center;
    width: 100%;

    @include medium-and-large-screens {
        flex: 0 0 8.8rem;
        width: inherit;
        border-right: $input-border-size solid $color-grey;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
    }

    button:first-child {
        margin-top: 0;
    }

    .news-categories__btn {
        flex: 1 1 100%;
        margin: 0.3rem 0 0 0;
        padding: 0.4rem 0.5rem;
        background-color: transparent;
        border: none;
        color: $color-black;
        text-align: center;
        @include apply-font-and-size("link", 5);
        &.selected {
            color: $color-white;
            background-color: $color-black;
            cursor: default;
            text-decoration: none;
        }

        @include medium-and-large-screens {
            padding: 0.3rem 0.5rem;
            margin: 2.25rem 0 0 0;
            text-align: left;
            @include apply-font-and-size("link", 7);
        }
    }
}
</style>
