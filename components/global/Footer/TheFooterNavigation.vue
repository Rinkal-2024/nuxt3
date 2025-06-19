<template>
  <nav class="footer-navigation">
    <Link to="/about/">About</Link>
    <Link rel="nofollow" to="/advertise/">Advertise</Link>
    <Link to="/contact/">Contact</Link>
    <Link rel="nofollow" to="/wedding/submit/">Submit a Wedding</Link>
    <Link rel="nofollow" to="/work-with-us/">Are You a Business?</Link>
    <span class="link support">Support</span>
  </nav>
</template>

<script setup>
// No reactive state or methods currently used.
// If you want to handle openNewsletterPopup or store, you can import useStore from vuex or pinia and define methods here.
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.footer-navigation {
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .link {
    font-weight: 100;
    color: $color-white;
    text-decoration: none;
    cursor: pointer;
    @include apply-font-and-size("link", 4);
    line-height: 2.25rem;

    @include medium-and-large-screens {
      @include apply-font-and-size("link", 7);
    }
    text-transform: uppercase;
    &:hover {
      text-decoration: underline;
    }
  }

  > a {
    @include apply-font-and-size("link", 4);
    color: $color-white;
    letter-spacing: 0.05rem;
    white-space: nowrap;
    line-height: 2.25rem;
    @include medium-and-large-screens {
      @include apply-font-and-size("link", 7);
    }
  }

  @include medium-and-large-screens {
    margin: 0;
    flex-direction: row;
    > *:not(:last-child) {
      border-right: 1px solid $color-dark-grey;
    }

    > * {
      padding: 0 0.5rem;
    }
  }
}
</style>
