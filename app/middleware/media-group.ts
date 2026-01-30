export default defineNuxtRouteMiddleware(async to => {
  const mediaTrackStore = useMediaTrackStore()

  const groupId = to.params.groupId as string
  const group = mediaTrackStore.mediaGroups?.find(g => g.id === groupId)

  if (!group) return navigateTo('/groups')
})
