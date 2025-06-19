<template>
    <div class="work-with-us">
        <Intro
            :image="data.image_header"
            @buttonClick="scrollToOptions"
        />
        <ImageSection
            :image="data.image_section_1"
            class="image-size-1"
        />
        <ImageSection
            :image="data.image_section_2"
            class="image-size-1"
        />
<!--        <Section withoutVerticalMargins v-if="data.video">-->
<!--            <Video-->
<!--                classNames={{-->
<!--                section: styles.videoSection,-->
<!--                iframe: styles.videoIframe-->
<!--                }}-->
<!--                video={workWithUsData.video}-->
<!--            />-->
<!--        </Section>-->
        <ImageSection
            :image="data.image_section_3"
            class="image-size-2"
        />
        <!-- <ImageSection
            :image="data.image_section_4"
            :aspect-ratio="1080/629"
        /> -->
        <Packages :memberships="memberships" id="packages" />
        <TalkToLocalRep/>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

export default {
    name: "work-with-us",
    head() {
        return this.$store.getters['api/workWithUs/head']
    },
    async asyncData({req, $http, store, route}) {
        const workWithUsParams = {
            fields: '*',
        }
        const workWithUsParamsParsed = createParamsString(workWithUsParams)

        const [meta, data] = await requestData(
            $http,
            getMetaUri(req, route),
            `work_with_us/work-with-us/${workWithUsParamsParsed}`,
        )

        await store.dispatch('api/workWithUs/hydrate', {
            meta,
            data,
        })

    },
    computed: {
        ...mapGetters('api/workWithUs', ['data']),
        memberships () {
            return this.data.memberships.map(x => {
                const urls = [
                    'work-with-us/sign-up/editors-circle/',
                    'work-with-us/sign-up/membership-package-1/',
                    'work-with-us/sign-up/membership-package-2/',
                    'work-with-us/sign-up/membership-package-3/'
                ]

                return {
                    ...x,
                    url: urls[x.id - 1]
                }
            })
        }
    },
    methods: {
        scrollToOptions() {
            this.$el.querySelector('#packages')?.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }

}
</script>

<style scoped lang="scss">
    .image-size-1 {
        ::v-deep {
            img {
                aspect-ratio: 1.7184;
            }
        }
    }
    .image-size-2 {
        ::v-deep {
            img {
                aspect-ratio: 4.1538;
            }
        }
    }

</style>
