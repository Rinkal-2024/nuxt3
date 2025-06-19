<template>
    <Form id="contact-form">
        <Title>
            Contact Us
        </Title>
        <FormGeneralErrorMessage name="nonFieldErrors"/>
        <FormFields>
            <FieldsTitle>Feedback topic</FieldsTitle>
            <SelectDropDown 
                details-id= "feedback-category-details"
                select-class="select-feedback-category"
                :items="FEEDBACK_OPTIONS"
                required
                placeholder-text="Feedback category*"
                with-field-error
            />
            <FieldsTitle>Personal information*</FieldsTitle>
            <InputField
                id="first-name-input"
                placeholder="First name*"
                name="firstName"
                required
                v-model="dataForm.first_name"
                :has-error="$v.dataForm.first_name.$error"
                @blur="$v.dataForm.first_name.$touch()"
            />
            <InputField
                id="last-name-input"
                placeholder="Last name*"
                name="lastName"
                required
                v-model="dataForm.last_name"
                :has-error="$v.dataForm.last_name.$error"
                @blur="$v.dataForm.last_name.$touch()"
            />
            <InputField
                id="email-input"
                fullWidth
                placeholder="Email Address*"
                name="email"
                required
                type="email"
                v-model="dataForm.email"
                :has-error="$v.dataForm.email.$error"
                :error-message="getErrorMessages($v.dataForm.email)"
                @blur="$v.dataForm.email.$touch()"
            />
            <InputField id="phone-input" type="tel" placeholder="Phone number" name="phoneNumber" v-model="dataForm.phone_number"/>
            <InputField id="company-name-input" placeholder="Company name" name="companyName" v-model="dataForm.company_name"/>
            <InputField id="title-input" fullWidth placeholder="Title" name="title" v-model="dataForm.title"/>
            <FieldsTitle>Location</FieldsTitle>
            <InputField
                id="address-input"
                fullWidth
                placeholder="Address"
                name="address"
                v-model="dataForm.address"
            />
            <InputField
                id="city-input"
                placeholder="City"
                name="city"
                v-model="dataForm.city"
            />
            <InputField
                id="state-input"
                placeholder="State/Region/Province"
                name="region"
                v-model="dataForm.region"
            />
            <InputField
                id="zip-input"
                placeholder="Zip Code"
                name="zip"
                v-model="dataForm.zip_code"
            />
            <InputField
                id="country-input"
                placeholder="Country"
                name="country"
                v-model="dataForm.country"
            />
            <FieldsTitle>Message*</FieldsTitle>
            <TextareaField
                id="message-input"
                fullWidth
                required
                name="message"
                v-model="dataForm.message"
                :has-error="$v.dataForm.message.$error"
                @blur="$v.dataForm.message.$touch()"
            />
        </FormFields>
        <FormButtons>
            <div id="contact-error" class="error hidden">Unknown error has occurred, please try again later.</div>
            <Button id="contact-submit" type="submit" >Submit</Button>
            <div id="contact-loading" class="hidden"><LoadingIndicator/></div>
            <span id="contact-success" class="hidden">Your form has been successfully submitted, thank you!</span>
        </FormButtons>
    </Form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import FEEDBACK_OPTIONS from '~/constants/feedbackOptions'
import {required, email} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {getErrorMessages} from "~/utils/validation";
import {getMetaUri, requestData} from "~/utils/api";

export default {
    name: "index.vue",
    mixins: [validationMixin],
    head() {
        return this.$store.getters['api/contact/head']
    },
    async asyncData({req, $http, store, route}) {

        const [meta] = await requestData(
            $http,
            getMetaUri(req, route),
        )

        await store.dispatch('api/contact/hydrate', {
            meta,
        })

    },
    data() {
        return {
            FEEDBACK_OPTIONS: FEEDBACK_OPTIONS,
            dataForm: {
                category: '',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                company_name: '',
                title: '',
                address: '',
                city: '',
                region: '',
                zip_code: '',
                country: '',
                message: ''
            },
            loading: false,
            success: false,
            error: false,
        }
    },
    methods: {
        submitForm () {
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
            const finalDataForm = {...this.dataForm}
            finalDataForm.category = this.dataForm.category.value
            this.$http.post('contact/', finalDataForm).then(() => {
                this.success = true
            }, () => {
                this.error = true
            }).finally(() => {
                this.loading = false
            })
        },
        getErrorMessages(errors){
            return getErrorMessages(errors)
        }
    },
    validations: {
        dataForm: {
            first_name: {required},
            last_name: {required},
            email: {required, email},
            message: {required},
            category: {required},
        }
    }
}
</script>

<style scoped lang="scss">

.select-drop-down {
    z-index: 10;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    border: none;
}

</style>
