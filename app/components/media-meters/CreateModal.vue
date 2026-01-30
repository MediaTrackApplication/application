<script setup lang="ts">
import type { MediaMeter } from '~/types/media-meter.type'

const emits = defineEmits<{ close: [boolean] }>()

const { mediaMeter = undefined, mediaMeterGroupId } = defineProps<{
  mediaMeter?: MediaMeter
  mediaMeterGroupId: string
}>()

const title = computed(() =>
  mediaMeter?.name ? `Edit media meter: ${mediaMeter.name}` : 'Create new media meter'
)
</script>

<template>
  <UModal overlay :title :close="{ onClick: () => emits('close', false) }">
    <slot />

    <template #body>
      <MediaMetersBaseForm :media-meter="mediaMeter" :media-meter-group-id="mediaMeterGroupId" />
    </template>
  </UModal>
</template>
