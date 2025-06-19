<template>
  <nav class="nav">
    <div class="support-and-subscribe">
      <span class="link support">Support</span>
      <a
        href="https://www.simplecirc.com/subscribe/inside-weddings"
        class="link"
        target="_blank"
      >
        <span class="link">Subscribe</span>
      </a>
    </div>
    <div class="support-and-subscribe">
      <a
        href="https://www.simplecirc.com/shop/inside-weddings"
        class="link"
        target="_blank"
      >
        <span class="link order_iw_cl">ORDER IW</span>
      </a>
      <NuxtLink to="/advertise"><span class="link">ADVERTISE</span></NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const openNewsletterPopup = () => {
  // In Nuxt 3, you use the Pinia store or composables instead of `this.$store`
  // Example if you're using Pinia:
  // const globalStore = useGlobalStore()
  // globalStore.openNewsletterModal()

  // Placeholder for real implementation
  console.log('Open newsletter popup')
}
</script>

<style scoped lang="scss">
@use '../../../../../assets/styles/partials.scss' as *;
@use '../../../../../assets/styles/partials/mixins.scss' as *;

.separator {
  @include apply-font-and-size("link", 6);
}

.nav {
  line-height: 0;
}

.link {
  font-weight: 100;
  color: $color-black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @include apply-font-and-size("link", 6);
  text-transform: uppercase;
}

.support-and-subscribe {
  display: flex;

  .support {
    margin-right: 0;

    &:after {
      display: inline-block;
      padding: 0 0.2rem;
      content: "|";
    }
  }

  .order_iw_cl {
    margin-right: 0;

    &:after {
      display: inline-block;
      padding: 0 0.2rem;
      content: "|";
    }
  }
}
</style>
