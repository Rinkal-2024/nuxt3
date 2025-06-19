<template>
  <div class="copyright-description">
    <div class="company">© {{ currentYear }} INSIDE WEDDINGS</div>
    <div class="tos-links">
      <Link rel="nofollow" to="/terms-of-use" class="terms-of-use">
        TERMS OF USE
      </Link>
      <Link rel="nofollow" to="/privacy-policy"> PRIVACY POLICY</Link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.copyright-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;

  div {
    display: flex;
  }

  .tos-links {
    > *:not(:last-child) {
      border-right: 1px solid $color-dark-grey;
    }

    > * {
      padding: 0 0.5rem;
    }
  }

  a,
  .company {
    @include apply-font-and-size("link", 5);
    @include medium-and-large-screens {
      @include apply-font-and-size("link", 7);
    }
    color: $color-dark-grey;
  }

  @include medium-and-large-screens {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 100%;
    text-align: left;
  }
}
</style>
