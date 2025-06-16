<template>
    <div>
        <WeddingDataItems
            v-if="display"
            class="wedding-data-items"
            title="Wedding Resources"
        >
            <WeddingDataItem
                v-for="item in items"
                :key="item.label"
                :label="item.label"
            >
                <template v-for="(vendorItem, index) in item.items">
                    <span :key="index" v-if="vendorItem.vendor" >
                        <LinkRaw
                            v-if="vendorItem.vendor.website && vendorItem.vendor.should_show_link"
                            :href="vendorItem.vendor.website"
                            class="vendor-link paid"
                            rel="noopener"
                            target="_blank"
                        >
                            {{ vendorItem.vendor.name.trim() }}
                            <span
                                v-if="vendorItem.description"
                                class="vendor-link__description"
                            >
                                ({{ vendorItem.description }})
                            </span>
                        </LinkRaw>
                        <span v-else class="vendor-link unpaid">
                            {{ vendorItem.vendor.name.trim() }}
                            <span
                                v-if="vendorItem.description"
                                class="vendor-link__description"
                            >
                                ({{ vendorItem.description }})
                            </span>
                        </span>
                    </span>
                </template>
            </WeddingDataItem>
        </WeddingDataItems>
    </div>
</template>

<script>
export default {
    name: 'WeddingResources',
    computed: {
        items() {
            return this.$store.getters['api/weddingsArticle/resources']
        },
        display() {
            return this.items.length > 0
        }
    }
}
</script>

<style lang="scss" scoped>

.wedding-data-items {
    ::v-deep {
        .separator {
            margin-bottom: 0.3rem;
        }
    }

    .vendor-link {
        display: block;
        margin-bottom: 0.25rem;
        text-transform: uppercase;
        font-size: 0.65rem;
        line-height: 0.9rem;

        &__description {
            color: $color-darker-grey;
            font-weight: normal;
        }

        &.paid {
            text-decoration: underline;
        }
    }
}

</style>
