<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const mediaGroupsStore = useMediaGroupsStore()

defineProps<{
  collapsed?: boolean
}>()

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    mediaGroupsStore.getMediaGroups?.map(group => ({
      icon: 'i-lucide-diamond',
      label: group.name,
      onSelect: () => {
        mediaGroupsStore.selectedMediaGroupId = group.id
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
        label: collapsed ? undefined : mediaGroupsStore?.getSelectedMediaGroup?.name,
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
