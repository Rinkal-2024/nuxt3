<template>
    <div class="photo-grid-list" id="real-wedding-grid">
        <template v-for="(item, index) in itemsWithAdSlots">
            <WeddingsPhotoGridListItem
                v-if="item"
                :key="item.id"
                :category="item.category"
                :images="item.images"
                :link-to="getWeddingPath(item)"
                :title="item.title"
            />
            <template v-else>
                    <AdUnit
                        :key="index"
                        ad-slot-name="weddingsPhotoGrid"
                        class="ad-margin"
                    />
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'WeddingsPhotoGridList',
    props: {
        items: {
            type: Array,
            default: () => []
        },
        adSlotEvery: {
            type: Number,
            default: 6
        }
    },
    computed: {
        count() {
            return this.items.length
        },
        adsToBeInserted() {
            return Math.ceil(this.count / this.adSlotEvery)
        },
        itemsWithAdSlots() {
            let items = []
            let slotIndex = 0

            for (; slotIndex < this.items.length; slotIndex += this.adSlotEvery) {
                items = [
                    ...items,
                    ...this.items.slice(slotIndex, slotIndex + this.adSlotEvery),
                    null
                ]
            }

            return items
        }
    },
    methods: {
        getWeddingPath(item) {
            if (!this.$isAMP) {
                return item.linkTo
            }
            const basePath = this.$router.resolve(item.linkTo).href
            return `/amp${basePath}`
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.photo-grid-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    @include medium-and-large-screens {
        margin-top: 0.5rem;
    }

    .ad-margin {
        margin: 1rem 0.25rem 0 0.25rem;
    }
}

</style>
