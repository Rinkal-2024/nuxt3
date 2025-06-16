export default function (ctx) {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    const isBot =
        /HeadlessChrome/i.test(userAgent) ||
        /Lighthouse/i.test(userAgent) ||
        /google/i.test(userAgent) ||
        /bot/i.test(userAgent)
    ctx.store.commit('global/config/CHANGE_IS_GOOGLE_BOT', isBot)
}
