<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const mediaTrackStore = useMediaTrackStore()
const router = useRouter()

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
        router.push('/')
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
      class="data-[state=open]:bg-elevated"
      v-bind="{
        icon: 'i-lucide-diamond',
        label: collapsed ? undefined : mediaTrackStore?.getSelectedMediaGroup?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      :class="[!collapsed && 'py-2']"
      :square="collapsed"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
      block
      color="neutral"
      variant="ghost"
    />
  </UDropdownMenu>
</template>
