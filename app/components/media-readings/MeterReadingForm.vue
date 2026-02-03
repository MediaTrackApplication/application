<script setup lang="ts">
import * as z from 'zod'
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'

import type { FormSubmitEvent } from '@nuxt/ui'
import type { MediaReading } from '~/types/media-reading.type'

const { mediaMeterId, mediaReading = undefined } = defineProps<{
  mediaMeterId: string
  mediaReading?: MediaReading
}>()

const mediaTrackStore = useMediaTrackStore()

const getDate = today(getLocalTimeZone())

const minDate = new CalendarDate(getDate.year, getDate.month, 1)

const maxDate = new CalendarDate(
  getDate.year,
  getDate.month,
  getDate.calendar.getDaysInMonth(getDate)
)

const state = reactive({
  reading_day: shallowRef(new CalendarDate(getDate.year, getDate.month, getDate.day)),
  reading_value: 0,
})

const schema = z.object({
  reading_day: z.any(),
  reading_value: z.number(),
})

const onSubmit = async (payload: FormSubmitEvent<MediaReading>) => {
  await mediaTrackStore.upsertMediaMeterReading({
    meter_id: mediaMeterId,
    reading_day: payload.data.reading_day?.day,
    reading_month: new Date(getDate.year, getDate.month, 1).toISOString(),
    reading_value: payload.data.reading_value,
  })
}
</script>

<template>
  <UForm :schema :state class="space-y-4" @submit="onSubmit">
    <UPageCard :variant="mediaReading ? 'outline' : 'naked'">
      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="The value of the media meter reading."
        label="Reading value"
        name="reading_value"
      >
        <UInput v-model="state.reading_value" size="xl" required class="w-full" type="number" />
      </UFormField>

      <USeparator />

      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="The day the media meter reading was taken."
        label="Reading day"
        name="reading_day"
        size="lg"
      >
        <UInputDate
          v-model="state.reading_day"
          size="xl"
          required
          class="w-full"
          :min-value="minDate"
          :max-value="maxDate"
        />
      </UFormField>
    </UPageCard>

    <div class="mt-4 flex justify-end">
      <UButton color="neutral" trailing-icon="i-lucide-arrow-down-to-line" size="lg" type="submit">
        Save data
      </UButton>
    </div>
  </UForm>
</template>
