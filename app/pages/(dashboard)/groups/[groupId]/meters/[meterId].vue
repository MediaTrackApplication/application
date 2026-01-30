<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

definePageMeta({
  middleware: ['media-group'],
})

const mediaTrackStore = useMediaTrackStore()

const mediaGroup = computed(() => {
  const groupId = useRoute().params.groupId as string
  return mediaTrackStore.mediaGroups?.find(g => g.id === groupId)
})

const mediaMeter = computed(() => {
  const groupId = useRoute().params.groupId as string
  const meterId = useRoute().params.meterId as string
  const group = mediaTrackStore.mediaGroups?.find(g => g.id === groupId)
  return group?.meters?.find(m => m.id === meterId)
})

const items: TabsItem[] = [
  {
    label: 'Meter data',
    icon: 'i-lucide-diamond',
    slot: 'base' as const,
  },
  {
    label: 'Meter readings',
    icon: 'i-lucide-circle-gauge',
    slot: 'meters' as const,
  },
  {
    label: 'Danger zone',
    icon: 'i-lucide-shield',
    slot: 'danger-zone' as const,
  },
]
</script>

<template>
  <UDashboardPanel id="media-meter">
    <template #header>
      <UDashboardNavbar title="Media meter">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right></template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageSection :title="mediaMeter?.name" description="Manage media meter." />

      <div class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12">
        <UTabs :items="items" color="neutral">
          <template #base>
            <MediaMetersBaseForm
              :media-meter-group-id="mediaGroup?.id || ''"
              :media-meter="mediaMeter"
            />
          </template>

          <template #meters> </template>

          <template #danger-zone>
            <MediaMetersDangerZoneForm
              :media-meter-group-id="mediaGroup?.id || ''"
              :media-meter="mediaMeter"
            />
          </template>
        </UTabs>
      </div>
    </template>
  </UDashboardPanel>
</template>
