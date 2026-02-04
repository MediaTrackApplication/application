<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

import type { MediaMeter, MediaMeterType } from '~/types/media-meter.type'
import { MEDIA_METER_CONFIG, MEDIA_METER_TYPES } from '~/types/media-meter.type'

const mediaTrackStore = useMediaTrackStore()

const emits = defineEmits<{ close: [boolean] }>()

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

    emits('close', false)
  } else {
    await mediaTrackStore.createMediaMeter({
      description: payload.data.description,
      group_id: mediaMeterGroupId,
      name: payload.data.name,
      type: payload.data.type,
      unit: payload.data.unit,
    })

    emits('close', false)
  }
}
</script>

<template>
  <UForm class="space-y-4" :schema :state @submit="onSubmit">
    <UPageCard :variant="mediaMeter ? 'outline' : 'naked'">
      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="A name identifying a media meter."
        label="Name"
        name="name"
      >
        <UInput class="w-full" v-model="state.name" size="xl" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Optional description containing additional details about a media meter."
        label="Description"
        name="description"
        size="lg"
      >
        <UTextarea class="w-full" v-model="state.description" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Determines the type of medium to which the meter applies."
        label="Type"
        name="type"
      >
        <USelect
          class="w-full"
          v-model="state.type"
          :icon
          :items
          @change="setUnit"
          placeholder="Select meter type"
          size="xl"
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
          class="w-full"
          v-model="state.unit"
          :disabled="state.type !== MEDIA_METER_TYPES.other"
          size="xl"
        />
      </UFormField>
    </UPageCard>

    <div class="mt-8 flex gap-4">
      <UButton color="neutral" size="lg" trailing-icon="i-lucide-arrow-down-to-line" type="submit">
        Save data
      </UButton>
    </div>
  </UForm>
</template>
