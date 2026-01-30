export default defineNuxtRouteMiddleware(async to => {
  const mediaTrackStore = useMediaTrackStore()
  const session = useSupabaseSession()

  const authPages = ['/signin', '/signup']

  if (!session.value && !authPages.includes(to.path)) return navigateTo('/signin')
  if (session.value && authPages.includes(to.path)) return navigateTo('/')

  if (session.value && !mediaTrackStore.areMediaGroupsLoaded) {
    try {
      await mediaTrackStore.fetchMediaGroups(true)
    } catch (error) {
      console.error('Failed to fetch media groups in auth middleware:', error)
      return navigateTo('/')
    }
  }
})
