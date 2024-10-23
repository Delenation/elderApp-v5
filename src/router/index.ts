import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { Preferences } from '@capacitor/preferences'
import IntroPage from '@/views/IntroPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import MenuPage from '@/views/MenuPage.vue'
import HomePage from '@/views/HomePage.vue'
import BodyPage from '@/views/BodyPage.vue'
import ContactsPage from '@/views/ContactsPage.vue'
import SchedulePage from '@/views/SchedulePage.vue'
import CuisinesPage from '@/views/diet/CuisinesPage.vue'
import MusicPage from '@/views/radio/MusicPage.vue'
import FoodRecommendPage from '@/views/diet/FoodRecommendPage.vue'
import MusicRecommendPage from '@/views/radio/MusicRecommendPage.vue'
import TestPage from '@/views/TestPage.vue'

const TOKEN_KEY = 'token'

const checkUserData = async (_to, _from, next) => {
  const { value } = await Preferences.get({ key: TOKEN_KEY })
  if (value) {
    next()
  }
  else {
    next('/login')
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/testpage',
    name: 'TestPage',
    component: TestPage
  },
  {
    path: '/intro',
    name: 'IntroPage',
    component: IntroPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/cuisines',
    name: 'Cuisines',
    component: CuisinesPage
  },
  {
    path: '/diet',
    name: 'Diet',
    component: FoodRecommendPage
  },
  {
    path: '/music',
    name: 'Music',
    component: MusicPage
  },
  {
    path: '/radio',
    name: 'Radio',
    component: MusicRecommendPage
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: SchedulePage
  },
  {
    path: '/app',
    name: 'App',
    component: MenuPage,
    beforeEnter: checkUserData,
    children: [
      {
        path: '/app',
        redirect: '/app/home'
      },
      {
        path: '/app/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/app/body',
        name: 'Body',
        component: BodyPage
      },
      {
        path: '/app/contacts',
        name: 'Contacts',
        component: ContactsPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
