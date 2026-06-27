import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import 'primeicons/primeicons.css'

const GreenPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22'
        }
    },
    components: {
        button: {
            colorScheme: {
                light: {
                    textHoverBackground: '{primary.100}',
                    textHoverColor: '{primary.800}',
                    secondaryTextHoverBackground: '{primary.100}',
                    secondaryTextHoverColor: '{primary.800}',
                    hoverBackground: '{primary.100}',
                    hoverColor: '{primary.800}',
                    secondaryHoverBackground: '{primary.100}',
                    secondaryHoverColor: '{primary.800}'
                },
                dark: {
                    textHoverBackground: 'rgba(16, 185, 129, 0.2)',
                    textHoverColor: '{primary.400}',
                    secondaryTextHoverBackground: 'rgba(16, 185, 129, 0.2)',
                    secondaryTextHoverColor: '{primary.400}',
                    hoverBackground: 'rgba(16, 185, 129, 0.2)',
                    hoverColor: '{primary.400}',
                    secondaryHoverBackground: 'rgba(16, 185, 129, 0.2)',
                    secondaryHoverColor: '{primary.400}'
                }
            }
        }
    }
})

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: GreenPreset,
        options: {
            darkModeSelector: '.p-dark'
        }
    }
})

app.mount('#app')
