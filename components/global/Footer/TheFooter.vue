<template>
  <footer class="footer">
    <PageLayoutMargin>
      <div class="footer__content-container">
        <TheFooterCopyrightDescription />
        <TheFooterNavigation />
        <SocialLinks class="footer__social-links" lightIcons />
      </div>
    </PageLayoutMargin>
  </footer>
</template>

<script setup>
// No extra script logic needed here for now
</script>

<style scoped lang="scss">
@use '../../../assets/styles/partials/config/colors.scss' as *;
@use '../../../assets/styles/partials/config/zIndexes.scss' as *;
.footer {
  background-color: $color-black;
  z-index: $footer-z-index;
  margin-top: 1.5rem;
  // border-top: $border-width solid $color-white;

  @include medium-and-large-screens {
    margin-top: 3rem;
  }
}

// .footer__content-container {
//   display: flex;
//   flex-direction: column-reverse;
//   align-items: center;

//   padding: 0.8rem 0;

//   @include medium-and-large-screens {
//     display: flex;
//     justify-content: space-between;
//     flex-direction: row;
//     & > * {
//       flex: 1 1 100%;
//     }
//   }
// }

// .footer__social-links {
//   justify-content: flex-end;

//   ::v-deep img {
//     @include apply-svg-size(1.5rem);
//     margin: 0.5rem;

//     @include medium-and-large-screens {
//       @include apply-svg-size(inhreit);
//       margin: 0;
//     }
//   }
// }
</style>
