import { createRouter, createWebHistory } from 'vue-router'

import LeagueCalendarPage from '@/pages/LeagueCalendarPage.vue'
import LeaguesPage from '@/pages/LeaguesPage.vue'
import TeamCalendarPage from '@/pages/TeamCalendarPage.vue'
import TeamsPage from '@/pages/TeamsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/leagues',
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: LeaguesPage,
      meta: {
        title: 'Лиги',
      },
    },
    {
      path: '/leagues/:id',
      name: 'league-calendar',
      component: LeagueCalendarPage,
      meta: {
        title: 'Календарь лиги',
      },
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamsPage,
      meta: {
        title: 'Команды',
      },
    },
    {
      path: '/teams/:id',
      name: 'team-calendar',
      component: TeamCalendarPage,
      meta: {
        title: 'Календарь команды',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? `${to.meta.title} | SoccerStat` : 'SoccerStat'
  document.title = title
})

export default router
