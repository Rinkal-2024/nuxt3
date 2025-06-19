<template>
    <PageSection
        :subtitle="subtitle"
        :title="title"
        class="latest-news-container"
    >
        <div class="latest-news">

            <div class="latest-news__news-wrapper">
               <LatestWeddingNewsCategories
                    :categories="categories"
                />

                <LatestWeddingNewsList 
                    v-for="articleList in articles" 
                    :key="articleList.id"
                    :id="getDivId(articleList.id)"
                    :visible="articleList.id === 1"
                    :articles="articleList.articles"
                    with-button
                />
            </div>
        </div>
    </PageSection>
</template>

<script setup>
import { useState } from 'nuxt3' // Using useState instead of Vuex
import { ref, computed } from 'vue'

// Reactive variables
const title = ref('Latest Wedding News')
const subtitle = ref('Expert wedding planning tips & inspiration')

// Replace Vuex with Nuxt 3's `useState` for state management
const articles = useState('articles', () => [])
const categories = useState('categories', () => [])

// Compute categoryLink (if needed)
const categoryLink = computed(() => {
    return `${linkTo.value}/${currentCategory.value.slug}/`
})

// Method to generate div ID
const getDivId = (id) => `category-${id}-articles`
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.latest-news {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1 100%;

    .latest-news__news-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 1rem;

        @include medium-and-large-screens {
            flex-direction: row;
        }
    }
}

.latest-news-container {
    ::v-deep {

        @include small-and-medium-screens {
            .body.body {
                margin-top: 0;
                padding-top: 10px;
            }
        }
    }
}

</style>
