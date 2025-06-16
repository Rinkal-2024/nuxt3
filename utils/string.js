/**
 *
 * @param string
 * @return {string}
 */
function camelCaseToSnakeCase(string) {
    return string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

export {
    camelCaseToSnakeCase,
    capitalizeFirstLetter
}
