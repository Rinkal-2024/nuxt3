<template>
    <div :class="{ 'align-right': alignRight }" class="wedding-highlights">
        <div class="title">Highlights</div>
        <Separator class="separator"/>
        <div class="items">
            <div class="item-container">
                <Label class="label">Colors</Label>
                <div class="item-node">
                    <div class="colors-container --circular">
                        <template v-for="(color, i) in colors">
                            <Link v-if="!$isAMP" :key="i" :to="getColorLink(color.id)">              
                                <ColorsSelectorColor
                                    :color="color"
                                />
                            </Link>
                            <Link :key="i" v-else :to="getColorLink(color.id)" without-styles>
                                <div
                                    :style="{ backgroundColor: color.color }"
                                    class="color"
                                    @click="emitClickEvent"
                                >
                                   &nbsp;
                                </div>
                            </Link>
                        </template>
                    </div>
                </div>
            </div>
            <template v-for="item in highlights">
                <div v-if="item.value.length" class="item-container">
                    <Label class="label">{{ item.label }}</Label>
                    <div class="item-node">
                        <div
                            v-for="(name, index) in item.value"
                            :key="index"
                            v-if="Array.isArray(item.value)"
                        >
                            <Link :to="getCorrectedLink(item.linkTo, index)">
                                {{ name }}
                            </Link>
                        </div>
                        <div v-if="!Array.isArray(item.value)">
                            <Link :to="item.linkTo">
                                {{ item.value }}
                            </Link>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import lookupColors from '~/constants/colors'


export default {
    name: 'WeddingHighlights',
    props: {
        alignRight: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('api/weddingsArticle', [
            'colors',
            'highlights'
        ])
    },
    methods: {
        getColorLink(colorId) {
            const colorName = lookupColors.find(obj => obj.id === colorId).name;
            return `/weddings/search/color/${colorName}/`
        },
        getCorrectedLink(link, index) {
            // Fix for broken links like "/views/ballroom,beach" that the API provides when using multiple values
            // /views/ballroom,beach --> /views/ballroom, /views/beach
            const linkElementArray = link.split('/')
            const values = linkElementArray.pop().split(',')
            return [...linkElementArray, values[index]].join('/')
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "~/assets/styles/partials";

.wedding-highlights {
    display: flex;
    flex-direction: column;

    &.align-right {
        align-items: flex-end;
        text-align: right;

        .item-container {
            align-items: flex-end;
        }
    }

    ::v-deep {
        .separator {
            width: 8rem;
            margin: 0.5rem 0 0.75rem 0;
        }
    }
}

.title {
    @include apply-font-and-size("heading", 9);
}

.items {
    display: flex;
    flex-direction: column;
}

.item-container {
    display: flex;
    flex-direction: column;

    & + & {
        margin-top: 0.5rem;
    }
}

.item-node {
    color: $color-black;
    @include apply-font-and-size("label", 5);
    font-weight: 100;
    letter-spacing: 0.05rem;
    padding: 0.25rem 0;
}

.label {
    margin-top: 0;
}

.color {
    display: block;
    &:hover {
        transform: scale(1.2, 1.2) !important;
    }
}

</style>
