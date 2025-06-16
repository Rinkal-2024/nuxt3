import colors from '~/constants/colors'

const hasNameColorAttached = (params) => {
    return typeof params.colorId !== 'undefined' && isNaN(parseInt(params.colorId))
}

const getColorIdBasedOnName = (colorName) => {
    return colors.find(color => color.name === colorName)?.id
}

export default async function (ctx) {
    if (hasNameColorAttached(ctx.route.params)) {
        const colorId = getColorIdBasedOnName(ctx.route.params.colorId)
        ctx.route.params.colorId = colorId
        await ctx.store.dispatch('global/config/updateColorIdSelected', colorId)
    }
}
