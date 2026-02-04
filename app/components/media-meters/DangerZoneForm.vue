<script lang="ts" setup>
import type { MediaMeter } from '~/types/media-meter.type'

const { mediaMeter = undefined, mediaMeterGroupId } = defineProps<{
  mediaMeter?: MediaMeter
  mediaMeterGroupId: string
}>()

const mediaTrackStore = useMediaTrackStore()
const router = useRouter()

const onSubmit = async () => {
  if (mediaMeter) {
    await mediaTrackStore.deleteMediaMeter(mediaMeter.id as string)
    router.push({ name: 'groups-groupId', params: { groupId: mediaMeterGroupId } })
  }
}
</script>

<template>
  <UPageCard
    class="bg-linear-to-tl from-error/10 from-5% to-default"
    description="Deleting this meter will permanently remove all associated readings. You won’t be able to recover this data later."
    highlight
    highlight-color="error"
    title="Delete media meter"
  >
    <template #footer>
      <UButton
        @click="onSubmit"
        color="error"
        label="Delete"
        size="lg"
        trailing-icon="i-lucide-diamond-minus"
      />
    </template>
  </UPageCard>
</template>
