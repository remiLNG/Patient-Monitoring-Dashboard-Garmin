import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import About from "../components/About";
import Dashboard from "../components/Dashboard/Dashboard"
import VueSession from 'vue-session'


Vue.use(VueSession)

Vue.use(VueRouter);

const routes = [
  {
    path: "/",

    component: NavBar,
    children: [
      {
        path: "/HomePage",
        name: "HomePage",
        component: HomePage,
      },

      {
        path: "/About",
        name: "About",
        component: About,
      },
    ],
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
