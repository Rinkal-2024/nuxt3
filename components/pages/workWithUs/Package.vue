<template>
    <div
        class="package"
        :class="{'alternative-colour-version': alternativeColourVersion}"
    >
        <div class="name">{{ membership.name }}</div>
        <div class="price">
            <span class="free-package" v-if="membership.price === 0">FREE</span>
            <template v-else>
                <span class="prefix-text">{{ membership.prefix }}</span>
                <span class="currency">$</span>
                {{ membership.price }}
                <span class="appendix-text">{{ membership.appendix }}</span>
            </template>
        </div>
        <span class="subtitle" v-html="membership.subhead"/>
        <span class="description" v-html="membership.description"/>
        <Link class="link" :to="linkTo">
            <Button class="button">{{ membership.button_label }}</Button>
        </Link>
    </div>
</template>

<script>
export default {
    name: "Package",
    props: {
        alternativeColourVersion: {
            type: Boolean,
            default: false
        },
        membership: {
            type: Object,
            required: true
        }
    },
    computed: {
        linkTo() {
            return `/${this.membership.url}`
        }
    }
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.package {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    flex: 0 0 calc(25% - 0.5rem);
    border: $border-width solid $color-black;
    padding: 1.5rem 0.25rem;
    background-color: $color-white;
    margin-top: 1rem;
    @include medium-and-large-screens {
        margin-top: 0;
    }

    &.alternative-colour-version {
        color: $color-white;
        background-color: $color-black;

        .name,
        .price,
        .subtitle,
        .description {
            color: white;
        }

        .button {
            color: $color-black;
            background-color: $color-white;
            border: $border-width solid $color-white;

            &:hover {
                color: $color-white;
                background-color: $color-black;
                border: $border-width solid $color-black;
            }
        }
    }
}

.name {
    @include apply-font-and-size("heading", 9);
    text-transform: uppercase;
    font-weight: 100;
}

.price {
    display: flex;
    align-items: baseline;
    width: 100%;
    justify-content: center;
    margin: 0.8rem 0 0 0;

    @include apply-font-and-size("heading", 2);

    .price-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .freePackage {
        color: $color-silver;
        text-transform: lowercase;
    }

    .appendix-text,
    .currency,
    .prefix-text {
        @include apply-font-and-size("heading", 10);
        @include medium-and-large-screens {
          @include apply-font-and-size("heading", 6);
        }

       
    }

    .appendix-text,
    .prefix-text {
        font-style: italic;
    }

    .prefix-text {
        margin-right: 0.25rem;
    }

    .appendix-text {
        margin-left: 0.25rem;
    }

    .currency {
        align-self: flex-start;
    }
}

.subtitle {
    margin-top: 1rem;
    flex: 0 1 auto;
    @include medium-and-large-screens {
        margin-top: 1.75rem;
    }

    ::v-deep {
        p {
            @include apply-font-and-size("label", 7);
            text-transform: uppercase;
            letter-spacing: 0.05rem;
            margin: 0;
        }
    }
}

.description {
    @include apply-font-and-size("paragraph", 5);
    text-align: left;
    font-weight: 100;
   
}

.link {
    margin-top: auto;
}

.button {
    margin-top: 0.5rem;
    letter-spacing: 0.1rem;
    font-weight: 100;
}

.subtitle.subtitle {

  ::v-deep {
    &, * {
      font-size: .9rem;
    }
  }

}

.description.description {

  ::v-deep {

      @include medium-and-large-screens {
          &, * {
               font-size: .7rem;
          }
      }

      @include small-and-medium-screens {
          &, * {
              font-size: 1rem;
              line-height: 2rem;
          }
      }

  }

}

</style>
