// middleware/ampRedirect.ts
export default defineNuxtRouteMiddleware((to) => {
  const configStore = useGlobalConfigStore()

  const nonAmpRoutes = [
    'about',
    'advertise',
    'biz-slug-id-request-info',
    'contact',
    'global_search',
    'newsletter',
    'privacy-policy',
    'terms-of-use',
    'work-with-us',
    'work-with-us-contact-local-rep',
    'work-with-us-sign-up-packageId',
    'work-with-us-sign-up-success'
  ]

  const isMobile = configStore.isMobile
  const isAmpRedirected = configStore.isAmpRedirected

  if (isMobile && !isAmpRedirected) {
    if (!nonAmpRoutes.includes(to.name as string) && !to.fullPath.startsWith('/amp')) {
      configStore.setAmpRedirected()
      return navigateTo(`/amp${to.fullPath}`)
    }
  }
})
