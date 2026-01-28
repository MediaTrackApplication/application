export default defineNuxtRouteMiddleware(async to => {
  const mediaGroupsStore = useMediaGroupsStore()

  const groupId = to.params.id as string
  const group = mediaGroupsStore.mediaGroups?.find(g => g.id === groupId)

  if (!group) return navigateTo('/groups')
})
