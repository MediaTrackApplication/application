<script lang="ts" setup>
import { MEDIA_METER_CONFIG, type MediaMeterType } from '~/types/media-meter.type'

import MediaMetersCreateModal from '~/components/media-meters/CreateModal.vue'

const mediaTrackStore = useMediaTrackStore()
const overlay = useOverlay()

const modalMeter = overlay.create(MediaMetersCreateModal)

const mediaMeters = computed(() =>
  mediaTrackStore.getSelectedMediaGroupMeters?.map(group => ({
    ...group,
    color: MEDIA_METER_CONFIG[group.type as MediaMeterType]?.color,
    icon: MEDIA_METER_CONFIG[group.type as MediaMeterType]?.icon,
  }))
)
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar title="Dashboard">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right></template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageSection title="Hello, Guest!" />

      <UPageGrid class="grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <UPageCard
          :title="mediaTrackStore.getSelectedMediaGroup?.name"
          :ui="{ leadingIcon: 'text-black' }"
          icon="i-lucide-diamond"
          spotlight
          spotlight-color="neutral"
        >
          <template #description>
            <p class="inline-flex">
              Default reading day:

              <UBadge class="ml-2" color="neutral" size="md">
                {{ mediaTrackStore.getSelectedMediaGroup?.default_reading_day || '10' }}
              </UBadge>
            </p>
          </template>

          <template #footer>
            <div class="flex gap-2">
              <UButton
                :to="{
                  name: 'groups-groupId',
                  params: { groupId: mediaTrackStore.getSelectedMediaGroup?.id },
                }"
                color="neutral"
                icon="i-lucide-diamond"
                label="edit group"
                size="sm"
                variant="outline"
              />

              <UButton
                color="neutral"
                icon="i-lucide-notebook-pen"
                label="add group readings"
                size="sm"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>

      <USeparator class="my-8" icon="i-lucide-arrow-down-from-line" />

      <UPageGrid
        class="grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        v-if="mediaTrackStore.getSelectedMediaGroupMeters?.length"
      >
        <MediaMetersCard
          v-for="(mediaMeter, index) in mediaMeters"
          :key="index"
          :media-meter="mediaMeter"
        />

        <div class="flex h-full items-center justify-center">
          <UTooltip text="add new meter to the group">
            <UButton
              @click="
                modalMeter.open({
                  mediaMeterGroupId: mediaTrackStore.getSelectedMediaGroup?.id || '',
                })
              "
              color="neutral"
              icon="i-lucide-circle-gauge"
              size="xl"
            />
          </UTooltip>
        </div>
      </UPageGrid>

      <UAlert
        v-else
        color="neutral"
        description="This group has no meters yet. Meters let you track electricity, water, gas and more."
        title="Heads up!"
        variant="subtle"
      >
        <template #actions>
          <UButton
            @click="
              modalMeter.open({
                mediaMeterGroupId: mediaTrackStore.getSelectedMediaGroup?.id || '',
              })
            "
            color="neutral"
            icon="i-lucide-circle-gauge"
            label="add your first meter"
            size="sm"
          />
        </template>
      </UAlert>
    </template>
  </UDashboardPanel>
</template>
