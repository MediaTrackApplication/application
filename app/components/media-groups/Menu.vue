<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const mediaTrackStore = useMediaTrackStore()

defineProps<{
  collapsed?: boolean
}>()

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    mediaTrackStore.getMediaGroups?.map(group => ({
      icon: 'i-lucide-diamond',
      label: group.name,
      onSelect: () => {
        mediaTrackStore.selectedMediaGroupId = group.id
      },
    })) || [],
    [
      {
        icon: 'i-lucide-grid-2x2-plus',
        label: 'Create media group',
      },
      {
        icon: 'i-lucide-grid-2x2',
        label: 'Manage media groups',
        to: '/groups',
      },
    ],
  ]
})
</script>

<template>
  <UDropdownMenu
    :content="{ align: 'center', collisionPadding: 16 }"
    :items
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        icon: 'i-lucide-diamond',
        label: collapsed ? undefined : mediaTrackStore?.getSelectedMediaGroup?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      class="data-[state=open]:bg-elevated"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />
  </UDropdownMenu>
</template>
