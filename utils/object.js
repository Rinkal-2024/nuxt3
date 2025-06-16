export const isIterableObject = (object) => {
    return object !== null &&
        object !== undefined &&
        typeof object === 'object' &&
        (
            typeof object[Symbol.iterator] === 'function' ||
            Object.keys(Object(object)).length > 0
        )
}

/**
 * Runs handler function on each object property.
 * It is also capable of iteration over nested properties if deep is set to true.
 * Handler function receives property as an argument and should return the new property value.
 * @param object
 * @param handler
 * @param deep
 */
export const forEachInObject = (object, handler, deep = false) => {

    if (!isIterableObject(object)) {
        console.error('Property received is not an object or is not iterable.')
        return
    }

    if (typeof handler !== 'function') {
        console.error('Handler is not a function.')
        return
    }

    for (const property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            if (isIterableObject(object[property]) && deep) {
                forEachInObject(object[property], handler, deep)
            } else {
                object[property] = handler(object[property], property)
            }
        }
    }

}
