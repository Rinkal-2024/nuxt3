<template>
    <li class="menu-item">
        <slot></slot>
    </li>
</template>

<script>
export default {
    name: 'MenuDropdownItem'
}
</script>

<style lang="scss">
// @import "~/assets/styles/partials";

.menu-item {
    display: flex;
    font-weight: 100;

    & > * {
        color: $color-black;
        text-transform: capitalize;
        text-decoration: none;
        padding: 0.3rem 0.25rem;
        flex: 1;
        @include apply-font-and-size("link", 5);
    }

    &:hover {
        cursor: pointer;
        background-color: black;

        & > * {
            color: $color-white;
            &:hover {
                text-decoration: none;
            }
        }
    }
}

.top {
    position: absolute;
    bottom: 100%;
}
</style>
