export const state = () => ({
    data: [],
})

export const getters = {

    categories: (state) => {
        let categories = state.data.reduce((categories, current) => {

            const category = current.subcategory.category

            if (categories.findIndex(x => x.id  === category.id) !== -1) {
                return categories
            }

            return [...categories, category]
        }, [])

        return categories.sort((a, b) => a.sort_order > b.sort_order ? 1 : -1)
    },
    articles: (state, getters) => {
        //loop though and return the articles linked thier category id
        let articles = [];
        let categories = getters.categories;
        categories.forEach(function(category) {
            articles.push({id: category.id, articles: state.data
            .filter(article => article.subcategory.category.id === category.id)
            .map(article => ({
                id: article.id,
                category: article.subcategory.category,
                title: article.title,
                subtitle: article.subtitle,
                description: article.description,
                image: article.main_image.image,
                linkTo: article.slug
            }))})
        })
        return articles;
    }
}

export const mutations = {
    SET_DATA (state, data) {
        state.data = data
    }
}

export const actions = {
    hydrate({ commit }, data) {
        commit('SET_DATA', data)
    }
}
