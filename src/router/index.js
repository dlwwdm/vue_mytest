import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import Welcome from '../components/Welcome.vue'
import Project from '../components/Project/Project.vue'
import Interface from '../components/Interface/Interface.vue'
import Case from '../components/Case/Case.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/project', component: Project },
        { path: '/interface', component: Interface },
        { path: '/case', component: Case }
      ]
    }
  ]
})
