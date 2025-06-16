<template>
    <div class="social-input">
        <div class="social-icon-wrapper">
            <Icon
                class="social-icon"
                v-if="iconName"
                :name="iconName"
            />
        </div>
        <AutocompleteSelectField
            class="autocomplete-select-field"
            :options="socialPlatformOptions"
            value=""
            name=""
            v-model="innerValue.platform"
            reduce-value
            transparent
            @change="updateValue"
        />
        <InputField
            type="url"
            class="input-field"
            name=""
            v-model="innerValue.url"
            @input="updateValue"
            :has-error="hasError"
            :error-message="errorMessage"
        />
        <button
            type="button"
            @click="$emit('remove')"
            class="remove-button-icon"
            title="Delete this social"
            aria-label="Delete social"
        >
            <Icon name="trash"/>
        </button>
    </div>

</template>

<script>
import socialPlatforms from '~/constants/socialPlatforms'

export default {
    name: "SocialMediaField",
    model: {
        event: 'change',
        prop: 'value'
    },
    props: {
        value: {
            type: Object,
            required: true
        },
        hasError: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: 'This field is required.'
        }
    },
    data: () => ({
        socialPlatforms,
        innerValue: {
            platform: '',
            url: ''
        }
    }),
    mounted () {
        this.innerValue = this.value
    },
    methods: {
        updateValue () {
            this.$emit('change', this.innerValue)
        }
    },
    computed: {
        socialPlatformOptions () {
            return Object.keys(this.socialPlatforms).map(key => ({
                label: this.socialPlatforms[key].label,
                value: this.socialPlatforms[key].value
            }))
        },
        iconName () {
            return this.socialPlatforms[this.innerValue.platform]?.iconName
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.social-input {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
}

.autocomplete-select-field {
    flex: 0 1 50%;
    padding-left: 42px;

    @include medium-and-large-screens {
        flex: 0 1 25%;
    }
}

.autocomplete-select-input {
    background-color: $color-darker-white;
    border-right: none;
    border-left: none;
}

.autocomplete-select-field {
    ::v-deep {
        .vs__dropdown-toggle.vs__dropdown-toggle {
            border: none;
            font-size: 10px;
        }
    }
}

.input-field {
    flex: 1 1;
    z-index: $social-input-url-z-index;
}

$social-icon-size: 1.6rem;
.social-icon-wrapper {
    display: flex;
    align-items: center;
    padding: 0 0 0 0.25rem;
    height: 2.4rem;
    border: $input-border-size solid $input-border-color;
    background-color: $color-darker-white;
    box-shadow: inset 0 0 0.1rem $color-darker-white,
    0 0 0.1rem $color-darker-white;
    border-right: none;
    position: absolute;
    left: 0;
    top: 0;
    //width: calc(#{$social-icon-size} + 0.5rem);
    width: 242px;

    .social-icon {
        width: $social-icon-size;
        height: $social-icon-size;
        padding: 0.25rem;
    }
}

.remove-button-icon {
    @include button-as-normal-text;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    height: 2rem;
    line-height: 0;
    background-color: $color-white;
    position: absolute;
    padding: 0 0.25rem;
    right: 0.2rem;
    z-index: $social-input-remove-button-z-index;
    outline: none;
    &:hover {
        background-color: $color-white;
    }

    svg {
        width: 0.9rem;
        height: 0.9rem;
        fill: $color-dark-grey;
        transition: fill 0.1s ease-in-out;
    }

    &:hover {
        svg {
            fill: $color-black;
        }
    }
}

</style>
