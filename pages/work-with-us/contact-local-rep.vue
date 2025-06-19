<template>

    <Form id="rep-form">
        <Title>Want More Exposure?</Title>
        <FormDescription>
            A listing on InsideWeddings.com will greatly increase your visibility on the web. Please provide your
            information below and we'll contact you soon.
        </FormDescription>
        <FormGeneralErrorMessage name="nonFieldErrors"/>
        <FormFields>
            <FieldsTitle>BUSINESS INFORMATION *</FieldsTitle>
            <InputField
                id="name-input"
                placeholder="Name*"
                name="name"
                required
                v-model="dataForm.name"
                :has-error="$v.dataForm.name.$error"
                @blur="$v.dataForm.name.$touch()"
                fullWidth
            />
            <InputField
                id="title-input" 
                placeholder="Title"
                name="title"
                v-model="dataForm.title"
            />
            <InputField
                id="company-name-input"
                placeholder="Company name"
                name="companyName"
                v-model="dataForm.company_name"
            />
            <InputField
                id="client-name-input"
                placeholder="Client name (if different from company name)"
                name="clientName"
                v-model="dataForm.client_name"
                fullWidth
            />
            <SelectDropDown 
                details-id= "vendor-category-details"
                select-class="select-vendor-category"
                :items="vendorCategories"
                placeholder-text="Category*"
                with-field-error
            />
            <InputField
                id="email-input"
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
                id="phone-input"
                placeholder="Phone Number*"
                name="phoneNumber"
                required
                type="tel"
                v-model="dataForm.phone_number"
                :has-error="$v.dataForm.phone_number.$error"
                @blur="$v.dataForm.phone_number.$touch()"
            />
            <InputField
                id="website-input"
                type="url"
                placeholder="Website URL (include https://)"
                name="website"
                v-model="dataForm.website"
            />
            <FieldsTitle>Location</FieldsTitle>
            <InputField
                id="address-input"
                placeholder="Address"
                name="address"
                v-model="dataForm.address"
                fullWidth
            />
            <InputField id="city-input" placeholder="City" name="city" v-model="dataForm.city"/>
            <InputField id="state-input" placeholder="State/Region/Province" name="region" v-model="dataForm.region"/>
            <InputField id="zip-input" placeholder="Zip code" name="zip" v-model="dataForm.zip"/>
            <InputField id="country-input" placeholder="Country" name="country" v-model="dataForm.country"/>

            <FieldsTitle>I'm interested in:</FieldsTitle>
            <CheckboxField
                label="PRINT ADVERTISING"
                name="printAdvertising"
                v-model="dataForm.print_advertising"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="DIGITAL ADVERTISING"
                name="digitalAdvertising"
                v-model="dataForm.digital_advertising"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="EDITORS CIRCLE MEMBERSHIP"
                name="editorsCircleMembership"
                v-model="dataForm.editors_circle_membership"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="BUSINESS MEMBERSHIPS"
                name="businessMembership"
                v-model="dataForm.business_membership"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="EMAIL BLASTS"
                name="emailBlasts"
                v-model="dataForm.email_blasts"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="NEWSLETTERS"
                name="newsletters"
                v-model="dataForm.newsletters"
                with-field-error
                appearance="form"
            />
            <CheckboxField
                label="SPONSORED CONTENT"
                name="sponsoredContent"
                v-model="dataForm.sponsored_content"
                with-field-error
                appearance="form"
            />
        </FormFields>
        <FormButtons>
            <div id="rep-error" class="error hidden">Unknown error has occurred, please try again later.</div>
            <Button id="rep-submit" type="submit" >Submit</Button>
            <div id="rep-loading" class="hidden"><LoadingIndicator/></div>
            <span id="rep-success" class="hidden">Your form has been successfully submitted, thank you!</span>
        </FormButtons>
    </Form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {mapGetters} from "vuex";
import {email, required, url, alphaNum} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {getErrorMessages} from "~/utils/validation";

const {getMetaUri, requestData, createParamsString} = require('~/utils/api')

const isTrue = (value) => value === true

export default {
    name: 'contactLocalRep',
    mixins: [validationMixin],
    async asyncData({req, $http, store, route}) {
        const vendorCategoriesParams = {
            fields: '*',
        }
        const vendorCategoriesParamsParsed = createParamsString(vendorCategoriesParams)

        const [meta, data, countries] = await requestData(
            $http,
            getMetaUri(req, route),
            `vendor_categories/${vendorCategoriesParamsParsed}`
        )

        await store.dispatch('api/weddingsSubmit/hydrate', {
            meta,
            data
        })

    },
    data() {
        return {
            loading: false,
            success: false,
            error: false,
            dataForm: {
                name: '',
                title: '',
                company_name: '',
                clientName: '',
                category: '',
                email: '',
                phone_number: '',
                website: '',
                address: '',
                city: '',
                region: '',
                country: '',
                print_advertising: false,
                digital_advertising: false,
                editors_circle_membership: false,
                business_membership: false,
                email_blasts: false,
                newsletters: false,
                sponsored_content: false
            }
        }
    },
    computed: {
        ...mapGetters('api/weddingsSubmit', ['vendorCategories'])
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
        async sendFormData(){
            this.loading = true
            this.$http.post('local_rep_contact/', this.dataForm)
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
            name: { required },
            //title: { alphaNum },
            //company_name: { alphaNum },
            //client_name: { alphaNum },
            category: { required },
            email: { required, email },
            phone_number: { required },
            website: { url },
            //address: { alphaNum },
            //city: { alphaNum },
            //region: { alphaNum },
            //country: { alphaNum }
        }
    }
}
</script>

<style scoped lang="scss">

.select-drop-down {
    width:100%;
    @include medium-and-large-screens {
        width: 50%;
        padding-right: 0.5rem;
    }
}

</style>
