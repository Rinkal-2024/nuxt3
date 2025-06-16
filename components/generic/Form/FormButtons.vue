<template>
    <div class="form-buttons">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "FormButtons"
}
</script>

<style scoped lang="scss">
.form-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    button {
        margin: 0 0.5rem;
    }
}
</style>
