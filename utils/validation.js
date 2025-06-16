/**
 * Returns an error message based on validation state.
 * @param {Object} errors
 * @return {string}
 */
export const getErrorMessages = errors => {
    if(errors.required === false){
        return 'This field is required.'
    }
    if(errors.url === false){
        return 'Please enter a valid URL, including "http://".'
    }
    if(errors.email === false){
        return 'Please enter valid email address.'
    }
    return ''
}
