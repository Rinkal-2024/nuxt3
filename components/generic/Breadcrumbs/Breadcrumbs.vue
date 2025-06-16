<template>
    <PageLayoutMargin class="breadcrumbs">
        <ul>
            <li>
                <Link to="/" without-styles>
                    <span>Inside Weddings</span>
                </Link>
            </li>
            <li
                v-for="(crumb, index) in crumbs"
                :key="index"
            >
                <Link :to="crumb.path" without-styles>
                    <span>
                        {{ getCrumbTitle(crumb) || crumb.title }}
                    </span>
                </Link>
            </li>
        </ul>
    </PageLayoutMargin>
</template>

<script>
import {basePath} from "~/constants/basePath";
import breadcrumbsRules, {humanizeTitle} from '~/constants/breadcrumbsRules'

export default {
    name: 'Breadcrumbs',
    data: () => ({
        excludeParams: [
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
        ],
        mapLabels: {
            'news': 'News & Advice',
            'vendor': 'Wedding Vendors',
            'images': 'Wedding Photos',
            'planning design': 'Planning & Design',
            'jewelry': 'Wedding Jewelry',
            'fashion': 'Wedding Fashion',
            'travel honeymoon': 'Travel & Honeymoon',
            'celebrity style': 'Celebrity Style',
            'wedding registry': 'Wedding Registry'
        }
    }),
    props: {
        title: {
            type: String,
            default: null
        }
    },
    computed: {
        crumbParams() {
            const fullPath = this.$route.fullPath
            const fullPathNoQuery = fullPath.split('?')[0]
            return fullPathNoQuery.startsWith('/')
                ? fullPathNoQuery.substring(1).split('/')
                : fullPathNoQuery.split('/')
        },
        crumbs() {
            const crumbs = []
            const $route = this.$route
            const overrideRule = breadcrumbsRules.find(rule => rule.match($route))
            let path = ''

            if (overrideRule) {
                return overrideRule.handler($route, this.$store)
            }

            this.crumbParams.forEach((param, index) => {
                path = `${path}/${param}`
                const match = this.$router.match(path)
                if (match.name !== null && !this.isNumber(this.crumbParams[index + 1]) && !this.excludeParams.includes(param)) {
                    let title = this.parseTitle(param)
                    if (this.isNumber(param)) {
                        title = this.parseTitle(this.crumbParams[index - 1])
                    }
                    if (title && match) {
                        crumbs.push({
                            title,
                            ...match,
                        })
                    }
                }
            })
            return crumbs
        }
    },
    methods: {
        getCrumbTitle(crumb) {
            // if (!crumb.title) {
            //     return 'No category'
            // } else if (!isNaN(crumb.title)) {
            //     return 'Unnamed'
            // }

            const fullPathNoQuery = this.$route.fullPath.split('?')[0]

            const mappedCrumbTitle = this.mapLabels[(crumb.title ?? '').toLowerCase()] || (crumb.title[0] ?? '').toUpperCase() + (crumb.title ?? '').substr(1)
            const title = fullPathNoQuery === crumb?.path && this.title !== null ?
                this.title :
                mappedCrumbTitle

            // todo: make better
            if ((this.title ?? '').replace(/ /g, '').toLocaleLowerCase() ===
                title.replace(/ /g, '').toLocaleLowerCase()) {
                return this.title ? this.title : humanizeTitle(title)
            }

            return humanizeTitle(title)
        },
        isNumber(string) {
            return !isNaN(string)
        },
        parseTitle(string) {
            return string.replace(/[_-]/g, ' ')
        }
    },
    head() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": 'Inside Weddings',
                "item": `${basePath}/`
            }]
        }
        for (let [index, crumb] of this.crumbs.entries()) {
            const crumbURL = this.$router.resolve(crumb.path).route.fullPath // Get URL from crumb
            structuredData.itemListElement.push({
                "@type": "ListItem",
                "position": index + 2, // to offset zero-based index and first breadcrumb
                "name": crumb.title,
                "item": `${basePath}${crumbURL}`
            })
        }
        const structuredDataScript = {json: structuredData, type: 'application/ld+json'}
        return {script: [structuredDataScript]}
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

ul {
    list-style: none;
    padding-left: 0;
    line-height: 1.5;
}

li {
    display: inline;
    @include apply-font-and-size('label', 4);
    font-size: 0.6rem;
    @include small-and-medium-screens {
        font-size: 0.8rem;
    }

    &:not(:last-child)::after {
        content: ' > ';
        display: inline;
        font-size: 0.9em;
        color: #aaa;
        padding: 0 0.0725em 0 0.15em;
    }

    a {
        color: $primary-text-color;
        text-decoration: none;

        :hover {
            text-decoration: underline;
        }

        &.nuxt-link-exact-active.nuxt-link-active {
            color: $color-darker-grey;
            pointer-events: none;
        }
    }
}
</style>
