<template>
    <div class="select-drop-down" :class="{ 'disabled': disabled }" :style="setZIndex">
        <FieldTitle v-if="fieldTitle !== ''">{{fieldTitle}}</FieldTitle>
        <details :id="detailsId">
            <summary class="radios">
                <input type="radio" :name="radioButtonGroup" :id="generateDefault" class="placeholder" :title="placeholderText" checked>
                <input v-if="allText !== ''" type="radio" :name="radioButtonGroup" id="all" :title="allText">
                <input v-for="type in items" :key="type"
                    type="radio"
                    :name="radioButtonGroup"
                    :id="type.value"
                    :title="type.label"
                >
            </summary>
            <ul class="list">
                <li v-if="allText !== ''"><label :class="selectClass" for="all">{{allText}}</label></li>
                <li v-for="type in items" :key="type">
                    <label :class="selectClass" :for="type.value">{{type.label}}</label>
                </li>
            </ul>
        </details>
         <FormFieldErrorMessage
            v-if="withFieldError"
            class="form-field-error-message"
            :name="radioButtonGroup"
            error-message="This field is required."
        />
    </div>
</template>

<script>
export default {
    name: 'SelectDropDown',
    props: {
       detailsId:{
            required: true,
            type: String
        },
        selectClass:{
            required: true,
            type: String
        },
        placeholderText: {
            required: true,
            type: String
        },
        allText: {
            type: String,
            default: ''
        },
        items: {
         required: true,
         type: Array
        },
        fieldTitle: {
            type: String,
            default: ''
        },
        withFieldError: {
            type: Boolean,
            default:false
        },
        radioButtonGroup: {
            type: String,
            default: "type"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: null
        },
    },
    computed: {
        setZIndex() {
            return {
                zIndex: this.zIndex !== null ? this.zIndex : 10
            };
        },
        generateDefault() {
            return 'default-' + (Math.random().toString(36).substr(2, 4).toUpperCase());
        }
    }
}
</script>

<style scoped lang="scss">

.disabled {
    opacity: $disabled-element-opacity;
    border-color: $input-border-disabled-color;
    box-shadow: none;
    pointer-events: none;
    cursor: not-allowed;

    summary {
        background-color: #d6d6d4 !important;
    }
}



.select-drop-down {
    z-index: 10;

    .field-title {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0.6rem;
        font-family: Nunito,sans-serif;
        font-size: .6rem;
        line-height: .8rem;
    }

    details {
        position: relative;
        width: 100%;
    }

    details.with-error {
        border: 1px solid #f77;
    }

    details[open] {
        z-index: 1;
    }

    .placeholder {
        opacity: 0.5;
    }

    summary {
        position: relative;
        cursor: pointer;
        border-radius: 0px;
        list-style: none;
        border: 1px solid #d6d6d4;
        @include apply-font-and-size("label", 4);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 6);
        }
        background-color: #fff;
        font-weight: 100;
        height: calc(2.5rem - 2px);
        letter-spacing: .1rem;
        text-transform: uppercase;
        padding: 0.72rem;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    details[open] summary:before {
        content: '';
        display: block;
        width: 100vw;
        height: 100vh;
        background: transparent;
        position: fixed;
        top: 0;
        left: 0;
    }

    summary:after {
        content: '';
        display: block;
        width: .5rem;
        height: .5rem;
        border-bottom: 1px solid currentColor;
        border-left: 1px solid currentColor;
        border-bottom-left-radius: 2px;
        transform: translateY(-50%) rotate(45deg);
        transition: transform ease-in-out 100ms;
        position: absolute;
        top: 50%;
        right: .5em;
    }

    summary:focus {
        outline: none;
    }

    details[open] summary:after {
        transform: translateY(-50%) rotate(-45deg);
    }

    ul {
        list-style-type: none;
        width: 100%;
        background: #ddd;
        position: absolute;
        top: calc(100% + .5rem);
        left: 0;
        padding: 1rem;
        padding-top: 0.7rem;
        margin: 0;
        box-sizing: border-box;
        border-radius: 5px;
        overflow-y: auto;
    }

    li {
        margin: 0;
        padding: 7px 20px;
    }

    li:last-child {
        padding-bottom: 0;
        border-bottom: none;
    }

    /* FAKE SELECT */

    summary.radios {
        counter-reset: var(--radios);
    }

    summary.radios:before {
        content: var(--selection);
    }

    input[type=radio] {
        counter-increment: var(--radios);
        appearance: none;
        display: none;
        pointer-events: none;
    }

    input[type=radio]:checked {
        display: inline;
        --display: block;
        @include apply-font-and-size("label", 4);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 6);
        }
        background-color: transparent;
        font-weight: 100;
        letter-spacing: .1rem;
        text-transform: uppercase;
    }

    input[type=radio]:after {
        content: attr(title);
        display: inline;
    }

    ul.list {
        counter-reset: var(--labels);
    }

    label {
        width: 100%;
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        text-transform: uppercase;
        letter-spacing: .1rem;
        @include apply-font-and-size("label", 4);
        @include medium-and-large-screens {
            @include apply-font-and-size("label", 6);
        }
    }

    li:hover {
        background: #f7f7f7;
    }

    label span {
        --display: none;
        display: var(--display);
        width: 1rem;
        height: 1rem;
        border: 1px solid #727272;
        border-radius: 3px;
    }
}

</style>
