const processAdsOnPage = () => {
    if (process.server || typeof document === 'undefined') {
        return
    }

    document.dispatchEvent(new CustomEvent("aaw", { "command": "processAdsOnPage" }))
}

export { processAdsOnPage }
