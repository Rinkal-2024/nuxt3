export default function (ctx) {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    ctx.store.commit('global/config/CHANGE_IS_MOBILE', /mobile/i.test(userAgent))
}
