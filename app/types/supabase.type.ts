export const SUPABASE_FUNCTIONS = {
  fetchMediaGroups: 'get_user_groups_with_meters',

  createMediaGroup: 'create_media_group',
  deleteMediaGroup: 'delete_media_group',
  updateMediaGroup: 'update_media_group',

  createMediaMeter: 'create_media_meter',
  deleteMediaMeter: 'delete_media_meter',
  updateMediaMeter: 'update_media_meter',

  upsertMediaMeterReading: 'upsert_media_reading',
} as const

export interface CreateMediaGroupParams {
  p_description: string
  p_is_default: boolean
  p_name: string
}

export interface UpdateMediaGroupParams {
  p_default_reading_day: number
  p_description: string
  p_group_id: string
  p_is_default: boolean
  p_name: string
}

export interface DeleteMediaGroupParams {
  p_group_id: string
}

export interface CreateMediaMeterParams {
  p_group_id: string
  p_name: string
  p_type: string
  p_unit: string
  p_description: string
}

export interface UpdateMediaMeterParams {
  p_meter_id: string
  p_name: string
  p_type: string
  p_unit: string
  p_description: string
}

export interface DeleteMediaMeterParams {
  p_group_id: string
  p_meter_id: string
}

export interface UpsertMediaMeterReadingParams {
  p_meter_id: string
  p_reading_month: string
  p_reading_day: number
  p_reading_value: number
}
