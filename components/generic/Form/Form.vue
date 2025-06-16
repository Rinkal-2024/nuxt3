<template>
    <PageLayoutMargin>
        <form :id="id" @submit.prevent="$emit('submit')" class="form">
            <div class="form-content">
                <slot />
            </div>
        </form>
    </PageLayoutMargin>
</template>

<script>
export default {
    name: "Form",
    props: {
            id: {
                type: String,
            },
        },
}
</script>

<style scoped lang="scss">
.form{
    width: 100%;
    display: flex;
    justify-content: center;

}

.form-content{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    max-width: 40rem;
}

</style>
