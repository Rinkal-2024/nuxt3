<template>
    <ul class="social-links">
        <li class="social-links__item">
        <a
            :href="SOCIAL_MEDIA_FACEBOOK_LINK"
            rel="nofollow noopener noreferrer"
            target="_blank"
        >
        <svg :style="style" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><title>Inside weddings pinterest</title><g fill="none" fill-rule="evenodd"><circle stroke="#E6E6E6" cx="12.5" cy="12.5" r="12"/><path d="M10.66 13.312v5.572h2.604v-5.545h1.775l.429-2.308h-2.184V9.33a.492.492 0 0 1 .48-.544h1.267V6.429h-2.366a2.388 2.388 0 0 0-2.01 2.154v2.377h-1.37v2.34l1.374.012z" fill="#000" fill-rule="nonzero"/></g></svg>
        </a>
        </li>
        <li class="social-links__item">
        <a
            :href="SOCIAL_MEDIA_PINTEREST_LINK"
            rel="nofollow noopener noreferrer"
            target="_blank"
        >
        <svg :style="style" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><title>Inside weddings pinterest</title><g fill="none" fill-rule="evenodd"><circle stroke="#E6E6E6" cx="12.5" cy="12.5" r="12"/><path d="M7.143 12.5a5.357 5.357 0 0 0 3.207 4.907c-.016-.374-.003-.824.093-1.23l.69-2.92s-.172-.342-.172-.847c0-.794.46-1.387 1.033-1.387.487 0 .723.366.723.804 0 .49-.313 1.223-.473 1.901-.134.569.285 1.032.845 1.032 1.015 0 1.699-1.303 1.699-2.848 0-1.174-.79-2.053-2.23-2.053-1.624 0-2.637 1.212-2.637 2.566 0 .466.138.795.354 1.05.099.117.112.164.077.299l-.11.43c-.035.135-.145.184-.268.134-.748-.306-1.097-1.125-1.097-2.047 0-1.522 1.284-3.346 3.829-3.346 2.045 0 3.391 1.48 3.391 3.068 0 2.102-1.168 3.672-2.89 3.672-.579 0-1.123-.313-1.309-.668 0 0-.311 1.235-.377 1.473-.113.413-.336.826-.54 1.147A5.357 5.357 0 1 0 7.143 12.5z" fill="#000" fill-rule="nonzero"/></g></svg>
        </a>
         </li>
        <li class="social-links__item">
        <a
            :href="SOCIAL_MEDIA_INSTAGRAM_LINK"
            rel="nofollow noopener noreferrer"
            target="_blank"
        >
        <svg :style="style" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><title>Inside weddings instagram</title><g fill="none" fill-rule="evenodd"><circle stroke="#E6E6E6" cx="12.5" cy="12.5" r="12"/><path d="M15.735 12.499c0 1.794-1.45 3.249-3.237 3.249a3.243 3.243 0 0 1-3.176-3.872h-2.18v4.306a1.676 1.676 0 0 0 1.677 1.675h7.362c.924.001 1.674-.749 1.676-1.675v-4.306h-2.183c.04.204.06.412.06.62l.001.003zm.446-5.356H8.82a1.666 1.666 0 0 0-1.184.487c-.315.314-.492.74-.492 1.186v1.814H9.85a3.245 3.245 0 0 1 2.646-1.37c1.05 0 2.037.51 2.646 1.37h2.712V8.816a1.674 1.674 0 0 0-1.674-1.673zm.822 2.064a.303.303 0 0 1-.299.304h-.902a.305.305 0 0 1-.303-.304V8.31a.302.302 0 0 1 .303-.297h.9A.3.3 0 0 1 17 8.31l.003.897zM14.488 12.5a1.998 1.998 0 0 0-1.228-1.848c-.744-.31-1.6-.14-2.17.432a2.003 2.003 0 0 0-.432 2.178 1.99 1.99 0 0 0 3.247.65 2 2 0 0 0 .583-1.412z" fill="#000" fill-rule="nonzero"/></g></svg>
        </a>
         </li>
        <li class="social-links__item">
        <a
            :href="SOCIAL_MEDIA_TWITTER_LINK"
            rel="nofollow noopener noreferrer"
            target="_blank"
        >
        <svg :style="style" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><title>Inside weddings twitter</title><g fill="none" fill-rule="evenodd"><circle stroke="#E6E6E6" cx="12.5" cy="12.5" r="12"/><path d="M17.857 8.957a4.38 4.38 0 0 1-1.265.37c.461-.293.805-.754.967-1.297-.43.272-.902.465-1.393.57-.616-.703-1.58-.933-2.422-.578-.843.355-1.39 1.222-1.378 2.18-.002.179.015.358.05.533-1.772-.095-3.42-.988-4.527-2.451-.195.36-.3.768-.3 1.183 0 .78.365 1.51.976 1.95a2.087 2.087 0 0 1-.992-.293v.026c-.003 1.11.73 2.07 1.76 2.303-.189.053-.383.08-.577.078-.14.002-.28-.012-.417-.042.286.95 1.109 1.604 2.052 1.633a4.239 4.239 0 0 1-3.248.969 5.913 5.913 0 0 0 3.37 1.052c1.669 0 3.269-.705 4.443-1.957 1.174-1.253 1.824-2.949 1.805-4.71 0-.105 0-.204-.008-.302a4.603 4.603 0 0 0 1.101-1.217" fill="#000" fill-rule="nonzero"/></g></svg>
        </a>
         </li>
    </ul>
</template>

<script>
import {
    SOCIAL_MEDIA_FACEBOOK_LINK,
    SOCIAL_MEDIA_PINTEREST_LINK,
    SOCIAL_MEDIA_INSTAGRAM_LINK,
    SOCIAL_MEDIA_TWITTER_LINK
} from '~/constants/socialLinks'
export default {
    name: 'SocialLinks',
    props: {
        lightIcons: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        SOCIAL_MEDIA_FACEBOOK_LINK,
        SOCIAL_MEDIA_PINTEREST_LINK,
        SOCIAL_MEDIA_INSTAGRAM_LINK,
        SOCIAL_MEDIA_TWITTER_LINK
    }),
    computed: {
        style() {
            return this.lightIcons ? 'filter: invert(1) brightness(7);' : ''
        }
    }
}
</script>

<style scoped lang="scss">

.social-links {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
    .social-links__item {
        
        margin: 0 0.15rem;
        white-space: nowrap;

        a {
            display: flex;
        }

        padding: 10px ; /* Increase the padding to expand the tap target */
        min-width: 48px; /* Set a minimum width for the tap target */
        min-height: 48px; /* Set a minimum height for the tap target */   
        @include medium-and-large-screens {
            @include apply-zero-padding-and-margin-for-first-and-last-child;
            padding: 0 ;
            min-width: 25px;
            min-height: 25px;
        }
    }
      
}
</style>
