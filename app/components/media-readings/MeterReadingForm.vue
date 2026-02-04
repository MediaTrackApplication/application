<script lang="ts" setup>
import * as z from 'zod'
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'

import type { FormSubmitEvent } from '@nuxt/ui'
import type { MediaReading } from '~/types/media-reading.type'
import type { MediaMeter } from '~/types/media-meter.type'

const emits = defineEmits<{ close: [boolean] }>()

const { mediaMeter, mediaReading = undefined } = defineProps<{
  mediaMeter: MediaMeter
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

const schema = z.object({
  reading_day: z.custom<CalendarDate>(val => val instanceof CalendarDate),
  reading_value: z.number(),
})

type FormSchema = z.output<typeof schema>

const state = reactive({
  reading_day: shallowRef(new CalendarDate(getDate.year, getDate.month, getDate.day)),
  reading_value: 0,
})

const onSubmit = async (payload: FormSubmitEvent<FormSchema>) => {
  if (mediaReading) {
    if (
      mediaReading.reading_day === payload.data.reading_day?.day &&
      mediaReading.reading_value === payload.data.reading_value
    )
      return

    await mediaTrackStore.updateMediaReading({
      id: mediaReading.id,
      meter_id: mediaMeter.id,
      reading_day: payload.data.reading_day?.day,
      reading_value: payload.data.reading_value,
    })
    emits('close', true)
  } else {
    await mediaTrackStore.createMediaReading({
      meter_id: mediaMeter.id,
      reading_day: payload.data.reading_day?.day,
      reading_month: new Date(minDate.year, minDate.month, 1),
      reading_value: payload.data.reading_value,
    })
    emits('close', true)
  }
}
</script>

<template>
  <UForm class="space-y-4" :schema :state @submit="onSubmit">
    <UPageCard :variant="mediaReading ? 'outline' : 'naked'">
      <UFormField
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
        description="The value of the media meter reading."
        label="Reading value"
        name="reading_value"
      >
        <UInput class="w-full" v-model="state.reading_value" required size="xl" type="number" />
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
          class="w-full"
          v-model="state.reading_day"
          :max-value="maxDate"
          :min-value="minDate"
          required
          size="xl"
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
