<script lang="ts" setup>
import { MEDIA_METER_CONFIG, type MediaMeter, type MediaMeterType } from '~/types/media-meter.type'

import MediaReadingsAddReadingModal from '~/components/media-readings/AddReadingModal.vue'

const overlay = useOverlay()

const { mediaMeter } = defineProps<{
  mediaMeter: MediaMeter
}>()

const modalReading = overlay.create(MediaReadingsAddReadingModal)
</script>

<template>
  <UPageCard
    class="relative"
    :description="mediaMeter.description"
    :spotlight-color="mediaMeter.color"
    :ui="{ leadingIcon: 'text-' + mediaMeter.color }"
    spotlight
    variant="subtle"
  >
    <template #title>
      <span class="text-xl">
        {{ mediaMeter.name }}
        <span class="text-sm text-gray-400">measured in </span>
        <span class="text-md text-primary">
          {{ MEDIA_METER_CONFIG[mediaMeter.type as MediaMeterType]?.unit }}
        </span>
      </span>
    </template>

    <template #default>
      <UBadge class="absolute top-2 right-2" color="neutral">status</UBadge>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          :color="mediaMeter.color"
          :to="{
            name: 'groups-groupId-meters-meterId',
            params: {
              groupId: '12',
              meterId: mediaMeter.id,
            },
          }"
          icon="i-lucide-circle-gauge"
          label="manage meter"
          size="sm"
          variant="outline"
        />

        <UButton
          :color="mediaMeter.color"
          @click="modalReading.open({ mediaMeter: mediaMeter })"
          icon="i-lucide-notebook-pen"
          label="add meters reading"
          size="sm"
        />
      </div>
    </template>
  </UPageCard>
</template>
