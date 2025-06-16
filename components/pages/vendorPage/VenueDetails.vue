<template>
    <div class="venue-details">
        <div class="list-container">
            <div v-for="item in venueDetails" :key="item.label" class="item-container">
                <div class="item">
                    <Label
                        class="label"
                    >
                        {{ item.label }}
                    </Label>
                    <div class="item-node">{{ item.value }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'VenueDetails',
    computed: {
        ...mapGetters('api/vendorPage', ['venueDetails'])
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.venue-details {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: left;
    margin-top: 1rem;
    border-top: $border-width solid $color-grey;
}

.item {
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;

    @include medium-and-large-screens {
        align-items: flex-start;
        text-align: left;
    }
}

.list-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    @include medium-and-large-screens {
        margin-top: 1rem;
    }
}

.item-container {
    display: flex;
    flex-direction: column;
    flex: 1 1 50%;
    margin: 1rem 0;
    @include medium-and-large-screens {
        flex: 1 1 auto;
        align-items: center;
        max-width: 50%;
        height: 100%;
        margin-top: 0;

        &:first-child {
            align-items: flex-start;
            padding-left: 0;
        }

        & + & {
            border-left: $border-width solid $color-grey;
        }
    }
}

.item-node {
    @include apply-font-and-size("label", 7);
    color: $color-black;
    font-weight: 100;
    letter-spacing: 0.05rem;
    padding: 0.25rem 0.5rem 0.25rem 0;
    text-transform: uppercase;
}

.label {
    margin-top: 0;
}

</style>
