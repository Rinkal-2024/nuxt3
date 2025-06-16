<template>
    <div 
        :class="{'no-margin': noMargin, 'sticky': sticky}" 
        class="ad-unit-container"
        :style="style"
    >
        <div v-if="!$isAMP && adUnit" :data-aa-adunit="adUnit" data-aaad="true"></div>
        <amp-ad v-else-if="$isAMP && ampAdSlotId"
                :data-slot="ampAdSlot.dataSlot"
                :rtc-config='`{"vendors": {"prebidappnexus": {"PLACEMENT_ID": ${ampAdSlot.placementId}}},"timeoutMillis": 900}`'
                data-force-safeframe="true"
                data-multi-size-validation="false"
                height="250"
                type="doubleclick"
                width="300"
        ></amp-ad>
    </div>
</template>

<script>
import AD_SLOTS from '~/constants/adSlots'
import AMP_AD_SLOTS from '~/constants/ampAdSlots'

export default {
    name: "AdUnit",
    data: () => ({
        AD_SLOTS,
        AMP_AD_SLOTS
    }),
    props: {
        adSlotName: {
            type: String,
            default: ''
        },
        adSlot: {
            type: String,
            default: null
        },
        noMargin: {
            type: Boolean,
            default: false
        },
        ampAdSlotId: {
            type: Number,
            default: null
        },
        minHeight: {
            type: Number,
            default: null
        },
        sticky: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        adUnit() {
            return this.adSlot || this.AD_SLOTS[this.adSlotName]
        },
        ampAdSlot() {
            return this.AMP_AD_SLOTS[this.ampAdSlotId]
        },
        style () {
            return (this.minHeight ? 'min-height: ' + this.minHeight + 'px' : '')
        }
    }
}
</script>

<style lang="scss" scoped>
.ad-unit-container {
    //background-color: antiquewhite;
    margin: 10px auto;

    &.no-margin {
        margin: 0 auto;
    }
}
</style>
