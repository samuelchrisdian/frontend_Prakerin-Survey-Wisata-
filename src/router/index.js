import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DaftarWisata from '../views/DaftarWisata.vue'
import DaftarPantai from '../views/DaftarPantai.vue'
import Deskripsi from '../views/Deskripsi.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    components: {default: Home, header: Navbar, footer: Footer},
  },
  {
    path: '/daftarwisata',
    name: 'DaftarWisata',
    components: {default: DaftarWisata, header: Navbar, footer: Footer},
  },
  {
    path: '/daftarpantai',
    name: 'DaftarPantai',
    components: {default: DaftarPantai, header: Navbar, footer: Footer},
  },
  {
    path: '/deskripsi/:id_wisata',
    name: 'Deskripsi',
    components: {default: Deskripsi, header: Navbar, footer: Footer},
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
