import { defineStore } from 'pinia'

import type { MediaGroup } from '~/types/media-group.type'
import type { MediaMeter } from '~/types/media-meter.type'
import {
  SUPABASE_FUNCTIONS,
  type CreateMediaGroupParams,
  type UpdateMediaGroupParams,
  type DeleteMediaGroupParams,
  type CreateMediaMeterParams,
  type UpdateMediaMeterParams,
  type DeleteMediaMeterParams,
} from '~/types/supabase.type'

export const useMediaTrackStore = defineStore(
  'media-track',
  () => {
    // States
    const areMediaGroupsLoaded = ref(false)
    const mediaGroups = ref<MediaGroup[]>()
    const mediaMeter = ref<MediaMeter>()
    const selectedMediaGroupId = ref<string>()

    // Getters
    const getMediaGroups = computed(() => mediaGroups.value)

    const getMediaMeter = computed(() => mediaMeter.value)

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

        mediaGroups.value = Array.isArray(data) ? (data as unknown as MediaGroup[]) : undefined
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

    const createMediaMeter = async (payload: Partial<MediaMeter>) => {
      const supabase = useSupabaseClient()

      const params: CreateMediaMeterParams = {
        p_group_id: payload.group_id!,
        p_name: payload.name!,
        p_type: payload.type!,
        p_unit: payload.unit || '',
        p_description: payload.description || '',
      }

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.createMediaMeter, params)

      if (error) throw error
      if (data) return await fetchMediaGroups(true)
    }

    const updateMediaMeter = async (payload: Partial<MediaMeter>) => {
      const supabase = useSupabaseClient()

      const params: UpdateMediaMeterParams = {
        p_meter_id: payload.id!,
        p_name: payload.name!,
        p_type: payload.type!,
        p_unit: payload.unit || '',
        p_description: payload.description || '',
      }

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.updateMediaMeter, params)

      if (error) throw error
      if (data) return await fetchMediaGroups(true)
    }

    const deleteMediaMeter = async (mediaGroupId: string, mediaMeterId: string) => {
      const supabase = useSupabaseClient()

      const params: DeleteMediaMeterParams = {
        p_group_id: mediaGroupId,
        p_meter_id: mediaMeterId,
      }

      const { error } = await supabase.rpc(SUPABASE_FUNCTIONS.deleteMediaMeter, params)

      if (error) throw error
      return await fetchMediaGroups(true)
    }

    return {
      // States
      areMediaGroupsLoaded,
      mediaGroups,
      selectedMediaGroupId,

      // Getters
      getMediaMeter,
      getMediaGroups,
      getSelectedMediaGroup,
      getSelectedMediaGroupMeters,
      isOneMediaGroup,

      // Actions
      createMediaGroup,
      createMediaMeter,
      deleteMediaGroup,
      fetchMediaGroups,
      updateMediaGroup,
      updateMediaMeter,
      deleteMediaMeter,
    }
  },
  {
    persist: true,
  }
)
