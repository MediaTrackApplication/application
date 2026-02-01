<script setup lang="ts">
import type { MediaGroup } from '~/types/media-group.type'

const { mediaGroup = undefined } = defineProps<{
  mediaGroup?: MediaGroup
}>()

const mediaTrackStore = useMediaTrackStore()

const onSubmit = async () => {
  if (mediaGroup) {
    await mediaTrackStore.deleteMediaGroup(mediaGroup.id as string)
  }
}
</script>

<template>
  <UPageCard
    class="bg-linear-to-tl from-error/10 from-5% to-default"
    description="Deleting this group will permanently remove all associated meters and readings. You won’t be able to recover this data later."
    highlight
    highlight-color="error"
    title="Delete media group"
  >
    <template #footer>
      <UTooltip
        :disabled="!mediaTrackStore.isOneMediaGroup"
        text="Cannot be deleted. You must have at least one media group."
      >
        <UButton
          :disabled="mediaTrackStore.isOneMediaGroup"
          color="error"
          label="Delete"
          size="lg"
          trailing-icon="i-lucide-diamond-minus"
          @click="onSubmit"
        />
      </UTooltip>
    </template>
  </UPageCard>
</template>
