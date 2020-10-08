import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/adminlogin",
    name: "AdminLogin",
    meta: { layout: "empty" },
    component: () =>
      import(/* webpackChunkName: "adminlogin" */ "../views/AdminLogin.vue"),
  },
  {
    path: "/adminregistration",
    name: "AdminRegistration",
    meta: { layout: "admin" },
    component: () =>
      import(
        /* webpackChunkName: "adminregistration" */ "../views/AdminRegistration.vue"
      ),
  },
  {
    path: "/admin",
    name: "Admin",
    meta: { requiresAuth: true, layout: "admin" },
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
  },
  {
    path: "/orders",
    name: "AdminOrders",
    meta: { requiresAuth: true, layout: "admin" },
    component: () =>
      import(/* webpackChunkName: "adminorders" */ "../views/AdminOrders.vue"),
  },
  {
    path: "/admincomments",
    name: "AdminComments",
    meta: { requiresAuth: true, layout: "admin" },
    component: () =>
      import(/* webpackChunkName: "admincomments" */ "../views/AdminComments.vue"),
  },
  {
    path: "/comments",
    name: "Comments",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "adminorders" */ "../views/Comments.vue"),
  },
  {
    path: "/add",
    name: "AdminAdd",
    meta: { requiresAuth: true, layout: "admin" },
    component: () =>
      import(/* webpackChunkName: "adminadd" */ "../views/AdminAdd.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      layout: "main",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      layout: "main",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/adminlogin" });
    } else {
      next();
    }
  });
});

export default router;
