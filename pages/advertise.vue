<template>
    <Form id="advertise-form">
        <Title>Advertise With Us</Title>
        <FormDescription>
            <p>
                Thank you for your interest in advertising with Inside Weddings, one of
                the most popular and widely read wedding magazines in the bridal
                industry. We believe in a synergistic environment that provides quality
                advertisers a superior experience with a high ratio of advertising to
                editorial. With marketing options that allow advertisers the opportunity
                to enhance their brand image and extend their voice to the luxury
                wedding audience, our integrated support separates Inside Weddings from
                other bridal publications.
            </p>
            <p>
                A media kit is available
                <AdvertiseMediaKitDownloadLink />
                if you would
                like additional information about advertising with Inside Weddings in
                the print issue. We look forward to hearing from you!
            </p>
        </FormDescription>
        <FormFields>
            <FieldsTitle>Business information *</FieldsTitle>
            <InputField
                id="advertise-name"
                full-width
                required
                placeholder="Name*"
                name="name"
                v-model="dataForm.name"
                with-field-error
                :has-error="$v.dataForm.name.$error"
                @blur="$v.dataForm.name.$touch()"
            />
            <InputField  id="advertise-title" placeholder="Title" name="title" v-model="dataForm.title" />
            <InputField
                id="advertise-company-name"
                placeholder="Company Name*"
                name="companyName"
                required
                v-model="dataForm.company_name"
                :has-error="$v.dataForm.company_name.$error"
                @blur="$v.dataForm.company_name.$touch()"
            />
            <InputField
                id="advertise-client-name"
                full-width
                placeholder="Client Name (if different from company name)"
                name="clientName"
                v-model="dataForm.client_name"
            />
            <SelectDropDown 
                details-id= "ads-category-details"
                select-class="select-ads-category"
                :items="vendorCategories"
                placeholder-text="Category*"
                with-field-error
            />
            <InputField
                id="advertise-phone-number"
                placeholder="Phone Number*"
                name="phoneNumber"
                required
                type="tel"
                v-model="dataForm.phone_number"
                :has-error="$v.dataForm.phone_number.$error"
                @blur="$v.dataForm.phone_number.$touch()"
            />
            <InputField
                id="advertise-email"
                placeholder="Email Address*"
                name="email"
                required
                type="email"
                v-model="dataForm.email"
                :has-error="$v.dataForm.email.$error"
                :error-message="getErrorMessages($v.dataForm.email)"
                @blur="$v.dataForm.email.$touch()"
            />
            <InputField
                id="advertise-website"
                placeholder="Website (include https://)"
                name="website"
                type="url"
                v-model="$v.dataForm.website.$model"
                :has-error="$v.dataForm.website.$error"
                :error-message="getErrorMessages($v.dataForm.website)"
            />
            <FieldsTitle>Location</FieldsTitle>
            <InputField id="advertise-address" fullWidth placeholder="Address" name="address" v-model="dataForm.address"/>
            <InputField id="advertise-city" placeholder="City" name="city" v-model="dataForm.city" />
            <InputField id="advertise-state" placeholder="State/Region/Province" name="region" v-model="dataForm.region" />
            <InputField id="advertise-zip" placeholder="Zip Code" name="zip" v-model="dataForm.zip_code" />
            <InputField id="advertise-country" placeholder="Country" name="country" v-model="dataForm.country" />
            <FieldsTitle>I'm interested in: </FieldsTitle>
            <CheckboxField
                label="PRINT ADVERTISING / ADVERTORIAL / INSERTS"
                name="printAdvertisingAdvertorialInserts"
                v-model="dataForm.print_advertising_advertorial_inserts"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="DIGITAL ADVERTISING / SPONSORED POSTS"
                name="digitalAdvertisingSponsoredPosts"
                v-model="dataForm.digital_advertising_sponsored_posts"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="VENDOR & VENUE DIRECTORY LISTINGS"
                name="vendorAndVenueDirectoryListings"
                v-model="dataForm.vendor_and_venue_directory_listings"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="REQUEST EDITORS CIRCLE MEMBERSHIP"
                name="requestEditorsCircleMembership"
                v-model="dataForm.request_editors_circle_membership"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="OTHER"
                name="other"
                v-model="dataForm.other"
                with-field-error
                appearance="form"
            />
        </FormFields>
        <FormButtons>
            <div id="advertise-error" class="error hidden">Unknown error has occurred, please try again later.</div>
            <Button id="advertise-submit" type="submit" >Submit</Button>
            <div id="advertise-loading" class="hidden"><LoadingIndicator/></div>
            <span id="advertise-success" class="hidden">Your form has been successfully submitted, thank you!</span>
        </FormButtons>
    </Form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {mapGetters} from "vuex";
import {required, email, url} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {getErrorMessages} from "~/utils/validation";

const {getMetaUri, requestData, createParamsString} = require('~/utils/api')


export default {
    name: 'advertise',
    mixins: [validationMixin],
    data () {
        return {
            dataForm: {
                name: '',
                title: '',
                company_name: '',
                client_name: '',
                category: '',
                phone_number: '',
                email: '',
                website: '',
                address: '',
                city: '',
                region: '',
                zip_code: '',
                country: '',
                print_advertising_advertorial_inserts: false,
                digital_advertising_sponsored_posts: false,
                vendor_and_venue_directory_listings: false,
                request_editors_circle_membership: false,
                other: false
            },
            loading: false,
            error: false,
            success: false
        }
    },
    computed: {
        ...mapGetters('api/advertise', ['vendorCategories'])
    },
    async asyncData ({ req, $http, store, route }) {
        const vendorCategoriesParams = {
            fields: '*',
        }
        const vendorCategoriesParamsParsed = createParamsString(vendorCategoriesParams)

        const mediaKitParams = {
            order: '-created_at',
            'advertising_media_kit': true
        }
        const mediaKitParamsParsed = createParamsString(mediaKitParams)

        const [meta, data, mediaLink] = await requestData(
            $http,
            getMetaUri(req, route),
            `vendor_categories/${vendorCategoriesParamsParsed}`,
            `documents/${mediaKitParamsParsed}`
        )

        await store.dispatch('api/advertise/hydrate', {
            meta,
            data,
            mediaLink
        })

    },
    head() {
        return this.$store.getters['api/advertise/head']
    },
    methods: {
        submitForm() {
          if(!this.$v.dataForm.$invalid){
              this.sendFormData()
          } else {
              this.$v.dataForm.$touch()
              this.$nextTick(() => {
                  this.$el.querySelector('.with-error')?.scrollIntoView({behavior: 'smooth', block: 'center'})
              })
          }
        },
        async sendFormData () {
            this.loading = true
            const finalDataForm = this.prepareFormForSubmit(this.dataForm)
            await this.$http.post('advertise_contact/', finalDataForm).then(() => {
                this.success = true
            }, () => {
                this.error = true
            }).finally(() => {
                this.loading = false
            })
        },
        prepareFormForSubmit(dataForm){
            const finalDataForm = {...dataForm}
            finalDataForm.category = dataForm.category.value
            return finalDataForm
        },
        getErrorMessages(errors){
            return getErrorMessages(errors)
        }
    },
    validations: {
        dataForm: {
            name: {required},
            company_name: {required},
            category: {required},
            phone_number: {required},
            email: {required, email},
            website: {url}
        }
    }
}
</script>

<style scoped lang="scss">
//// @import "~/assets/styles/partials";

p, a {
    font-size: .75rem !important;
}

.select-drop-down {
    z-index: 10;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    border: none;
    @include medium-and-large-screens {
       flex: 0 1 calc(50% - 0.45rem);
    }

}

.button:hover {
    color: white;
    background-color: #000;
}


</style>
