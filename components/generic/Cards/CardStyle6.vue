<template>
    <div class="card card-style-6">
        <Video
            :video="video"
            class="card__video"
        />
    </div>
</template>

<script>
export default {
    name: 'CardStyle6',
    props: {
        video: {
            type: Object,
            required: true
        },
    },
}
</script>

<style lang="scss" scoped>

.card {
    width: 100%;
    max-width: 30rem;
    display:inline-block;
    padding:0.5rem;
    vertical-align: top;
    position: relative;
    text-align: center;
    min-height: 17.3rem;
}

::v-deep .card__video {
    height: 16.3rem;
    width: 100%;
    flex-shrink: 0;
}

</style>
