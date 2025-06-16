/**
 *
 * @param {Array} array
 * @param {Number} numberOfChunks
 * @param {boolean} balanced "balanced" (subarrays' lengths differ as less as possible) or "even" (all subarrays but the last have the same length)
 */
function splitArray(array, numberOfChunks, balanced) {

    // https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays

    const a = array
    let n = numberOfChunks

    if (n < 2)
        return [a]

    let len = a.length,
        out = [],
        i = 0,
        size

    if (len % n === 0) {
        size = Math.floor(len / n)
        while (i < len) {
            out.push(a.slice(i, i += size))
        }
    } else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--)
            out.push(a.slice(i, i += size))
        }
    } else {

        n--
        size = Math.floor(len / n)
        if (len % size === 0)
            size--
        while (i < size * n) {
            out.push(a.slice(i, i += size))
        }
        out.push(a.slice(size * n))

    }

    return out
}

/**
 *
 * @param array {Array}
 * @param numberOfChunks {number}
 * @returns {*[]} list of chunks
 */
function splitArrayWithSort(array, numberOfChunks) {
    let currentIndex = 0
    let remainingElements = array.length
    const out = []
    for(let chunk = 0; chunk < numberOfChunks; chunk++) {
        out.push([])
    }

    while(remainingElements > 0) {
        for(let chunk = 0; chunk < numberOfChunks; chunk++) {
            if(currentIndex<array.length){
                out[chunk].push(array[currentIndex])
                currentIndex++
                remainingElements--
            }
        }
    }
    return out
}
/**
 *
 * @param x Array that needs to be grouped
 * @param f Function that gets group out of the element
 * @return {*}
 */
const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {})

/**
 * Sorts array alphabetically
 * @param {Array} array
 * @param {Function} keyGetter
 * @param {Boolean} immutable
 */
const sortAlphabetically = (array, keyGetter = null, immutable = true) => {

    if (immutable) {
        array = [...array]
    }

    if (keyGetter) {
        return array.sort((a, b) => {
            a = keyGetter(a).toLowerCase()
            b = keyGetter(b).toLowerCase()

            if (a < b) return -1
            if (b > a) return 1
            return 0
        })
    }

    return array.sort()
}

const shuffleArray = (array) => {
    if (array !== undefined && array !== null && array.length > 0) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
  }

export {
    splitArray,
    splitArrayWithSort,
    groupBy,
    sortAlphabetically,
    shuffleArray
}
