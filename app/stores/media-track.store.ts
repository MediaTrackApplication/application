import { defineStore } from 'pinia'

import type { MediaGroup } from '~/types/media-group.type'
import type { MediaMeter } from '~/types/media-meter.type'
import type { MediaReading } from '~/types/media-reading.type'
import { SUPABASE_FUNCTIONS } from '~/types/supabase.type'

export const useMediaTrackStore = defineStore(
  'media-track',
  () => {
    // States
    const areMediaGroupsLoaded = ref(false)
    const mediaGroups = ref<MediaGroup[]>([])
    const mediaMeter = ref<MediaMeter>()
    const selectedMediaGroupId = ref<string>()

    // Getters
    const getMediaGroups = computed(() => mediaGroups.value)

    const getMediaMeter = computed(() => mediaMeter.value)

    const getSelectedMediaGroup = computed(() => {
      if (!mediaGroups.value.length) return undefined

      return (
        mediaGroups.value.find(g => g.id === selectedMediaGroupId.value) ??
        mediaGroups.value.find(g => g.is_default) ??
        mediaGroups.value[0]
      )
    })

    const getSelectedMediaGroupMeters = computed(() =>
      getSelectedMediaGroup.value ? getSelectedMediaGroup.value.meters : []
    )

    const isOneMediaGroup = computed(() => mediaGroups.value?.length === 1)

    // Actions
    const fetchUserMediaData = async (hardLoad = false) => {
      if (areMediaGroupsLoaded.value && !hardLoad) return

      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.fetchUserMediaData).single()
        if (error) throw error

        mediaGroups.value = Array.isArray(data) ? (data as unknown as MediaGroup[]) : []
        areMediaGroupsLoaded.value = true
      } catch (error) {
        mediaGroups.value = []
        areMediaGroupsLoaded.value = false
        throw error
      }
    }

    // Media Group Actions
    const createMediaGroup = async (p_payload: Partial<MediaGroup>) => {
      const supabase = useSupabaseClient()

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.createMediaGroup, {
        p_payload,
      })

      if (error) throw error
      if (data) return await fetchUserMediaData(true)
    }

    const updateMediaGroup = async (p_payload: Partial<MediaGroup>) => {
      const supabase = useSupabaseClient()

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.updateMediaGroup, {
        p_payload,
      })

      if (error) throw error
      if (data) return await fetchUserMediaData(true)
    }

    const deleteMediaGroup = async (id: string) => {
      const supabase = useSupabaseClient()

      const { error } = await supabase.rpc(SUPABASE_FUNCTIONS.deleteMediaGroup, {
        p_payload: {
          id,
        },
      })

      if (error) throw error
      return await fetchUserMediaData(true)
    }

    // Media Meter Actions
    const createMediaMeter = async (p_payload: Partial<MediaMeter>) => {
      const supabase = useSupabaseClient()

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.createMediaMeter, {
        p_payload,
      })

      if (error) throw error
      if (data) return await fetchUserMediaData(true)
    }

    const updateMediaMeter = async (p_payload: Partial<MediaMeter>) => {
      const supabase = useSupabaseClient()

      const { data, error } = await supabase.rpc(SUPABASE_FUNCTIONS.updateMediaMeter, {
        p_payload,
      })

      if (error) throw error
      if (data) return await fetchUserMediaData(true)
    }

    const deleteMediaMeter = async (id: string) => {
      const supabase = useSupabaseClient()

      const { error } = await supabase.rpc(SUPABASE_FUNCTIONS.deleteMediaMeter, {
        p_payload: {
          id,
        },
      })

      if (error) throw error
      return await fetchUserMediaData(true)
    }

    // Media Meter Reading Actions
    const createMediaReading = async (p_payload: Partial<MediaReading>) => {
      const supabase = useSupabaseClient()

      const { error } = await supabase.rpc(SUPABASE_FUNCTIONS.createMediaReading, {
        p_payload,
      })

      if (error) throw error
      return await fetchUserMediaData(true)
    }

    const updateMediaReading = async (p_payload: Partial<MediaReading>) => {
      const supabase = useSupabaseClient()

      const { error } = await supabase.rpc(SUPABASE_FUNCTIONS.updateMediaReading, {
        p_payload,
      })

      if (error) throw error
      return await fetchUserMediaData(true)
    }

    return {
      // States
      areMediaGroupsLoaded,
      mediaGroups,
      selectedMediaGroupId,

      // Getters
      getMediaGroups,
      getMediaMeter,
      getSelectedMediaGroup,
      getSelectedMediaGroupMeters,
      isOneMediaGroup,

      // Actions
      createMediaGroup,
      createMediaMeter,
      createMediaReading,
      deleteMediaGroup,
      deleteMediaMeter,
      fetchUserMediaData,
      updateMediaGroup,
      updateMediaMeter,
      updateMediaReading,
    }
  },
  {
    persist: true,
  }
)
