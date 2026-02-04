<script lang="ts" setup>
import * as z from 'zod'

import type { FormSubmitEvent } from '@nuxt/ui'
import type { MediaGroup } from '~/types/media-group.type'

const emits = defineEmits<{ close: [boolean] }>()

const { mediaGroup = undefined } = defineProps<{
  mediaGroup?: MediaGroup
}>()

const mediaTrackStore = useMediaTrackStore()

const schema = z.object({
  default_reading_day: z
    .number()
    .min(1, 'Day must be between 1 and 31')
    .max(31, 'Day must be between 1 and 31')
    .default(10),
  description: z.string().optional(),
  is_default: z.boolean().optional(),
  name: z.string().min(1, 'Name is required'),
})

const state = reactive({
  default_reading_day: mediaGroup?.default_reading_day ?? 10,
  description: mediaGroup?.description ?? '',
  is_default: mediaGroup?.is_default ?? false,
  name: mediaGroup?.name ?? '',
})

const onSubmit = async (payload: FormSubmitEvent<MediaGroup>) => {
  if (mediaGroup) {
    if (
      mediaGroup.default_reading_day === payload.data.default_reading_day &&
      mediaGroup.description === payload.data.description &&
      mediaGroup.is_default === payload.data.is_default &&
      mediaGroup.name === payload.data.name
    )
      return

    await mediaTrackStore.updateMediaGroup({
      default_reading_day: payload.data.default_reading_day,
      description: payload.data.description,
      id: mediaGroup.id,
      is_default: payload.data.is_default,
      name: payload.data.name,
    })

    emits('close', false)
  } else {
    await mediaTrackStore.createMediaGroup({
      default_reading_day: payload.data.default_reading_day,
      description: payload.data.description,
      is_default: payload.data.is_default,
      name: payload.data.name,
    })

    emits('close', false)
  }
}
</script>

<template>
  <UForm class="space-y-4" :schema :state @submit="onSubmit">
    <UPageCard :variant="mediaGroup ? 'outline' : 'naked'">
      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="A name identifying a media group."
        label="Name"
        name="name"
      >
        <UInput class="w-full" v-model="state.name" required size="xl" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Optional description containing additional details about a media group."
        label="Description"
        name="description"
        size="lg"
      >
        <UTextarea class="w-full" v-model="state.description" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="The day of the month for reading the media meter."
        label="Default Reading Day"
        name="default_reading_day"
      >
        <UInput
          class="w-full"
          v-model="state.default_reading_day"
          max="31"
          min="1"
          required
          size="xl"
          type="number"
        />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        :help="
          mediaGroup?.id && mediaTrackStore.isOneMediaGroup
            ? 'Cannot disable default group when only one group exists.'
            : ''
        "
        description="Specifies whether this media group should be automatically selected as the default."
        label="Set as default group"
      >
        <USwitch
          v-model="state.is_default"
          :disabled="!!mediaGroup?.id && mediaTrackStore.isOneMediaGroup"
        />
      </UFormField>
    </UPageCard>

    <div class="mt-4 flex justify-end">
      <UButton color="neutral" size="lg" trailing-icon="i-lucide-arrow-down-to-line" type="submit">
        Save data
      </UButton>
    </div>
  </UForm>
</template>
