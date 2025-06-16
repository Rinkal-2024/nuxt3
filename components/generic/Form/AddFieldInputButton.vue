<template>
    <Button @click="onClick" class="add-field-input-button">
        {{ label }} <span class="plus-sign">+</span>
    </Button>
</template>

<script>
export default {
    name: "AddFieldInputButton",
    props: {
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    },
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.add-field-input-button {
    border: $input-border-size solid $input-border-color;
    background-color: $color-darker-white;
    color: $input-text-color;
    box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;
    letter-spacing: 0.1rem;
    height: 2.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

&:hover {
     background-color: $color-darker-white;
     text-decoration: none;
     border: $input-border-size solid $input-border-color;
 }

@include medium-and-large-screens {
    width: calc(50% - 0.45rem);
}
}

.plus-sign {
    font-size: 1rem;
    padding-left: 1rem;
}

</style>
