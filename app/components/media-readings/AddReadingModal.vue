<script lang="ts" setup>
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
  <UModal :close="{ onClick: () => emits('close', false) }" :title overlay>
    <slot />

    <template #body>
      <MediaReadingsMeterReadingForm
        :media-meter="mediaMeter"
        :media-reading="mediaReading"
        @close="emits('close', false)"
      />
    </template>
  </UModal>
</template>
