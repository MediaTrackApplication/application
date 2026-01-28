export default defineAppConfig({
  ui: {
    colors: {
      neutral: 'slate',
      primary: 'blue',
    },
    pageSection: {
      slots: {
        container: 'flex flex-col lg:grid py-8 sm:py-8 lg:py-8 gap-8 sm:gap-8',
      },
    },
  },
})
