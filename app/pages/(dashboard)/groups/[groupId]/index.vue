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

const items: TabsItem[] = [
  {
    label: 'Group data',
    icon: 'i-lucide-diamond',
    slot: 'base' as const,
  },
  {
    label: 'Group meters',
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
  <UDashboardPanel id="media-group">
    <template #header>
      <UDashboardNavbar title="Media group">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right></template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageSection :title="mediaGroup?.name" description="Manage media group." />

      <div class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12">
        <UTabs :items="items" color="neutral">
          <template #base>
            <MediaGroupsBaseForm :media-group />
          </template>

          <template #meters> </template>

          <template #danger-zone>
            <MediaGroupsDangerZoneForm :media-group />
          </template>
        </UTabs>
      </div>
    </template>
  </UDashboardPanel>
</template>
