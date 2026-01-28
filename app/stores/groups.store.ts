import { defineStore } from 'pinia'

import type { MediaGroup } from '~/types/media-group.type'
import {
  SUPABASE_FUNCTIONS,
  type CreateMediaGroupParams,
  type UpdateMediaGroupParams,
  type DeleteMediaGroupParams,
} from '~/types/supabase.type'

export const useMediaGroupsStore = defineStore(
  'media-groups',
  () => {
    // States
    const areMediaGroupsLoaded = ref(false)
    const mediaGroups = ref<MediaGroup[]>()
    const selectedMediaGroupId = ref<string>()

    // Getters
    const getMediaGroups = computed(() => mediaGroups.value)

    const getSelectedMediaGroup = computed(() =>
      mediaGroups.value?.find(group =>
        selectedMediaGroupId.value ? group.id === selectedMediaGroupId.value : group.is_default
      )
    )

    const getSelectedMediaGroupMeters = computed(() =>
      getSelectedMediaGroup.value ? getSelectedMediaGroup.value.meters : []
    )

    const isOneMediaGroup = computed(() => mediaGroups.value?.length === 1)

    // Actions
    const fetchMediaGroups = async (hardLoad = false) => {
      if (areMediaGroupsLoaded.value && !hardLoad) return

      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.fetchMediaGroups).single()
        if (error) throw error

        mediaGroups.value = data
        areMediaGroupsLoaded.value = true
      } catch (error) {
        mediaGroups.value = undefined
        areMediaGroupsLoaded.value = false
        throw error
      }
    }

    const createMediaGroup = async (payload: Partial<MediaGroup>) => {
      const supabase = useSupabaseClient()

      const params: CreateMediaGroupParams = {
        p_description: payload.description || '',
        p_is_default: payload.is_default ?? true,
        p_name: payload.name!,
      }

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.createMediaGroup, params)

      if (error) throw error
      if (data) return await fetchMediaGroups(true)
    }

    const deleteMediaGroup = async (mediaGroupId: string) => {
      const supabase = useSupabaseClient()

      const params: DeleteMediaGroupParams = {
        p_group_id: mediaGroupId,
      }

      const { error } = await supabase.rpc(SUPABASE_FUNCTIONS.deleteMediaGroup, params)

      if (error) throw error
      return await fetchMediaGroups(true)
    }

    const updateMediaGroup = async (payload: Partial<MediaGroup>) => {
      const supabase = useSupabaseClient()

      const params: UpdateMediaGroupParams = {
        p_default_reading_day: payload.default_reading_day || 10,
        p_description: payload.description || '',
        p_group_id: payload.id!,
        p_is_default: payload.is_default ?? false,
        p_name: payload.name!,
      }

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.updateMediaGroup, params)

      if (error) throw error
      if (data) return await fetchMediaGroups(true)
    }

    return {
      // States
      areMediaGroupsLoaded,
      mediaGroups,
      selectedMediaGroupId,

      // Getters
      getMediaGroups,
      getSelectedMediaGroup,
      getSelectedMediaGroupMeters,
      isOneMediaGroup,

      // Actions
      createMediaGroup,
      deleteMediaGroup,
      fetchMediaGroups,
      updateMediaGroup,
    }
  },
  {
    persist: true,
  }
)
