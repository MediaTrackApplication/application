<script setup lang="ts">
import MediaGroupsCreateModal from '~/components/media-groups/CreateModal.vue'

const mediaGroupsStore = useMediaGroupsStore()
const overlay = useOverlay()

const modal = overlay.create(MediaGroupsCreateModal)

const mediaGroups = computed(() =>
  mediaGroupsStore.mediaGroups?.map(group => ({
    description: group.description,
    icon: 'i-lucide-grid-2x2-check',
    id: group.id,
    isDefault: group.is_default,
    title: group.name,
    to: {
      name: 'groups-id',
      params: { id: group.id },
    },
  }))
)
</script>

<template>
  <UDashboardPanel id="media-groups">
    <template #header>
      <UDashboardNavbar title="Media groups">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right></template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageSection
        title="your media groups"
        description="manage media groups assigned to your account."
      >
        <template #links>
          <UButton
            color="neutral"
            icon="i-lucide-grid-2x2-plus"
            size="xl"
            label="create new media group"
            @click="modal.open()"
          />
        </template>
      </UPageSection>

      <UPageGrid class="grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <UPageCard v-for="(card, index) in mediaGroups" :key="index" v-bind="card" spotlight>
          <template #default>
            <div class="inline-flex gap-2">
              <UBadge
                v-if="mediaGroupsStore.getSelectedMediaGroup?.id === card?.id"
                color="warning"
              >
                current media group
              </UBadge>

              <UBadge v-if="card.isDefault">default media group</UBadge>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </template>
  </UDashboardPanel>
</template>
