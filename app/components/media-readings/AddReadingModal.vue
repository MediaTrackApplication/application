<script setup lang="ts">
import type { MediaMeter } from '~/types/media-meter.type'
import type { MediaReading } from '~/types/media-reading.type'

const emits = defineEmits<{ close: [boolean] }>()

const { mediaMeter, mediaReading = undefined } = defineProps<{
  mediaMeter: MediaMeter
  mediaReading?: MediaReading
}>()

const title = computed(() =>
  mediaReading?.id
    ? `Edit meter reading: ${mediaReading.id}`
    : `Add new reading for: ${mediaMeter.name} meter`
)
</script>

<template>
  <UModal overlay :title :close="{ onClick: () => emits('close', false) }">
    <slot />

    <template #body>
      <MediaReadingsMeterReadingForm
        :media-meter-id="mediaMeter.id || ''"
        :media-reading="mediaReading"
      />
    </template>
  </UModal>
</template>
