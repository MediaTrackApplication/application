<script setup lang="ts">
import type { MediaGroup } from '~/types/media-group.type'

const emits = defineEmits<{ close: [boolean] }>()

const { mediaGroup = undefined } = defineProps<{
  mediaGroup?: MediaGroup
}>()

const title = computed(() =>
  mediaGroup?.name ? `Edit media group: ${mediaGroup.name}` : 'Create new media group'
)
</script>

<template>
  <UModal overlay :title :close="{ onClick: () => emits('close', false) }">
    <slot />

    <template #body>
      <MediaGroupsBaseForm :media-group="mediaGroup" />
    </template>
  </UModal>
</template>
