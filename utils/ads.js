export function reloadAds() {
    // Call processAdsOnPage()
    (window.aaw = window.aaw || {"cmd": []}).cmd.push(function () {
        window.aaw.processAdsOnPage();
    })
};
