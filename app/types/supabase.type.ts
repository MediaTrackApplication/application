export const SUPABASE_FUNCTIONS = {
  fetchUserMediaData: 'fetch_user_media_data',

  createMediaGroup: 'create_media_group',
  deleteMediaGroup: 'delete_media_group',
  updateMediaGroup: 'update_media_group',

  createMediaMeter: 'create_media_meter',
  deleteMediaMeter: 'delete_media_meter',
  updateMediaMeter: 'update_media_meter',

  createMediaReading: 'create_media_reading',
  deleteMediaReading: 'delete_media_reading',
  updateMediaReading: 'update_media_reading',
} as const

export interface SupabasePayload<T> {
  p_payload: T
}
