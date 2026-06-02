import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { getAccessToken } from "@/utils/cookies";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: () => import("@/layouts/Auth.vue"),
    children: [
      {
        path: "register",
        name: "register",
        component: () => import("@/pages/auth/Register.vue"),
        meta: {
          requiresAuth: false,
          layout: "auth",
        },
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/auth/Login.vue"),
        meta: {
          requiresAuth: false,
          layout: "auth",
        },
      },
    ],
  },
];

const protectedRoutes: RouteRecordRaw[] = [
  {
    path: "/p",
    component: () => import("@/layouts/Primary.vue"),
    children: [
      {
        path: "",
        name: "feed",
        component: () => import("@/pages/protected/Feed.vue"),
        meta: {
          requiresAuth: true,
          layout: "primary",
        },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/pages/protected/Profile.vue"),
        meta: {
          requiresAuth: true,
          layout: "primary",
        },
      },
      {
        path: "bookmarks",
        name: "bookmarks",
        component: () => import("@/pages/protected/Bookmarks.vue"),
        meta: {
          requiresAuth: true,
          layout: "primary",
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/layouts/Public.vue"),
      children: [
        {
          path: "",
          component: () => import("./pages/Home.vue"),
          meta: {
            requiresAuth: false,
            layout: "public",
          },
        },
      ],
    },

    ...authRoutes,
    ...protectedRoutes,
  ],
});

router.beforeEach((to) => {
  const isAuthenticated = Boolean(getAccessToken());
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthRoute = to.matched.some((record) => record.meta.layout === "auth");

  if (requiresAuth && !isAuthenticated) {
    return {
      path: "/auth/login",
      replace: true,
    };
  }

  if (isAuthRoute && isAuthenticated) {
    return {
      path: "/p",
      replace: true,
    };
  }

  return true;
});
