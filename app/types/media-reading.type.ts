export interface MediaReading {
  id?: string
  last_reading?: MediaReading
  meter_id: string
  reading_day?: number
  reading_month?: Date
  reading_value?: number
}

export const MEDIA_READING_STATUSES = {
  late: 'late',
  missed: 'missed',
  ok: 'ok',
} as const

const MEDIA_READING_STATUSES_COLORS = {
  [MEDIA_READING_STATUSES.late]: 'warning',
  [MEDIA_READING_STATUSES.missed]: 'error',
  [MEDIA_READING_STATUSES.ok]: 'success',
} as const

export type MediaReadingStatus =
  (typeof MEDIA_READING_STATUSES)[keyof typeof MEDIA_READING_STATUSES]

export type MediaReadingStatusColor =
  (typeof MEDIA_READING_STATUSES_COLORS)[keyof typeof MEDIA_READING_STATUSES_COLORS]
