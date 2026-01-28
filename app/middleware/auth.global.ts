export default defineNuxtRouteMiddleware(async to => {
  const mediaGroupsStore = useMediaGroupsStore()
  const session = useSupabaseSession()

  const authPages = ['/signin', '/signup']

  if (!session.value && !authPages.includes(to.path)) return navigateTo('/signin')
  if (session.value && authPages.includes(to.path)) return navigateTo('/')

  if (session.value && !mediaGroupsStore.areMediaGroupsLoaded) {
    try {
      await mediaGroupsStore.fetchMediaGroups(true)
    } catch (error) {
      console.error('Failed to fetch media groups in auth middleware:', error)
      return navigateTo('/')
    }
  }
})
