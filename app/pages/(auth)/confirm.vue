<script lang="ts" setup>
const user = useSupabaseUser()

watch(
  user,
  () => {
    if (user.value) return navigateTo('/')
  },
  { immediate: true }
)
</script>

<template>
  <main>Waiting for user...</main>
</template>
