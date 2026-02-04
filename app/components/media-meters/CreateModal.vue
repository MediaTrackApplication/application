<script lang="ts" setup>
import type { MediaMeter } from '~/types/media-meter.type'

const emits = defineEmits<{ close: [boolean] }>()

const { mediaMeter = undefined, mediaMeterGroupId } = defineProps<{
  mediaMeter?: MediaMeter
  mediaMeterGroupId: string
}>()

const title = computed(() =>
  mediaMeter?.name ? `Edit media meter: ${mediaMeter.name}` : 'Create new media meter'
)
</script>

<template>
  <UModal :close="{ onClick: () => emits('close', false) }" :title overlay>
    <slot />

    <template #body>
      <MediaMetersBaseForm
        :media-meter="mediaMeter"
        :media-meter-group-id="mediaMeterGroupId"
        @close="emits('close', false)"
      />
    </template>
  </UModal>
</template>
