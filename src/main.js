import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// регистрируем кастомную директиву focus глобально
// теперь она доступна во всех компонентах приложения
// она будет автоматически применяться к элементам, когда они будут смонтированы
app.directive('focus', {
    // кастомная директива, завязана на жизненный цикл элемента
    // будет применяться когда элемент появится в DOM
    mounted: (el) => el.focus()
});

app.mount('#app')
