<script setup lang="ts">
import type { MediaGroup } from '~/types/media-group.type'

const emits = defineEmits<{ close: [boolean] }>()

const props = defineProps<{
  mediaGroup?: MediaGroup
}>()

const title = computed(() =>
  props.mediaGroup?.name ? `Edit media group: ${props.mediaGroup.name}` : 'Create new media group'
)
</script>

<template>
  <UModal overlay :title :close="{ onClick: () => emits('close', false) }">
    <slot />

    <template #body>
      <MediaGroupBaseForm :media-group="props.mediaGroup" />
    </template>
  </UModal>
</template>
