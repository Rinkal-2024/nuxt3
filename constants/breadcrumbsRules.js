const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

export const humanizeSlug = (slug) => {

    if (!slug) {
        return ''
    }

    return slug
        .split('-')
        .map(x => capitalize(x))
        .join(' ')
}

export const humanizeTitle = (title) => {
    return title
        .split(' ')
        .map(x => capitalize(x))
        .join(' ')
}

export default [
    {
        name: 'Single photo view - inspiration/photo/id/cat/name',
        match: $route => $route.name === 'inspiration-photo-photoId-slug1-slug2',
        handler: $route => {
            return [
                {
                    title: humanizeSlug($route.params.slug1),
                    path: {
                        name: 'inspiration-images-category-categoryId',
                        params: {
                            categoryId: $route.params.slug1
                        }
                    }
                },
                {
                    title: humanizeSlug($route.params.slug2),
                    path: $route
                }
            ]
        }
    },
    {
        name: 'Single vendor view',
        match: $route => $route.name === 'biz-slug-id',
        handler: ($route, store) => {
            const category = store.getters['api/vendorPage/category']
            return [
                {
                    title: 'Wedding Vendors',
                    path: {
                        name: 'vendor',
                    }
                },
                {
                    title: category.name,
                    path: {
                        name: 'vendor-search-category-categorySlug',
                        params: {
                            categorySlug: category.slug
                        }
                    }
                },
                {
                    title: humanizeSlug($route.params.slug),
                    path: $route
                }
            ]
        }
    },
    {
        name: 'News article with sub category',
        match: $route => $route.name === 'news-category-news-newsId',
        handler: ($route, store) => {
            const subCategory = store.getters['api/newsArticle/data']?.subcategory
            const category = subCategory?.category

            return [
                {
                    title: 'News & Advice',
                    path: {
                        name: 'news',
                    }
                },
                {
                    title: category.name,
                    path: {
                        name: 'news-category',
                        params: {
                            category: category.slug
                        }
                    }
                },
                {
                    title: subCategory.name,
                    path: {
                        name: 'news-category-subcategory',
                        params: {
                            category: category.slug,
                            subcategory: subCategory.slug
                        }
                    }
                },
            ]
        }
    }
]
