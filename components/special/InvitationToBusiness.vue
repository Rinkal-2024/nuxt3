<template>
    <div class="vendor-invitation-to-business">
        <h3 class="title">Are You a Business?</h3>
        <Link :to="{ name: 'work-with-us' }" class="link">
            FIND OUT MORE DETAILS
        </Link>
    </div>
</template>

<script>
export default {
    name: 'InvitationToBusiness'
}
</script>

<style scoped lang="scss">
// @import "~/assets/styles/partials";

.vendor-invitation-to-business {
    display: flex;
    flex-direction: column;
    text-align: center;
    flex: 0 0 20%;
    margin-top: 2rem;

    @include medium-and-large-screens {
        align-self: center;
        padding-left: 1rem;
        margin-top: 0;
    }
}

.title {
    @include apply-font-and-size("heading", 3);
    font-weight: 100;
    margin: 0;
}

.link {
    letter-spacing: 0.05rem;
    text-decoration: underline;
}


</style>
