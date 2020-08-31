import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const vue = createApp(App).use(store).use(router).use(Antd)
vue.mount('#app')
