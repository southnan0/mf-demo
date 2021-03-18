import {createApp} from 'vue'
import Layout from './components/Layout.vue'
import ElementPlus from 'element-plus'

const app = createApp(Layout)
app.use(ElementPlus)
app.mount('#emp-root')
