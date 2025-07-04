<template>
    <Form id="request-info-form">
        <Title>Request Info</Title>
        <!--        <FormGeneralErrorMessage name={"nonFieldErrors"} />-->
        <FormFields>
            <FieldsTitle>Personal information</FieldsTitle>
            <InputField
                placeholder="First name*"
                required
                name="firstName"
                id="first-name-input"
                v-model="dataForm.first_name"
                @blur="$v.dataForm.first_name.$touch"
                :has-error="$v.dataForm.first_name.$error"
            />
            <InputField
                placeholder="Last name*"
                required
                name="lastName"
                id="last-name-input"
                v-model="dataForm.last_name"
                @blur="$v.dataForm.last_name.$touch"
                :has-error="$v.dataForm.last_name.$error"
            />
            <InputField
                placeholder="Email Address*"
                required
                name="email"
                type="email"
                id="email-input"
                v-model="dataForm.email"
                @blur="$v.dataForm.email.$touch"
                :has-error="$v.dataForm.email.$error"
            />
            <InputField
                placeholder="Phone number*"
                required
                name="phone"
                type="tel"
                id="phone-input"
                v-model="dataForm.phone"
                @blur="$v.dataForm.phone.$touch"
                :has-error="$v.dataForm.phone.$error"
            />
            <FieldsTitle>Wedding</FieldsTitle>
            <InputField
                placeholder="Wedding Date"
                name="weddingDate"
                id="wedding-date-input"
                type="text"
            />
            <InputField 
                placeholder="Location" 
                name="location"
                id="location-input"
            />
            <FieldsTitle>Message *</FieldsTitle>
            <TextareaField
                fullWidth
                name="message"
                required
                id="message-input"
                v-model="dataForm.message"
                @blur="$v.dataForm.message.$touch"
                :has-error="$v.dataForm.message.$error"
            />
        </FormFields>
                    
        <FormButtons>
            <div id="request-info-error" class="error hidden">Oops. Something went wrong.</div>
            <Button id="request-info-submit" type="submit" >Submit</Button>
            <div id="request-info-loading" class="hidden"><LoadingIndicator/> </div>
            <span id="request-info-success" class="hidden">Your form has been successfully submitted, thank you!</span>
        </FormButtons>
    </Form>

</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {email, required} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {formatDateForApi} from "~/utils/date";

export default {
    name: "request-info",
    mixins: [validationMixin],
    head: () => ({
        meta: [
            { hid: 'robots', name: 'robots', content: 'noindex' }
        ]
    }),
    data: () => ({
        dataForm: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            wedding_date: '',
            location: '',
            message: ''
        },
        loading: false
    }),
    methods: {
        submitForm() {
            //console.log(this.$route.params.id)
            if(!this.$v.dataForm.$invalid){
                this.sendFormData()
            } else {
                this.$v.dataForm.$touch()
                this.$nextTick(() => {
                    this.$el.querySelector('.with-error')?.scrollIntoView({behavior: 'smooth', block: 'center'})
                })
            }
        },
        async sendFormData() {
            this.loading = true
            const finalDataForm = {...this.dataForm}
            finalDataForm.wedding_date = formatDateForApi(this.dataForm.wedding_date)
            await this.$http.post(`vendors/${this.$route.params.id}/request_info`, finalDataForm)
            this.loading = false
        }
    },
    validations: {
        dataForm: {
            first_name: {required},
            last_name: {required},
            email: {required, email},
            phone: {required},
            message: {required}
        }
    }
}
</script>

<style scoped>

</style>
