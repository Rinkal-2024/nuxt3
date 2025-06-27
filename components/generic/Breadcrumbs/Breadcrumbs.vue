<template>
  <PageLayoutMargin class="breadcrumbs">
    <ul>
      <li>
        <Link to="/" without-styles>
          <span>Inside Weddings</span>
        </Link>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index">
        <Link :to="crumb.path" without-styles>
          <span>{{ getCrumbTitle(crumb) || crumb.title }}</span>
        </Link>
      </li>
    </ul>
  </PageLayoutMargin>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { basePath } from '~/constants/basePath'
import breadcrumbsRules, { humanizeTitle } from '~/constants/breadcrumbsRules'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    default: null
  }
})

const excludeParams = [
  'category',
  'search',
  'location_type',
  'season_type',
  'genre_type',
  'event_type',
  'views',
  'style_type',
  'wedding-reception',
  'color',
  'photo',
  'amp'
]

const mapLabels = {
  news: 'News & Advice',
  vendor: 'Wedding Vendors',
  images: 'Wedding Photos',
  'planning design': 'Planning & Design',
  jewelry: 'Wedding Jewelry',
  fashion: 'Wedding Fashion',
  'travel honeymoon': 'Travel & Honeymoon',
  'celebrity style': 'Celebrity Style',
  'wedding registry': 'Wedding Registry'
}

const crumbParams = computed(() => {
  const fullPathNoQuery = route.fullPath.split('?')[0]
  return fullPathNoQuery.startsWith('/')
    ? fullPathNoQuery.substring(1).split('/')
    : fullPathNoQuery.split('/')
})

const crumbs = computed(() => {
  const crumbsList = []
  const overrideRule = breadcrumbsRules.find(rule => rule.match(route))
  let path = ''

  if (overrideRule) {
    return overrideRule.handler(route)
  }

  crumbParams.value.forEach((param, index) => {
    path = `${path}/${param}`
    const match = router.resolve(path)
    const isNextParamNumber = !isNaN(crumbParams.value[index + 1])

    if (match.name && !isNextParamNumber && !excludeParams.includes(param)) {
      let title = parseTitle(param)
      if (!isNaN(param)) {
        title = parseTitle(crumbParams.value[index - 1])
      }
      if (title && match) {
        crumbsList.push({
          title,
          ...match.route
        })
      }
    }
  })

  return crumbsList
})

function parseTitle(str) {
  return str?.replace(/[_-]/g, ' ')
}

function getCrumbTitle(crumb) {
  const fullPathNoQuery = route.fullPath.split('?')[0]
  const rawTitle = (crumb.title ?? '').toLowerCase()
  const mappedTitle = mapLabels[rawTitle] || capitalize(crumb.title)

  const titleToCompare = props.title?.replace(/\s/g, '').toLowerCase()
  const targetTitle = mappedTitle.replace(/\s/g, '').toLowerCase()

  if (fullPathNoQuery === crumb.path && props.title !== null) {
    return props.title
  }

  return titleToCompare === targetTitle ? props.title || humanizeTitle(mappedTitle) : humanizeTitle(mappedTitle)
}

function capitalize(text = '') {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
</script>

<script>
export default {
  head() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inside Weddings",
          item: `${basePath}/`
        },
        ...this.crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: crumb.title,
          item: `${basePath}${this.$router.resolve(crumb.path).route.fullPath}`
        }))
      ]
    }

    return {
      script: [
        {
          type: 'application/ld+json',
          json: structuredData
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

// ul {
//   list-style: none;
//   padding-left: 0;
//   line-height: 1.5;
// }

// li {
//   display: inline;
//   @include apply-font-and-size('label', 4);
//   font-size: 0.6rem;

//   @include small-and-medium-screens {
//     font-size: 0.8rem;
//   }

//   &:not(:last-child)::after {
//     content: ' > ';
//     display: inline;
//     font-size: 0.9em;
//     color: #aaa;
//     padding: 0 0.0725em 0 0.15em;
//   }

//   a {
//     color: $primary-text-color;
//     text-decoration: none;

//     &:hover {
//       text-decoration: underline;
//     }

//     &.nuxt-link-exact-active.nuxt-link-active {
//       color: $color-darker-grey;
//       pointer-events: none;
//     }
//   }
// }
</style>
