<template>
  <PageLayoutMargin>
    <form :id="id" @submit.prevent="handleSubmit" class="form">
      <div class="form-content">
        <slot />
      </div>
    </form>
  </PageLayoutMargin>
</template>

<script setup>
// Props
const props = defineProps({
  id: {
    type: String,
    required: false
  }
})

// Emit submit event
const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit')
}
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  max-width: 40rem;
}
</style>
