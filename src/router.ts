import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    children: [
      {
        path: "register",
        name: "register",
        component: () => import("@/pages/auth/Register.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/auth/Login.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
];

const protectedRoutes: RouteRecordRaw[] = [
  {
    path: "profile",
    name: "profile",
    component: () => import("@/pages/protected/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "posts",
    name: "feed",
    component: () => import("@/pages/protected/Feed.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "bookmarks",
    name: "bookmarks",
    component: () => import("@/pages/protected/Bookmarks.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/Home.vue"),
      meta: {
        requiresAuth: false,
      },
    },

    ...authRoutes,
    ...protectedRoutes,
  ],
});
