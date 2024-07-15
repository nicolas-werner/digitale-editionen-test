// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'


export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#3F51B5',
          secondary: '#009688',
        },
      },
    },
  },
  components: {
    VTreeview,
  },
})