<template>
  <div>
    <template v-if="!insertAds">
      <div
        class="html-view"
        v-html="htmlParsed"
      />
    </template>
    <template v-else>
      <template v-for="(paragraph, index) in splitBody" :key="index">
        <div v-html="paragraph" />
        <div v-if="insertAdAfterParagraph(index) === 1" class="ad-container">
          <AdUnit ad-slot-name="weddingArticleParagraph1" :minHeight="300" />
        </div>
        <div v-if="insertAdAfterParagraph(index) === 3" class="ad-container">
          <AdUnit ad-slot-name="weddingArticleParagraph1" :minHeight="300" />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AdUnit from '~/components/AdUnit.vue' // adjust the path as needed
import { getImageSrcSetFromUrl } from '~/utils/imgSrcSet'
import { JSDOM } from 'jsdom'

// Props
const props = defineProps({
  html: {
    type: String,
    required: true
  },
  insertAds: {
    type: Boolean,
    default: false
  }
})

// Helper function to split html by paragraphs
function splitByParagraphs(body: string) {
  let splitBody = body.split('</p>')
  splitBody = splitBody.map((par, index) => {
    if (index < splitBody.length - 1) {
      return par + '</p>'
    }
    return par
  })
  return splitBody
}

// Logic to decide where to insert ads
function insertAdAfterParagraph(index: number) {
  const numberOfParagraphsBetweenAds = Math.floor(splitBody.value.length / 5)
  if (index % numberOfParagraphsBetweenAds === 0) {
    return Math.floor(index / numberOfParagraphsBetweenAds)
  }
  return false
}

// Computed: split body paragraphs
const splitBody = computed(() => splitByParagraphs(props.html))

// Computed: processed htmlParsed (server-only)
const htmlParsed = computed(() => {
  if (process.server) {
    let htmlContent = props.html
      .replace(/media-staging/g, 'media2')
      .replace(/<img/g, '<img loading="lazy" ')
      .replace(/<iframe/g, '<iframe loading="lazy" ')
      .replace(/ *noreferrer */g, ' ')

    const youtubeEmbedRegex = /<iframe(?:[^>]*)src="(?:https?:)?(?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^\s"']+)"(?:[^>]*)><\/iframe>/g
    htmlContent = htmlContent.replace(youtubeEmbedRegex, '<lite-youtube videoid="$1"></lite-youtube>')

    // Parse and manipulate with JSDOM only on server
    const dom = new JSDOM(htmlContent)
    const imgTags = dom.window.document.querySelectorAll('img')

    imgTags.forEach((img) => {
      if ((img.width && img.width > 300) || (img.height && img.height > 300)) {
        const wrapper = dom.window.document.createElement('div')
        wrapper.className = 'html-view-image-wrapper'
        const padding = (img.height / img.width) * 100
        wrapper.style.cssText = `padding-top: ${padding.toFixed(2)}%`
        const srcset = getImageSrcSetFromUrl(img.src)
        img.setAttribute('data-srcset', srcset)
        img.setAttribute('data-sizes', 'auto')
        img.removeAttribute('src')
        img.removeAttribute('width')
        img.removeAttribute('height')
        img.classList.add('lazyload', 'full-width-image')
        img.parentNode?.replaceChild(wrapper, img)
        wrapper.appendChild(img)
      }
    })

    return dom.window.document.body.innerHTML
  } else {
    // On client side, just output the raw html without manipulation
    return props.html
  }
})
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.html-view {
  word-break: break-word;
  flex: 1 1 100%;

  ::v-deep {
    color: $color-black;

    a {
      @include apply-font-and-size("paragraph", 5);
      font-weight: bold;
      color: $color-black;
      padding: 0;
      cursor: pointer;

      &:visited {
        color: $color-black;
      }
    }

    p, a, i, i a {
      font-size: 1.19rem;
      line-height: 2.13rem;
      -webkit-font-smoothing: antialiased;
      color: #222;
      @include medium-and-large-screens {
        font-size: 0.95rem !important;
        line-height: 1.7rem;
      }
    }

    .block-quote blockquote {
      @include apply-font-and-size("paragraph-decorative", 8);
      font-style: italic;
      letter-spacing: -1px;
      margin: 2rem 1rem;
    }

    .block-image_left_aligned,
    .left,
    .block-image_right_aligned,
    .right {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      height: auto;
    }

    .block-image_left_aligned,
    .left {
      align-items: flex-start;
    }

    .block-image_right_aligned,
    .right {
      align-items: flex-end;
    }

    .block-image_full_width,
    .full-width {
      img {
        width: 100%;
        height: auto;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    figure,
    ul,
    ol {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      margin: 1rem 0 0 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1rem 0 1rem 1rem;
    }

    ul,
    ol {
      padding: 0 1rem;
      @include small-and-medium-screens {
        padding: 0 1rem 0 2rem;
      }

      li {
        padding: 0.25rem 0;
      }
    }

    figcaption {
      @include apply-font-and-size("paragraph-decorative", 5);
    }

    hr {
      border-color: $color-grey;
      color: $color-grey;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .grey, ::v-deep.grey {
    color: $color-darker-grey !important;

    a {
      color: black !important;
      text-decoration: underline;
    }

    a.grey {
      color: $color-darker-grey !important;
    }
  }
}
</style>
