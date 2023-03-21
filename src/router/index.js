import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TipoUsuario from '@/views/Administrador/Tipousuario.vue'
import NuevoUsuario from '@/views/Administrador/Nuevousuario.vue'
import NuevoEmpleado from '@/views/Administrador/NuevoEmpleado.vue'
import ActualizarEmpleado from '@/views/Empleado/Empleado.vue'
import TipoVacuna from '@/views/Administrador/TipoVacuna.vue'
import Reportes from '@/views/Administrador/Reportes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/usuario/tipousuario',
    name: 'tipousuario',
    component: TipoUsuario
  },
  {
    path: '/usuario/nuevousuario',
    name: 'nuevousuario',
    component: NuevoUsuario
  },
  {
    path: '/usuario/nuevoempleado',
    name: 'nuevoempleado',
    component: NuevoEmpleado
  },
  {
    path: '/empleado/actualizar',
    name: 'actualizar',
    component: ActualizarEmpleado
  },
  {
    path: '/usuario/tipovacuna',
    name: 'tipovacuna',
    component: TipoVacuna
  },
  {
    path: '/usuario/reportes',
    name: 'reportes',
    component: Reportes
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//check Authorized status everytime a navigating action is trigger
router.beforeEach((to, from, next) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router
