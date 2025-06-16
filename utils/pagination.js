/**
 * Generate pagination.
 * @param {number} current Current page.
 * @param {number} last Last page.
 * @param {number} width width.
 * @returns {Array} Returns array of pages.
 */
export const paginationGenerator = (current, last, width = 1) => {
    const left = current - width
    const right = current + width + 1
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= last; i += 1) {
        if (i === 1 || i === last || (i >= left && i <= right)) {
            range.push(i)
        } else if (i < left) {
            i = left - 1
        } else if (i > right) {
            range.push(last)
            break
        }
    }

    range.forEach(i => {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1)
            } else if (i - l !== 1) {
                rangeWithDots.push('...')
            }
        }
        rangeWithDots.push(i)
        l = i
    })

    return rangeWithDots
}

//function to remove query params from a URL
export function removeURLParameter (url, parameter) {
    //better to use l.search if you have a location/link object
    var urlparts = url.split('?')
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '='
        var pars = urlparts[1].split(/[&;]/g)

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1)
            }
        }

        url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
        return url
    } else {
        return url
    }
}

//function to add/update query params
export function insertParam (key, value) {
    if (history.pushState) {
        // var newurl = window.location.protocol + "//" + window.location.host + search.pathname + '?myNewUrlQuery=1';
        var currentUrlWithOutHash = window.location.origin + window.location.pathname + window.location.search
        var hash = window.location.hash
        //remove any param for the same key
        var currentUrlWithOutHash = removeURLParameter(currentUrlWithOutHash, key)

        //figure out if we need to add the param with a ? or a &
        var queryStart
        if (currentUrlWithOutHash.indexOf('?') !== -1) {
            queryStart = '&'
        } else {
            queryStart = '?'
        }

        var newurl = currentUrlWithOutHash + queryStart + key + '=' + value + hash
        window.history.pushState({path: newurl}, '', newurl)
    }
}
