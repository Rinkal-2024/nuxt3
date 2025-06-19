<template>
    <Form id="wedding-form">
        <Title>Submit Your Wedding</Title>
        <SubTitle>Thank you for your interest in Inside Weddings!</SubTitle>
        <FormDescription>
            We feature weddings, rehearsal dinners, bridal showers, and other
            wedding-related events. The submission should be composed of photos that
            focus mainly on the décor, details, and venue(s) of the event – couple
            shots should be included, but limited in number. Please fill out all
            fields on the submission form to provide us with a sense of the overall
            event. Celebrations will be considered for both print and the web; if you
            have a preference for one over the other, please note it in the
            submission.
        </FormDescription>
        <FormGeneralErrorMessage name="nonFieldErrors"/>
        <FormFields>
            <FieldsTitle>Getting in Touch with You</FieldsTitle>
            <SelectDropDown
                class="full-width"
                details-id= "sender-type-details"
                select-class="select-sender-type"
                :items="WEDDING_SENDER_CATEGORY_OPTIONS"
                placeholder-text="You Are The..."
                radio-button-group="sender-type"
                z-index="100"
                with-field-error
            />
            <InputField
                id="sender_first_name"
                placeholder="First Name*"
                name="senderFirstName"
                required
                v-model="dataForm.sender_first_name"
                :has-error="$v.dataForm.sender_first_name.$error"
                @blur="$v.dataForm.sender_first_name.$touch()"
            />
            <InputField
                id="sender_last_name"
                placeholder="Last Name*"
                name="senderLastName"
                required
                v-model="dataForm.sender_last_name"
                :has-error="$v.dataForm.sender_last_name.$error"
                @blur="$v.dataForm.sender_last_name.$touch()"
            />
            <InputField
                id="sender_phone_number"
                placeholder="Phone Number*"
                required
                type="tel"
                name="senderPhoneNumber"
                v-model="dataForm.sender_phone_number"
                :has-error="$v.dataForm.sender_phone_number.$error"
                @blur="$v.dataForm.sender_phone_number.$touch()"
            />
            <InputField
                id="sender_email"
                placeholder="Email Address*"
                required
                type="email"
                name="senderEmail"
                v-model="dataForm.sender_email"
                :has-error="$v.dataForm.sender_email.$error"
                :error-message="getErrorMessages($v.dataForm.sender_email)"
                @blur="$v.dataForm.sender_email.$touch()"
            />
            <InputField id="sender_address" placeholder="Address" name="senderAddress" v-model="dataForm.sender_address"/>
            <InputField id="sender_company_name" placeholder="Company" name="senderCompanyName" v-model="dataForm.sender_company_name"/>
            <InputField id="sender_company_title" fullWidth placeholder="Title" name="senderTitle" v-model="dataForm.sender_company_title"/>
            <FieldsTitle>The Couple</FieldsTitle>
            <InputField
                id="bride_first_name"
                placeholder="Spouse First Name*"
                name="brideFirstName"
                required
                v-model="dataForm.bride_first_name"
                :has-error="$v.dataForm.bride_first_name.$error"
                @blur="$v.dataForm.bride_first_name.$touch()"
            />
            <InputField
                id="bride_last_name"
                placeholder="Spouse Last Name*"
                name="brideLastName"
                required
                v-model="dataForm.bride_last_name"
                :has-error="$v.dataForm.bride_last_name.$error"
                @blur="$v.dataForm.bride_last_name.$touch()"
            />
            <InputField
                id="groom_first_name"
                placeholder="Spouse First Name*"
                name="groomFirstName"
                required
                v-model="dataForm.groom_first_name"
                :has-error="$v.dataForm.groom_first_name.$error"
                @blur="$v.dataForm.groom_first_name.$touch()"
            />
            <InputField
                id="groom_last_name"
                placeholder="Spouse Last Name*"
                name="groomLastName"
                required
                v-model="dataForm.groom_last_name"
                :has-error="$v.dataForm.groom_last_name.$error"
                @blur="$v.dataForm.groom_last_name.$touch()"

            />
            <InputField
                id="couple_email"
                placeholder="Couple Email Address*"
                name="coupleEmail"
                type="email"
                required
                v-model="dataForm.couple_email"
                :has-error="$v.dataForm.couple_email.$error"
                :error-message="getErrorMessages($v.dataForm.couple_email)"
                @blur="$v.dataForm.couple_email.$touch()"

            />
            <InputField
                id="couple_phone_number"
                placeholder="Couple Phone Number*"
                name="couplePhoneNumber"
                required
                v-model="dataForm.couple_phone_number"
                :has-error="$v.dataForm.couple_phone_number.$error"
                @blur="$v.dataForm.couple_phone_number.$touch()"
            />
            <InputField id="couple_address" fullWidth placeholder="Couple Address" name="coupleAddress" v-model="dataForm.couple_address"/>
            <FieldsTitle>The Wedding</FieldsTitle>
            <InputField
                placeholder="Wedding Date*"
                name="weddingDate"
                id="wedding-date-input"
                type="text"
                required
                fullWidth
            />
            <InputField
                id="wedding_website"
                fullWidth
                placeholder="Wedding Website URL (include https://)"
                name="weddingWebsite"
                type="url"
                v-model="dataForm.wedding_website"
            />
            <InputField id="venue_name" placeholder="Venue name" name="venueName"/>
              <SelectDropDown
                    details-id= "wedding-country-details"
                    select-class="select-wedding-country"
                    :items="countries"
                    placeholder-text="Wedding Country*"
                    radio-button-group="wedding-country"
                    z-index="90"
                    with-field-error
                />
            <SelectDropDown
                    details-id= "wedding-state-details"
                    select-class="select-wedding-state"
                    :items="regionOptions"
                    placeholder-text="Wedding State/Region/Province*"
                    radio-button-group="wedding-state"
                    z-index="80"
                    with-field-error
                    disabled
            />
            <SelectDropDown
                    details-id= "wedding-city-details"
                    select-class="select-wedding-city"
                    :items="cityOptions"
                    placeholder-text="Wedding City*"
                    radio-button-group="wedding-city"
                    z-index="70"
                    with-field-error
                    disabled
            />
            <TextareaField
                id="wedding_details"
                fullWidth
                placeholder="Please provide us with any details that make this wedding unique."
                type="text"
                name="weddingDetails"
                v-model="dataForm.wedding_details"
            />
            <FieldsTitle>Media Upload</FieldsTitle>
            <FieldsDescription>
                Please provide us with 50-100 photos that reflect the style of
                the wedding as well as the detail and decoration elements of both the
                ceremony and reception.
            </FieldsDescription>
            <InputField
                id="media_link"
                fullWidth
                placeholder="Link*"
                required
                type="url"
                name="mediaLink"
                v-model="dataForm.media_link"
                :has-error="$v.dataForm.media_link.$error"
                :error-message="getErrorMessages($v.dataForm.media_link)"
            />
            <FieldsTitle>Wedding Resources</FieldsTitle>
            <FieldsDescription>
                Please enter the primary vendors who participated in this wedding. Note:
                Photographer credit is required.
            </FieldsDescription>

            <div id="vendor-resources">
                <ArrayField
                    v-for="(vendor, index) in $v.dataForm.vendors_raw.$each.$iter"
                    :key="index"
                    with-remove-field-input-button
                    @remove="removeVendor(index)"
                >
                    <SelectDropDown
                        details-id= "vendor-category-details"
                        select-class="select-vendor-category"
                        :items="vendorCategoriesDropdown"
                        placeholder-text="Category*"
                        radio-button-group="vendor-category"
                        z-index="60"
                        with-field-error
                    />
                    <InputField
                        placeholder="Business name*"
                        v-model="vendor.business_name.$model"
                        name="businessName"
                        required
                        :has-error="vendor.business_name.$error"
                        :error-message="getErrorMessages(vendor.business_name)"
                        @blur="vendor.business_name.$touch()"
                    />
                    <InputField
                        placeholder="Contact name*"
                        v-model="vendor.contact_name.$model"
                        name="contactName"
                        required
                        :has-error="vendor.contact_name.$error"
                        :error-message="getErrorMessages(vendor.contact_name)"
                        @blur="vendor.contact_name.$touch()"
                    />
                    <InputField
                        placeholder="Description*"
                        v-model="vendor.description.$model"
                        name="description"
                        required
                        :has-error="vendor.description.$error"
                        :error-message="getErrorMessages(vendor.description)"
                        @blur="vendor.description.$touch()"
                    />
                    <InputField
                        id="vendor-email"
                        placeholder="Email*"
                        v-model="vendor.email.$model"
                        name="email"
                        type="email"
                        required
                        :has-error="vendor.email.$error"
                        :error-message="getErrorMessages(vendor.email)"
                        @blur="vendor.email.$touch()"
                    />
                    <InputField
                        placeholder="Phone number"
                        v-model="vendor.phone_number.$model"
                        name="phoneNumber"
                        type="tel"
                    />
                    <Separator/>
                </ArrayField>
            </div>
            <AddFieldInputButton label="Add vendor" @click="addVendor"/>

            <FieldsTitle>Please confirm that the couple is aware that:</FieldsTitle>
            <CheckboxField
                label="their wedding is being submitted for review and may be chosen for publication in Inside Weddings.*"
                name="consentPublication"
                v-model="dataForm.consent_publication"
                :has-error="$v.dataForm.consent_publication.$error"
                with-field-error
                required
                appearance="form"
            />
            <CheckboxField
                label="publication of a real wedding includes the couple’s first and last names, and photos of the couple.*"
                name="consentPersonalitiesPublication"
                v-model="dataForm.consent_personalities_publication"
                :has-error="$v.dataForm.consent_personalities_publication.$error"
                with-field-error
                required
                appearance="form"
            />
            <CheckboxField
                label="if their wedding is selected, they will be asked to provide cost information relating to the event that will be used for research purposes only.*"
                name="consentCostInformation"
                v-model="dataForm.consent_cost_information"
                :has-error="$v.dataForm.consent_cost_information.$error"
                with-field-error
                required
                appearance="form"
            />
            <CheckboxField
                label="we are unable to release photo layouts prior to publication.*"
                name="consentPhotoLayouts"
                v-model="dataForm.consent_photo_layouts"
                :has-error="$v.dataForm.consent_photo_layouts.$error"
                with-field-error
                required
                appearance="form"
            />
            <FieldsTitle>Please Confirm That the Wedding:</FieldsTitle>
            <CheckboxField
                label="has not been submitted or accepted for print by another print publication."
                name="consentAnotherPrint"
                v-model="dataForm.consent_another_print"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="has not been submitted or accepted for a feature on a commercial blog."
                name="consentCommercialBlog"
                v-model="dataForm.consent_commercial_blog"
                with-field-error
                appearance="form"
            />
        </FormFields>
        <FormButtons>
            <div id="wedding-error" class="error hidden">Unknown error has occurred, please try again later.</div>
            <Button id="wedding-submit" type="submit" >Submit</Button>
            <div id="wedding-loading" class="hidden"><LoadingIndicator/></div>
            <span id="wedding-success" class="hidden">Your form has been successfully submitted, thank you!</span>
        </FormButtons>
    </Form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {mapGetters} from "vuex";
import WEDDING_SENDER_CATEGORY_OPTIONS from '~/constants/weddingSenderCategoryOptions'
import {email, required, url} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {getErrorMessages} from "~/utils/validation";
import {formatDateForApi} from "~/utils/date";

const {getMetaUri, requestData, createParamsString, mapOptionsFromApiItems} = require('~/utils/api')

const isTrue = (value) => value === true

export default {
    name: "submit",
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

        await store.dispatch('api/weddingsSubmit/hydrate', {
            meta,
            data,
            countries
        })
    },
    head() {
        return this.$store.getters["api/weddingsSubmit/head"]
    },
    data() {
        return {
            WEDDING_SENDER_CATEGORY_OPTIONS,
            loading: false,
            success: false,
            error: false,
            regionOptions: [{label:'placeholder',value:'0'}],
            cityOptions: [{label:'placeholder',value:'0'}],
            dataForm: {
                bride_first_name: '',
                bride_last_name: '',
                consent_another_print: false,
                consent_commercial_blog: false,
                consent_cost_information: false,
                consent_personalities_publication: false,
                consent_photo_layouts: false,
                consent_publication: false,
                couple_address: '',
                couple_email: '',
                couple_phone_number: '',
                date_event: '',
                groom_first_name: '',
                groom_last_name: '',
                media_link: '',
                sender_address: '',
                sender_company_name: '',
                sender_company_title: '',
                sender_email: '',
                sender_first_name: '',
                sender_last_name: '',
                sender_phone_number: '',
                sender_type: '',
                vendors_raw: [
                    {
                        category: '',
                        business_name: '',
                        contact_name: '',
                        description: '',
                        email: '',
                        phone_number: ''
                    }
                ],
                venue_name: '',
                wedding_city: '',
                wedding_country: '',
                wedding_details: '',
                wedding_region: '',
                wedding_website: ''
            }
        }
    },
    computed: {
        ...mapGetters('api/weddingsSubmit', ['countries', 'vendorCategories']),
        vendorCategoriesDropdown(){
            return this.vendorCategories.map(x => ({
                value: "vendor-category." + x.value,
                label: x.label
            })).sort(function(a, b) {
                const x = a.label.toUpperCase();
                const y = b.label.toUpperCase();
                return (x < y) ? -1 : (x > y) ? 1 : 0;
            })
        }
    },
    methods: {
        async onCountryChange(evt) {
            this.regionOptions = []
            this.dataForm.wedding_region = ''

            this.cityOptions = []
            this.dataForm.wedding_city = ''

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
            this.dataForm.wedding_city = ''
            const regionId = evt
            const countryId = this.dataForm.wedding_country
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
        },
        addVendor() {
            this.dataForm.vendors_raw.push(
                {
                    category: '',
                    business_name: '',
                    contact_name: '',
                    description: '',
                    email: '',
                    phone_number: ''
                }
            )
        },
        removeVendor(index) {
            this.dataForm.vendors_raw.splice(index, 1)
        },
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
        async sendFormData(){
            this.loading = true
            const finalDataForm = {...this.dataForm}
            finalDataForm.date_event = formatDateForApi(finalDataForm.date_event)
            this.$http
                .post('weddings/', finalDataForm)
                .then(this.showSuccessMessage, this.showErrorMessage)
                .finally(() => { this.loading = false })
        },
        showSuccessMessage() {
            this.success = true
        },
        showErrorMessage() {
            this.error = true
        },
        getErrorMessages(errors){
            return getErrorMessages(errors)
        }
    },
    validations: {
        dataForm: {
            sender_first_name: {required},
            sender_last_name: {required},
            sender_phone_number: {required},
            sender_email: {required, email},
            bride_first_name: {required},
            bride_last_name: {required},
            groom_first_name: {required},
            groom_last_name: {required},
            couple_email: {required, email},
            couple_phone_number: {required},
            date_event: {required},
            wedding_country: {required},
            wedding_region: {required},
            wedding_city: {required},
            media_link: {required, url},
            consent_publication: {isTrue},
            consent_personalities_publication: {isTrue},
            consent_cost_information: {isTrue},
            consent_photo_layouts: {isTrue},
            vendors_raw: {
                $each: {
                    category: {required},
                    business_name: {required},
                    contact_name: {required},
                    description: {required},
                    email: {required, email},
                    phone_number: {}
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.select-drop-down {
    width:100%;
    @include medium-and-large-screens {
        width: 50%;
        padding-right: 0.5rem;
    }
}

.full-width {
     width:100%;
     padding-right:0px;
}

#vendor-resources {
    width: 100%;
    .array-field {
        margin-top: 1rem;
    }

}

.add-field-input-button {
     margin-top: 1rem;
}


</style>
