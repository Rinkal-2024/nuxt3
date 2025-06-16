<template>
    <div class="collapsible-panel">
        <div class="collapsible-panel__header">
            <Link :to="titleLinkTo" class="header__link">
                {{ title }}
            </Link>
            <button
                    @click="toggle"
                    class="header__toggle"
                    :class="{ 'is-collapsed': isCollapsed }"
                    aria-label="Menu toggle"
            />
        </div>
        <div class="collapsible-panel__body" :class="{ 'is-collapsed': isCollapsed }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CollapsiblePanel',
    props: ['titleLinkTo', 'title'],
    data: () => ({
        isCollapsed: true
    }),
    methods: {
        toggle() {
            this.isCollapsed = !this.isCollapsed
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.collapsible-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.5rem 0;
}

.collapsible-panel__header {
    display: flex;
    flex: 1 1 100%;
    justify-content: space-between;
    cursor: pointer;
}

.header__toggle {
    @include button-as-normal-text;
    display: flex;
    align-items: center;

    &:not(.is-collapsed):after {
        transform: rotate(180deg);
        top: -0.25rem;
    }

    &:after {
        position: relative;
        content: " ";
        width: 0;
        height: 0;

        border: solid 0.25rem transparent;
        border-top-color: $color-black;

        pointer-events: none;
    }
}

.header__link {
    @include apply-font-and-size("heading", 3);
    color: $color-black;
    margin: 0;
}

.collapsible-panel__body {
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    background-color: $color-white;
    margin-top: 0.25rem;
    padding: 1.15rem 1.5rem;

    &.is-collapsed {
        visibility: hidden;
        height: 0;
        max-height: 0;
        padding: 0;
    }
}

</style>
