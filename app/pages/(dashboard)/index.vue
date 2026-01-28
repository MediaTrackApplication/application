<script setup lang="ts">
import { MEDIA_METER_CONFIG } from '~/types/media-meter.type'

import MediaMeterModal from '~/components/MediaMeterModal.vue'

const mediaGroupsStore = useMediaGroupsStore()
const overlay = useOverlay()

const modalMeter = overlay.create(MediaMeterModal)

const mediaGroups = computed(() =>
  mediaGroupsStore.getSelectedMediaGroupMeters?.map(group => ({
    color: MEDIA_METER_CONFIG[group.type]?.color,
    description: group.description,
    icon: MEDIA_METER_CONFIG[group.type]?.icon,
    id: group.id,
    title: group.name,
    type: group.type,
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
          icon="i-lucide-diamond"
          :ui="{ leadingIcon: 'text-black' }"
          :title="mediaGroupsStore.getSelectedMediaGroup?.name"
          spotlight-color="neutral"
          spotlight
        >
          <template #description>
            <p class="inline-flex">
              Default reading day:

              <UBadge color="neutral" size="md" class="ml-2">
                {{ mediaGroupsStore.getSelectedMediaGroup?.default_reading_day || '10' }}
              </UBadge>
            </p>
          </template>

          <template #footer>
            <div class="flex gap-2">
              <UButton
                color="neutral"
                icon="i-lucide-diamond"
                label="edit group"
                size="sm"
                variant="outline"
                :to="{
                  name: 'groups-id',
                  params: { id: mediaGroupsStore.getSelectedMediaGroup?.id },
                }"
              />

              <UButton
                color="neutral"
                icon="i-lucide-notebook-pen"
                size="sm"
                label="add group readings"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>

      <USeparator class="my-8" icon="i-lucide-arrow-down-from-line" />

      <UPageGrid
        v-if="mediaGroupsStore.getSelectedMediaGroupMeters?.length"
        class="grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <UPageCard
          v-for="(card, index) in mediaGroups"
          :key="index"
          :spotlight-color="card.color"
          :ui="{ leadingIcon: 'text-' + card.color }"
          spotlight
          v-bind="card"
          variant="subtle"
        >
          <template #title>
            <span class="text-xl">
              {{ card.title }}
              <span class="text-sm text-gray-400">measured in </span>
              <span class="text-md text-gray-400">{{ MEDIA_METER_CONFIG[card.type]?.unit }}</span>
            </span>
          </template>

          <template #footer>
            <div class="flex gap-2">
              <UButton
                :color="card.color"
                icon="i-lucide-circle-gauge"
                label="manage meter"
                size="sm"
                variant="outline"
              />

              <UButton
                :color="card.color"
                icon="i-lucide-notebook-pen"
                label="add meters reading"
                size="sm"
              />
            </div>
          </template>
        </UPageCard>

        <div class="ml-4 flex items-center">
          <UTooltip text="add new meter to the group">
            <UButton
              color="neutral"
              icon="i-lucide-circle-gauge"
              size="xl"
              @click="modalMeter.open()"
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
        <UButton
          color="neutral"
          icon="i-lucide-circle-gauge"
          label="add your first meter"
          size="sm"
          @click="modalMeter.open()"
        />
      </UAlert>
    </template>
  </UDashboardPanel>
</template>
