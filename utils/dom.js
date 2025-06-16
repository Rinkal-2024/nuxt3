/**
 *
 * @param node
 * @param handler
 * @param stopPropagationExceptions Doesn't work on firefox
 * @return {function()} Delete events handlers
 */
export const registerOutsideClickHandler = (node, handler, stopPropagationExceptions = []) => {
    const stopPropagation = e => {
        const target = e.target
        let exception = false

        for (const node of stopPropagationExceptions) {
            exception = node.isSameNode(target)

            if (exception) {
                break
            }
        }

        !exception && e.stopPropagation()
    }

    node.addEventListener('click', stopPropagation)
    window.addEventListener('click', handler)

    return function () {
        node.removeEventListener('click', stopPropagation)
        window.removeEventListener('click', handler)
    }
}
