<template>
    <div class="array-field">
        <RemoveFieldInputButton class="remove-vendor" v-if="withRemoveFieldInputButton" @click="remove"/>
        <div class="fields" :class="{'full-width': fullWidth}">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArrayField",
    props: {
        withRemoveFieldInputButton: {type: Boolean, default: false},
        fullWidth: {type: Boolean, default: false}
    },
    methods: {
        remove() {
            this.$emit('remove')
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.array-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1 1 100%;
}

.fields {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 100%;

    & + & {
        margin-top: 1rem;
    }

    &:not(.full-width) {
        @include medium-and-large-screens {
            justify-content: space-between;
            & > * {
                flex-basis: calc(50% - 0.45rem);
            }
        }
    }
}

</style>
