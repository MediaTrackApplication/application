export const MEDIA_METER_TYPES = {
  electricity: 'electricity',
  water: 'water',
  cold_water: 'cold_water',
  hot_water: 'hot_water',
  gas: 'gas',
  heat: 'heat',
  other: 'other',
} as const

export const MEDIA_METER_CONFIG = {
  [MEDIA_METER_TYPES.electricity]: {
    color: 'warning',
    icon: 'i-lucide-zap',
    key: MEDIA_METER_TYPES.electricity,
    unit: 'kWh',
  },

  [MEDIA_METER_TYPES.water]: {
    color: 'info',
    icon: 'i-lucide-droplet',
    key: MEDIA_METER_TYPES.water,
    unit: 'm³',
  },
  [MEDIA_METER_TYPES.cold_water]: {
    color: 'info',
    icon: 'i-lucide-droplet',
    key: MEDIA_METER_TYPES.cold_water,
    unit: 'm³',
  },
  [MEDIA_METER_TYPES.hot_water]: {
    color: 'info',
    icon: 'i-lucide-droplet',
    key: MEDIA_METER_TYPES.hot_water,
    unit: 'm³',
  },

  [MEDIA_METER_TYPES.gas]: {
    color: 'error',
    icon: 'i-lucide-flame',
    key: MEDIA_METER_TYPES.gas,
    unit: 'm³',
  },

  [MEDIA_METER_TYPES.heat]: {
    color: 'error',
    icon: 'i-lucide-thermometer',
    key: MEDIA_METER_TYPES.heat,
    unit: 'GJ',
  },

  [MEDIA_METER_TYPES.other]: {
    color: 'primary',
    key: MEDIA_METER_TYPES.other,
    unit: '',
    icon: 'i-lucide-hash',
  },
} as const

export type MediaMeterType = keyof typeof MEDIA_METER_TYPES

export interface MediaMeter {
  description?: string
  icon?: string
  id?: string
  name: string
  type: MediaMeterType
  unit: string
}
