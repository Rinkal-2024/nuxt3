const getSocialLinkFromRouting = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchParamsAsString = urlParams.toString()
    const searchParams = searchParamsAsString.length
        ? `?${searchParamsAsString}`
        : false

    return `https://insideweddings.com/${window.location.pathname}${
        !!searchParams ? searchParams : ''
    }`
}


export { getSocialLinkFromRouting }
