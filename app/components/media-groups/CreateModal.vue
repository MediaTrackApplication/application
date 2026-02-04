<script lang="ts" setup>
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
  <UModal :close="{ onClick: () => emits('close', false) }" :title overlay>
    <slot />

    <template #body>
      <MediaGroupsBaseForm :media-group="mediaGroup" @close="emits('close', false)" />
    </template>
  </UModal>
</template>
