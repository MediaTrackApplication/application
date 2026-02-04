import type { MediaMeter } from './media-meter.type'

export interface MediaGroup {
  default_reading_day?: number
  description?: string
  id?: string
  is_default?: boolean
  meters?: MediaMeter[]
  name?: string
}
