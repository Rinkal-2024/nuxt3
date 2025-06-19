<template>
    <PageSection
        with-background
        without-vertical-margins
        class="section-with-background"
    >
        <h1 class="search-results-title">
            Search results for:
            <span class="search-results-value">
                {{ globalSearchFieldValue }}
            </span>
        </h1>
        <GlobalSearchNavigation :totalCount="totalCount" @filter="$emit('filter')" />
    </PageSection>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define component props
const props = defineProps({
    globalSearchFieldValue: {
        type: String,
        required: true
    },
    totalCount: {
        type: Number,
        required: true
    }
});

// Define the event emitter (filter event)
const emit = defineEmits(['filter']);
</script>

<style scoped lang="scss">
.section-with-background {
    background-color: $color-white;
    margin-top: 0;
    padding: 1.5rem 0;

    @include medium-and-large-screens {
        background-color: $color-darker-white;
        padding: 2rem 0 1.5rem 0;
        margin-top: 0;
    }
}

.title {
    font-weight: 600;
}

.search-results-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    @include apply-font-and-size("heading", 2);
    font-style: italic;
    letter-spacing: -0.05rem;
    font-weight: 100;
    word-break: break-word;
    text-align: center;

    @include medium-and-large-screens {
        justify-content: flex-start;
        flex-wrap: wrap;
        text-align: left;
    }
}

.search-results-value {
    margin-left: 0.5rem;
    @include apply-font-and-size("heading", 1);
    font-style: normal;
}
</style>
