<template>
  <form
    id="gallery-filters-form"
    @submit.prevent="submit"
  >
    <div class="gallery-filters-form__body">
      <ColorsSelector
        :colors="colors"
        @colorsSelectionChanged="colorsSelectionChanged"
      />
      <template v-if="!$isAMP">
        <SelectDropDown
          details-id="gallery-category-details"
          select-class="select-gallery-category"
          :items="sortedCategories"
          placeholder-text="Category"
          all-text="All Categories"
        />
        <div class="search">
          <InputField
            id="gallery-filter-search"
            v-model="text"
            :withFieldError="false"
            class="search-field"
            fullWidth
            name="search"
            placeholder="search"
          />
        </div>
        <Button
          class="submit-btn"
          type="submit"
          variant="outline"
        >
          Submit
        </Button>
      </template>
      <template v-else>
        <div id="category-filter" class="amp-dropdown">
          <button
            class="amp-dropdown__button"
            on="tap:category-filter.toggleClass(class='open')"
          >
            Category
          </button>
          <div class="amp-dropdown__list">
            <Link
              v-for="category in categories"
              :key="category.slug"
              :to="`/inspiration/images/category/${category.slug}`"
            >
              <div class="amp-dropdown__option">
                {{ category.name }}
              </div>
            </Link>
          </div>
          <div
            class="amp-dropdown__backdrop"
            on="tap:category-filter.toggleClass(class='open', force=false)"
            role="button"
            tabindex="1"
          />
        </div>
      </template>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import colors from '~/constants/colors'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  initialValue: {
    type: Object,
    default: () => ({})
  },
  colors: {
    type: Object,
    required: true
  }
})

// Reactive properties
const category = ref(null)
const text = ref(null)
const colorsSelection = ref([])

// Vuex store
const store = useStore()

// Accessing store getters
const categories = computed(() => store.getters['api/galleries/categories'])

// Accessing the route
const route = useRoute()
const router = useRouter()

// Computed property for sorted categories
const sortedCategories = computed(() => {
  return categories.value.sort((a, b) => {
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  })
})

// Computed property for query
const query = computed(() => {
  let query = {}
  if (category.value) query.category = category.value.slug
  if (text.value) query.text = text.value
  if (colorsSelection.value.length) query.colors = colorsSelection.value
  return query
})

// Lifecycle hook to set initial values from the route
onMounted(() => {
  setCategoryFromQuery()
  setTextFromQuery()
})

// Methods
const colorsSelectionChanged = (colorsSelection) => {
  colorsSelection.value = colorsSelection
}

const setCategoryFromQuery = () => {
  const categorySlug = route.query?.category || route.params?.categoryId
  category.value = categories.value.find(c => c.slug === categorySlug)
}

const setTextFromQuery = () => {
  text.value = route.query?.text
}

const submit = () => {
  // No search query
  if (!text.value) {
    // Only category chosen
    if (category.value && colorsSelection.value.length === 0) {
      router.push({
        name: 'inspiration-images-category-categoryId',
        params: {
          categoryId: query.value.category
        }
      })
      return
    }

    // Only one color chosen
    if (!category.value && colorsSelection.value.length === 1) {
      router.push({
        name: 'inspiration-images-color-colorId',
        params: {
          colorId: colors.find(color => color.id === colorsSelection.value[0]).name
        }
      })
      return
    }
  }

  // For search query
  router.push({
    name: 'inspiration-images-search_results',
    query: query.value
  })
}
</script>

<style lang="scss" scoped>
.select-drop-down {
  z-index: 10;
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  border: none;
  margin-top: 1rem;

  @include medium-and-large-screens {
    flex-direction: row;
    border: 1px solid #d6d6d4;
    border-top: 0;
    border-bottom: 0;
    padding: 0 1rem;
    flex: 0 1 16rem;
    min-width: 10rem;
    margin: 0;
  }
}

#gallery-filters-form {
  .gallery-filters-form__body {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1px solid $color-grey;

    @include medium-and-large-screens {
      flex-direction: row;
      align-items: center;
      padding: 0.7rem 0;
    }

    .submit-btn {
      align-self: start;
      height: 2.5rem;
      flex: 1 1 100%;
      width: 100%;
      margin-top: 1rem;

      @include medium-and-large-screens {
        margin-top: 0;
        flex: 1 0 2rem;
        border-color: $input-border-color;
      }
    }

    .search {
      display: flex;
      flex-direction: column;
      flex: 1 1 100%;
      border: none;
      margin-top: 1rem;

      @include medium-and-large-screens {
        flex: 1 1 25%;
        flex-direction: row;
        align-items: center;
        margin-top: 0.6rem;
        width: 100%;
      }

      @include small-and-medium-screens {
        margin-top: 30px;
      }
    }
  }
}

.search-field {
  @include medium-and-large-screens {
    margin: 0 1rem;
    min-width: 6rem;
  }
}
</style>
