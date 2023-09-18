import Vue from 'vue';
import Router from 'vue-router';
import Tareas from './pages/tareas.vue';
import LoginPage from './pages/index.vue';
import Help from './pages/docs/ayuda.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index', // Redirige la página de inicio al login
    },
    {
      path: '/index',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/tareas',
      name: 'tareas',
      component: Tareas,
    },
    {
      path: '/ayuda',
      name: 'ayuda',
      component: Help,
    },

  ],
});
