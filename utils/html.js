export const parseHtmlArray = htmlArr => {
    if(Array.isArray(htmlArr)) {
        return htmlArr.map(el => el.value).join('')
    }
    return htmlArr
}
