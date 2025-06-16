/**
 *
 * @param {Date} date
 * @returns {string}
 */
export const formatDateForApi = date => {
    return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`
}
