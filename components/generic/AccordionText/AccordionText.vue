<template>
  <div>
    <div
      v-if="!isAMP"
      :class="{ expanded }"
      class="accordion-text"
    >
      <template v-if="html">
        <div class="accordion-text__p">
          <p @click="toggleExpanded" v-html="html" />
        </div>
      </template>
      <template v-else>
        <p class="accordion-text__p" @click="toggleExpanded">
          <slot />
        </p>
      </template>
      <Button
        :class="{ lowProfile }"
        :variant="buttonVariant"
        class="accordion-text__btn"
        type="button"
        @click="toggleExpanded"
      >
        {{ buttonText }}
      </Button>
    </div>

    <div
      v-else
      id="accordion-text-container"
      :class="expanded ? 'expanded accordion-text' : 'accordion-text'"
    >
      <template v-if="html">
        <div class="accordion-text__p">
          <p @click="toggleExpanded" v-html="html" />
        </div>
      </template>
      <template v-else>
        <p class="accordion-text__p" @click="toggleExpanded">
          <slot />
        </p>
      </template>
      <Button
        :class="{ lowProfile }"
        :variant="buttonVariant"
        class="accordion-text__btn"
        type="button"
        :text="expanded ? 'Read less' : 'Read more'"
        on="tap:AMP.setState({expanded: !expanded})"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import Button from '~/components/generic/Button/Button.vue'

const props = defineProps({
  lowProfile: {
    type: Boolean,
    default: false
  },
  html: {
    type: [String, Boolean],
    default: false
  }
})

const expanded = ref(false)

onMounted(() => {
  expanded.value = false
})

const buttonVariant = computed(() => (props.lowProfile ? 'transparent' : 'primary'))
const buttonText = computed(() => (expanded.value ? 'Read less' : 'Read more'))

function toggleExpanded() {
  expanded.value = !expanded.value
}

const { $isAMP } = useNuxtApp()
const isAMP = $isAMP
</script>

<style lang="scss" scoped>
.lowProfile {
  color: #000;
}

.accordion-text {
  white-space: initial;
  width: 66%;
  margin: 2rem auto 0 !important;
  text-align: center;

  &__p ::v-deep p,
  ::v-deep .rich-text p {
    font-family: $font-family-paragraph !important;
    font-size: $font-size-15 !important;
    line-height: $line-height-15 !important;
    text-align: justify !important;
    color: #222;
    -webkit-font-smoothing: antialiased;
  }
}

.accordion-text .accordion-text__p {
  max-height: 150px;
  overflow: hidden;
  transition: 0.6s max-height ease-in-out;
  text-align: justify;
  position: relative;
}

.accordion-text .accordion-text__p:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(transparent 0px, white);
}

.accordion-text.expanded .accordion-text__p {
  max-height: 2000px;
}

.accordion-text.expanded .accordion-text__p:before {
  background: none;
}
</style>
