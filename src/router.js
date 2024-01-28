import { createRouter, createWebHistory} from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Pokedex',
    component:() => import('./components/Pokedex.vue'),
  },
  {
    path: '/pokemon/:id',
    name: 'DetailsPokemon',
    component() => import('./components/DetailsPokemon.vue')
  },
];


const router = new VueRouter({
  routes
});

export default router;
