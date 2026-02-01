<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

import type { MediaMeter, MediaMeterType } from '~/types/media-meter.type'
import { MEDIA_METER_CONFIG, MEDIA_METER_TYPES } from '~/types/media-meter.type'

const mediaTrackStore = useMediaTrackStore()

const { mediaMeter = undefined, mediaMeterGroupId } = defineProps<{
  mediaMeter?: MediaMeter
  mediaMeterGroupId: string
}>()

const schema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  unit: z.string().min(1, 'Unit is required'),
})

const state = reactive({
  description: mediaMeter?.description || '',
  name: mediaMeter?.name || '',
  type: mediaMeter?.type || '',
  unit: mediaMeter?.unit || '',
})

const items = computed(() =>
  Object.entries(MEDIA_METER_CONFIG).map(([key, config]) => ({
    icon: config.icon,
    label: key,
    value: key,
  }))
)

const icon = computed(() => items.value.find(item => item.value === state.type)?.icon)

const setUnit = () => {
  if (state.type && MEDIA_METER_CONFIG[state.type as MediaMeterType])
    state.unit = MEDIA_METER_CONFIG[state.type as MediaMeterType].unit
}

const onSubmit = async (payload: FormSubmitEvent<MediaMeter>) => {
  if (mediaMeter) {
    if (
      mediaMeter.description === payload.data.description &&
      mediaMeter.name === payload.data.name &&
      mediaMeter.type === payload.data.type &&
      mediaMeter.unit === payload.data.unit
    )
      return

    await mediaTrackStore.updateMediaMeter({
      description: payload.data.description,
      id: mediaMeter.id,
      name: payload.data.name,
      type: payload.data.type,
      unit: payload.data.unit,
    })
  } else {
    await mediaTrackStore.createMediaMeter({
      group_id: mediaMeterGroupId,
      description: payload.data.description,
      name: payload.data.name,
      type: payload.data.type,
      unit: payload.data.unit,
    })
  }
}
</script>

<template>
  <UForm :schema :state class="space-y-4" @submit="onSubmit">
    <UPageCard :variant="mediaMeter ? 'outline' : 'naked'">
      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="A name identifying a media meter."
        label="Name"
        name="name"
      >
        <UInput v-model="state.name" size="xl" class="w-full" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Optional description containing additional details about a media meter."
        label="Description"
        name="description"
        size="lg"
      >
        <UTextarea v-model="state.description" class="w-full" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Determines the type of medium to which the meter applies."
        label="Type"
        name="type"
      >
        <USelect
          v-model="state.type"
          :items
          :icon
          size="xl"
          placeholder="Select meter type"
          class="w-full"
          @change="setUnit"
        />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Specifies the unit of measurement in which the meter reading is recorded."
        label="Unit"
        name="unit"
      >
        <UInput
          v-model="state.unit"
          size="xl"
          :disabled="state.type !== MEDIA_METER_TYPES.other"
          class="w-full"
        />
      </UFormField>
    </UPageCard>

    <div class="mt-8 flex gap-4">
      <UButton trailing-icon="i-lucide-arrow-down-to-line" color="neutral" type="submit" size="lg">
        Save data
      </UButton>
    </div>
  </UForm>
</template>
