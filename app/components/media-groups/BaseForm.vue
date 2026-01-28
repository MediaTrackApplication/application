<script setup lang="ts">
import * as z from 'zod'

import type { FormSubmitEvent } from '@nuxt/ui'
import type { MediaGroup } from '~/types/media-group.type'

const { mediaGroup = undefined } = defineProps<{
  mediaGroup?: MediaGroup
}>()

const mediaGroupsStore = useMediaGroupsStore()

const state = reactive({
  default_reading_day: mediaGroup?.default_reading_day ?? 10,
  description: mediaGroup?.description ?? '',
  is_default: mediaGroup?.is_default ?? false,
  name: mediaGroup?.name ?? '',
})

const schema = z.object({
  default_reading_day: z
    .number()
    .min(1, 'Day must be between 1 and 31')
    .max(31, 'Day must be between 1 and 31'),
  description: z.string().optional(),
  is_default: z.boolean().optional(),
  name: z.string().min(1, 'Name is required'),
})

const onSubmit = async (payload: FormSubmitEvent<MediaGroup>) => {
  if (mediaGroup) {
    await mediaGroupsStore.updateMediaGroup({
      default_reading_day: payload.data.default_reading_day,
      description: payload.data.description,
      id: mediaGroup.id,
      is_default: payload.data.is_default,
      name: payload.data.name,
    })
  } else {
    await mediaGroupsStore.createMediaGroup({
      description: payload.data.description,
      is_default: payload.data.is_default,
      name: payload.data.name,
    })
  }
}
</script>

<template>
  <UForm :schema :state class="space-y-4" @submit="onSubmit">
    <UPageCard :variant="mediaGroup ? 'outline' : 'naked'">
      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="A name identifying a media group."
        label="Name"
        name="name"
      >
        <UInput v-model="state.name" size="xl" required class="w-full" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="Optional description containing additional details about a media group."
        label="Description"
        name="description"
        size="lg"
      >
        <UTextarea v-model="state.description" class="w-full" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="The day of the month for reading the media meter."
        label="Default Reading Day"
        name="default_reading_day"
      >
        <UInput
          v-model="state.default_reading_day"
          class="w-full"
          max="31"
          min="1"
          required
          size="xl"
          type="number"
        />
      </UFormField>

      <USeparator />

      <UFormField
        :help="
          mediaGroupsStore.isOneMediaGroup
            ? 'Cannot disable default group when only one group exists.'
            : ''
        "
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        label="Set as default group"
        description="Specifies whether this media group should be automatically selected as the default."
      >
        <USwitch v-model="state.is_default" :disabled="mediaGroupsStore.isOneMediaGroup" />
      </UFormField>
    </UPageCard>

    <div class="mt-4 flex justify-end">
      <UButton color="neutral" trailing-icon="i-lucide-arrow-down-to-line" size="lg" type="submit">
        Save data
      </UButton>
    </div>
  </UForm>
</template>
