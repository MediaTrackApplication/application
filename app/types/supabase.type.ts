export const SUPABASE_FUNCTIONS = {
  createMediaGroup: 'create_media_group',
  deleteMediaGroup: 'delete_media_group',
  fetchMediaGroups: 'get_user_groups_with_meters',
  updateMediaGroup: 'update_media_group',
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
