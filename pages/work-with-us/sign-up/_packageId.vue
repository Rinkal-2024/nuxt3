<template>
    <Form id="business-form" :data-level="membershipType">
        <Title v-if="isTopLevel">
            Apply for the <span class="vendor-type">Editors Circle</span>
        </Title>
        <Title v-else>
            Sign Up for a <span class="vendor-type">Business Membership</span>
        </Title>
        <FormGeneralErrorMessage name="nonFieldErrors"/>
        <FormFields>
            <ImageInput
                id="image-input"
                with-file-button
                @change="main_photo = $event"
                :error-message="getErrorMessages($v.main_photo)"
                :touched="$v.main_photo.$error"
            />
            <FieldsTitle>Business info *</FieldsTitle>
            <InputField
                id="business-name-input"
                fullWidth
                required
                placeholder="Business Name*"
                name="businessName"
                v-model="dataForm.name"
                :has-error="hasError('name')"
                :error-message="getDataformErrorMessages('name')"
                @blur="$v.dataForm.name.$touch()"
                @input="delete serverErrors.name"
            />
            <SelectDropDown 
                details-id= "vendor-category-details"
                select-class="select-vendor-category"
                :items="adjustedVendorCategories"
                placeholder-text="Business Category*"
                z-index="100"
                with-field-error
            />
            <InputField
                id="title-input"
                placeholder="Owner/Contact Name*"
                name="title"
                required
                v-model="dataForm.title"
                :has-error="hasError('name')"
                :error-message="getDataformErrorMessages('name')"
                @blur="$v.dataForm.title.$touch()"
            />
            <InputField
                id="email-input"
                placeholder="Owner/Contact Email*"
                required
                type="email"
                name="email"
                :has-error="hasError('email')"
                :error-message="getDataformErrorMessages('email')"
                v-model="dataForm.email"
            />
            <InputField
                id="phone-input"
                placeholder="Owner/Contact Phone Number*"
                required
                type="tel"
                name="phone"
                v-model="dataForm.phone"
                :has-error="hasError('phone')"
                :error-message="getDataformErrorMessages('phone')"
                @blur="$v.dataForm.phone.$touch()"
            />
            <InputField
                id="website-input"
                required
                fullWidth
                type="url"
                placeholder="Business Website (include https://)*"
                name="businessWebsite"
                v-model="dataForm.business_website"
                :has-error="hasError('phone')"
                :error-message="getDataformErrorMessages('business_website')"
                @blur="$v.dataForm.business_website.$touch()"
            />


            <FieldsTitle>Location *</FieldsTitle>
            <InputField
                id="address1-input"
                fullWidth
                placeholder="address 1*"
                required
                name="address1"
                v-model="dataForm.address1"
                :has-error="hasError('address1')"
                :error-message="getDataformErrorMessages('address1')"
                @blur="$v.dataForm.address1.$touch()"
            />
            <InputField
                id="address2-input"
                fullWidth
                placeholder="address 2"
                name="address2"
                v-model="dataForm.address2"
            />
            <SelectDropDown 
                details-id= "vendor-country-details"
                select-class="select-vendor-country"
                :items="countries"
                placeholder-text="Country*"
                radio-button-group="wedding-country"
                z-index="90"
                with-field-error
            />
            <SelectDropDown 
                    details-id= "vendor-state-details"
                    select-class="select-vendor-state"
                    :items="regionOptions"
                    placeholder-text="State/Region/Province*"
                    radio-button-group="wedding-state"
                    z-index="80"
                    with-field-error
                    disabled
            />
            <SelectDropDown 
                    details-id= "vendor-city-details"
                    select-class="select-vendor-city"
                    :items="cityOptions"
                    placeholder-text="City*"
                    radio-button-group="wedding-city"
                    z-index="70"
                    with-field-error
                    disabled
            />
            <InputField
                id="zip-input"
                placeholder="Zip Code*"
                name="zip"
                required
                v-model="dataForm.zip"
                :has-error="hasError('zip')"
                :error-message="getDataformErrorMessages('zip')"
                @blur="$v.dataForm.zip.$touch()"
            />
            <InputField
                id="business-phone-input"
                placeholder="Business Phone*"
                name="businessPhone"
                required
                v-model="dataForm.business_phone"
                :has-error="hasError('business_phone')"
                :error-message="getDataformErrorMessages('business_phone')"
                @blur="$v.dataForm.business_phone.$touch()"
            />
            <InputField
                id="business-fax-input"
                placeholder="Fax"
                name="fax"
                type="tel"
                v-model="dataForm.fax"
            />
            <InputField
                id="business-email-input"
                fullWidth
                placeholder="Business Email*"
                name="businessEmail"
                type="email"
                required
                v-model="dataForm.business_email"
                :has-error="hasError('business_email')"
                :error-message="getDataformErrorMessages('business_email')"
                @blur="$v.dataForm.business_email.$touch()"
            />


            <FieldsTitle>Preferences</FieldsTitle>
            <CheckboxField
                v-if="isTopLevel"
                fullWidth
                label="Willing to travel"
                name="willingToTravel"
                v-model="dataForm.willing_to_travel"
                appearance="form"
            />
            <CheckboxField
                fullWidth
                label="Hide physical address"
                name="hidePhysicalAddress"
                v-model="dataForm.hide_physical_address"
                appearance="form"
            />

            <FieldsTitle>Social media Urls</FieldsTitle>

            <div class="social-inputs"
                 v-for="(platform, index) in socialPlatforms" :key="index"
 >
                <div class="social-icon-wrapper">
                    <Icon
                        class="social-icon"
                        :name="platform.iconName"
                    />
                </div>
                <InputField
                    :id="platform.iconName + '-input'"
                    fullWidth
                    type="url"
                    :placeholder="platform.label"
                    :name="platform.iconName"
                    class="social-media-input"
                />
            </div>
            <FieldsTitle>Brief summary</FieldsTitle>
            <TextareaField
                ariaText="Brief summary"
                id="summary-input"
                fullWidth
                name="briefSummary"
                v-model="dataForm.brief_summary"
            />
            <FieldsTitle>Full Description*</FieldsTitle>
            <TextareaField
                ariaText="Full Description"
                id="description-input"
                required
                fullWidth
                name="description"
                v-model="dataForm.description"
                @blur="$v.dataForm.description.$touch()"
                :has-error="$v.dataForm.description.$error"
            />


            <FieldsTitle>Have you been featured on Inside Weddings?</FieldsTitle>
            <div class="radio-buttons">
                <RadioButtonField
                    label="Yes"
                    elValue="YES"
                    name="featured"
                    id="featured-yes"
                    appearance="form"
                    v-model="dataForm.featured"
                    with-field-error
                />
                <RadioButtonField
                    label="No"
                    elValue="NO"
                    name="featured"
                    id="featured-no"
                    appearance="form"
                    v-model="dataForm.featured"
                    with-field-error
                />
                <RadioButtonField
                    label="Not sure"
                    elValue="NOT_SURE"
                    name="featured"
                    id="featured-not-sure"
                    appearance="form"
                    v-model="dataForm.featured"
                    with-field-error
                />
            </div>
            <CheckboxField
                label="Receive the Inside Weddings Newsletter"
                name="consentNewsletter"
                v-model="dataForm.consent_newsletter"
                appearance="form"
                value
            />
            <CheckboxField
                label="I accept the <a href='https://donew.insideweddings.com/terms-of-use/' target='_blank'>terms of use</a> and <a href='https://donew.insideweddings.com/privacy-policy/' target='_blank'>privacy policy</a>*"
                name="consentTermsOfUseAndPrivacyAndPolicy"
                v-model="dataForm.consent_term_of_use_and_privacy_and_policy"
                appearance="form"
                required
                :has-error="$v.dataForm.consent_term_of_use_and_privacy_and_policy.$error"
                :error-message="getDataformErrorMessages('consent_term_of_use_and_privacy_and_policy')"
                @blur="$v.dataForm.consent_term_of_use_and_privacy_and_policy.$touch()"
                with-field-error
            />
        </FormFields>

        <FormButtons>
            <div id="business-error" class="error hidden">Unknown error has occurred, please try again later.</div>
            <Button id="business-submit" type="submit" >Submit</Button>
            <div id="business-loading" class="hidden"><LoadingIndicator/></div>
            <span id="business-success" class="hidden">Your form has been successfully submitted, thank you!</span>
        </FormButtons>
    </Form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {mapGetters} from "vuex";
import {createParamsString, requestData, getMetaUri, mapOptionsFromApiItems} from "~/utils/api";
import {validationMixin} from "vuelidate";
import {getErrorMessages} from "~/utils/validation";
import {email, required, url} from "vuelidate/lib/validators";
import socialPlatforms from '~/constants/socialPlatforms'

const isTrue = (value) => value === true

export default {
    name: "workWithUsSignup",
    head() {
        return this.$store.getters['api/workWithUsSignup/head']
    },
    mixins: [validationMixin],
    async asyncData({req, $http, store, route}) {
        const countriesParams = {
            fields: 'name,id',
        }
        const countriesParamsParsed = createParamsString(countriesParams)

        const vendorCategoriesParams = {
            fields: '*',
        }
        const vendorCategoriesParamsParsed = createParamsString(vendorCategoriesParams)

        const [meta, data, countries] = await requestData(
            $http,
            getMetaUri(req, route),
            `vendor_categories/${vendorCategoriesParamsParsed}`,
            `countries/${countriesParamsParsed}`,
        )

        await store.dispatch('api/workWithUsSignup/hydrate', {
            meta,
            data,
            countries
        })
    },
    data: () => ({
        loading: false,
        main_photo: '',
        dataForm: {
            name: '',
            categories: '',
            title: '',
            email: '',
            phone: '',
            business_website: '',
            address1: '',
            address2: '',
            zip: '',
            country: '',
            region: '',
            city: '',
            fax: '',
            business_phone: '',
            featured: '',
            willing_to_travel: false,
            hide_physical_address: false,
            brief_summary: '',
            description: '',
            consent_newsletter: true,
            consent_term_of_use_and_privacy_and_policy: false,
            social_medias: [
                {
                    platform: 'INSTAGRAM',
                    url: ''
                },
                {
                    platform: 'LINKEDIN',
                    url: ''
                },
                {
                    platform: 'TWITTER',
                    url: ''
                }
            ]
        },
        regionOptions: [{label:'placeholder',value:'x'}],
        cityOptions: [{label:'placeholder',value:'y'}],
        serverErrors: {},
        socialPlatforms
    }),
    computed: {
        ...mapGetters('api/workWithUsSignup', ['vendorCategories', 'countries']),
        isTopLevel() {
            return this.$route.params.packageId === 'editors-circle'
        },
        membershipType() {
            const packageId = this.$route.params.packageId
            switch (packageId) {
                case 'editors-circle':
                    return 'TOP_LEVEL'
                case 'membership-package-1':
                    return 'MEDIUM_LEVEL'
                case 'membership-package-2':
                    return 'ENTRY_LEVEL'
                case 'membership-package-3':
                    return 'FREE'
            }
        },
        adjustedVendorCategories() {
            return this.vendorCategories.map(category => {
                return {
                    label: category.label,
                    value: 'categories.' + category.value
                };
            });
        }
    },
    methods: {
        getErrorMessages(field) {
            return getErrorMessages(field)
        },
        hasError(fieldName) {
            return this.$v.dataForm[fieldName].$error || !!this.serverErrors[fieldName]?.length
        },
        getDataformErrorMessages(fieldName) {
            return this.serverErrors[fieldName]?.join(', ') || this.getErrorMessages(this.$v.dataForm[fieldName])
        },
        scrollToError() {
            this.$nextTick(() => {
                this.$el.querySelector('.with-error')?.scrollIntoView({behavior: 'smooth', block: 'center'})
            })
        },
        submitForm() {
            if(!this.$v.dataForm.$invalid && !this.$v.main_photo.$invalid){
                this.sendFormData()
            } else {
                this.$v.dataForm.$touch()
                this.$v.main_photo.$touch()
                this.scrollToError()
            }
        },
        async sendFormData() {
            this.serverErrors = {}
            this.loading = true
            const finalFormData = {
                ...this.dataForm,
                main_photo: this.main_photo.split(',')[1],
                membership: this.membershipType,
                categories: [this.dataForm.categories],
                social_medias: this.dataForm.social_medias.filter(social => !!social.url.length) // filter only filled
            }
            try {
                await this.$http.post('vendors/', finalFormData, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
                this.$router.push({ name: 'work-with-us-sign-up-success' })
            }
            catch (e) {
                this.loading = false;
                // console.log('error details:');
                // console.log(e);
                // console.dir(e);
                this.serverErrors = e.response.data
                this.$v.dataForm.$touch();
                this.scrollToError()
            }
        },
        addSocialMediaLink() {
            this.dataForm.social_medias.push({
                platform: 'TWITTER',
                url: ''
            })
        },
        removeSocialMediaLink(index) {
            this.dataForm.social_medias.splice(index, 1)
        },
        async onCountryChange(evt) {
            this.regionOptions = []
            this.dataForm.region = ''

            this.cityOptions = []
            this.dataForm.city = ''

            const countryId = evt
            const requestParams = {
                country: countryId,
                fields: 'name,id',
            }
            const requestParamsParsed = createParamsString(requestParams)
            const regions = await this.$http.$get(
                `regions/${requestParamsParsed}`
            )
            this.regionOptions = mapOptionsFromApiItems(regions.items)
        },
        async onRegionChange(evt) {
            this.cityOptions = []
            this.dataForm.city = ''
            const regionId = evt
            const countryId = this.dataForm.country
            const requestParams = {
                country: countryId,
                region: regionId,
                fields: 'name,id'
            }
            const requestParamsParsed = createParamsString(requestParams)
            const cities = await this.$http.$get(
                `cities/${requestParamsParsed}`
            )
            this.cityOptions = mapOptionsFromApiItems(cities.items)
        }
    },
    validations: {
        main_photo: {required},
        dataForm: {
            name: {required},
            categories: {required},
            title: {required},
            email: {required, email},
            phone: {required},
            business_website: {required},
            address1: {required},
            country: {required},
            region: {required},
            city: {required},
            zip: {required},
            business_phone: {required},
            business_email: {required, email},
            description: {required},
            consent_term_of_use_and_privacy_and_policy: {isTrue},
            social_medias: {
                $each: {
                    url: {url}
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

::v-deep {
    a {
        color: #000;
    }
}

.select-drop-down {
    width:100%;
    @include medium-and-large-screens {
        width: 50%;
        padding-right: 0.5rem;
    }
}

.vendor-type {
    font-weight: bold;
}

.agreement-link {
    text-decoration: underline;
}

.radio-buttons {
    display: flex;
    flex: 1 1 100%;
    margin-top: 1rem;
    justify-content: flex-start;
    @include medium-and-large-screens {
        flex: 1 1 50%;
    }
}

$social-icon-size: 1.6rem;
.social-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0 0 0.35rem;
    height: 2.4rem;
    border: $input-border-size solid $input-border-color;
    background-color: $color-darker-white;
    box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;
    border-right: none;
    width: 2.4rem;

    .social-icon {
        width: $social-icon-size;
        height: $social-icon-size;
        padding: 0.25rem;
    }
}

.social-media-input {
    flex-basis: calc(100% - 2.4rem) !important;
}
.social-inputs {
    display: flex;
    width: 100%;
}
</style>
