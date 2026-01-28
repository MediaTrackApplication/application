<script setup lang="ts">
import * as z from 'zod'

import type { FormSubmitEvent } from '@nuxt/ui'
import type { MediaMeter, MediaMeterType } from '~/types/media-meter.type'
import { MEDIA_METER_CONFIG, MEDIA_METER_TYPES } from '~/types/media-meter.type'

const emits = defineEmits<{ close: [boolean] }>()

const props = defineProps<{
  mediaMeter?: MediaMeter
}>()

const schema = z.object({
  description: z.string().optional(),
  icon: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  unit: z.string().min(1, 'Unit is required'),
})

const state = reactive({
  name: '',
  type: '' as MediaMeterType,
  unit: '',
})

const items = computed(() =>
  Object.entries(MEDIA_METER_CONFIG).map(([key, config]) => ({
    icon: config.icon,
    label: key,
    value: key,
  }))
)

const icon = computed(() => items.value.find(item => item.value === state.type)?.icon)

const title = computed(() =>
  props.mediaMeter?.name ? `Edit media meter: ${props.mediaMeter.name}` : 'Create new media meter'
)

const setUnit = () => {
  if (state.type && MEDIA_METER_CONFIG[state.type]) state.unit = MEDIA_METER_CONFIG[state.type].unit
}

const onSubmit = async (payload: FormSubmitEvent<MediaMeter>) => {
  console.log('Submitting media meter:', payload)
}
</script>

<template>
  <UModal overlay :title :close="{ onClick: () => emits('close', false) }">
    <slot />

    <template #body>
      <UForm :schema :state class="space-y-4" @submit="onSubmit">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" size="xl" />
        </UFormField>

        <UFormField label="Type" name="type">
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

        <UFormField label="Unit" name="unit">
          <UInput
            v-model="state.unit"
            size="xl"
            :disabled="state.type !== MEDIA_METER_TYPES.other"
          />
        </UFormField>

        <div class="mt-8 flex gap-4">
          <UButton
            color="neutral"
            size="lg"
            type="button"
            variant="outline"
            @click="emits('close', true)"
          >
            Cancel
          </UButton>

          <UButton
            trailing-icon="i-lucide-arrow-down-to-line"
            color="neutral"
            type="submit"
            size="lg"
          >
            Save
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
