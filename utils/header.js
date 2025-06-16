/**
 * Returns true if page has 'news' in name, useful for displaying additional news submenu.
 * @param route {Object}
 * @return {boolean}
 */
export const isNewsListPage = (route) => {
    return route.name?.split('-').includes('news')
}
