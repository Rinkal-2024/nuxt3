<template>
    <div class="website-header__contents--mobile">
        <TheHeaderMobileSidebar/>
        <TheHeaderMobileLogo class="logo"/>
        <TheHeaderMobileSearchToggle @toggle="toggleSearch" class="search-toggle"/>
        <TheHeaderMobileSearch ref="search" v-show="isSearchVisible" @hide="hideSearch"/>
    </div>
</template>

<script>
export default {
    name: 'TheHeaderMobile',
    data: () => ({
        isSearchVisible: false
    }),
    methods: {
        toggleSearch() {
            this.isSearchVisible = !this.isSearchVisible
            if(this.isSearchVisible) {
                this.focusInput()
            }
        },
        hideSearch() {
            this.isSearchVisible = false
        },
        focusInput() {
            this.$nextTick(() => {
                this.$refs.search.focusInput()
            })
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

// .website-header__container {
//     width: 100%;
//     max-width: 1440px;
//     margin-right: auto;
//     margin-left: auto;
//     padding-left: 1rem;
//     padding-right: 1rem;
//     background: #fff;
// }

// .website-header__contents--mobile {
//     padding: 0 1rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-wrap: wrap;
//     background-color: $color-white;
//     @include medium-and-large-screens {
//         display: none;
//     }
// }

// .logo {
//     height: 3rem;
// }

</style>
