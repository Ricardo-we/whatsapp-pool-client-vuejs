import 'bootswatch/dist/flatly/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getLocalStorage } from './utils/handleLocalStorage'
import BootstrapVue3 from 'bootstrap-vue-3'
import { vfmPlugin } from 'vue-final-modal'
import Toast from "vue-toastification";
// VIEWS
import App from './App.vue'
import Login from './views/Login.vue'
import HomePage from './views/HomePage.vue';
import Logout from './views/Logout.vue';
import Categories from './views/Categories.vue';
import Account from './views/Account.vue';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        { path: '/', name: 'Login', component: Login },
        { path: '/logout', component: Logout },
        { path: '/home', name: 'HomePage', component: HomePage },
        { path: '/categories', name: 'Categories', component: Categories },
        { path: '/account', name: 'Account', component: Account },
    ]
})

const app = createApp(App)
// app.provide('user', getLocalStorage('user'));
app.use(BootstrapVue3)
app.use(Toast);
app.use(vfmPlugin);
app.use(router);
app.mount('#app');
