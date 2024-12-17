import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: "/",
          name: 'home',
          component: () => import("@/views/Home/Home.vue"),
          meta: {
            title: 'Darxon',
            metaTags: [
              {
                name: 'description',
                content: 'Welcome to the Darxon Restaurant. Enjoy the best Uzbek cuisine.'
              },
              {
                name: 'keywords',
                content: 'Darxon, Restaurant, Uzbek Cuisine, Guliston, Restaran, Bar'
              }
            ]
          }
        },
        {
          path: "/menu",
          name: 'menu',
          component: () => import("@/views/Menu/Menu.vue"),
          meta: {
            title: 'Menu  - Darxon Restaurant',
            metaTags: [
              {
                name: 'description',
                content: 'Welcome to the Darxon Restaurant. Enjoy the best Uzbek cuisine.'
              },
              {
                name: 'keywords',
                content: 'Darxon, Restaurant, Uzbek Cuisine, Guliston, Restaran, Bar, Menu, Food, ovqatlar'
              }
            ]
          }
        },
        {
          path: "/aboutus",
          name: 'aboutus',
          component: () => import("@/views/AboutUs/AboutUs.vue"),
          meta: {
            title: 'About us - Darxon Restaurant',
            metaTags: [
              {
                name: 'description',
                content: 'Welcome to the Darxon Restaurant. Enjoy the best Uzbek cuisine.'
              },
              {
                name: 'keywords',
                content: 'Darxon, Restaurant, Uzbek Cuisine, Guliston, Restaran, Bar, About Darxon '
              }
            ]
          }
        },
        {
          path: "/gallary",
          name: 'gallary',
          component: () => import("@/views/Gallary/Gallary.vue"),
          meta: {
            title: 'Gallary - Darxon Restaurant',
            metaTags: [
              {
                name: 'description',
                content: 'Welcome to the Darxon Restaurant. Enjoy the best Uzbek cuisine.'
              },
              {
                name: 'keywords',
                content: 'Darxon, Restaurant, Uzbek Cuisine, Guliston, Restaran, Bar,Gallary'
              }
            ]
          }
        },
        {
          path: "/contact",
          name: 'contact',
          component: () => import("@/views/Contact/Contact.vue"),
          meta: {
            title: 'Contact - Darxon Restaurant',
            metaTags: [
              {
                name: 'description',
                content: 'Welcome to the Darxon Restaurant. Enjoy the best Uzbek cuisine.'
              },
              {
                name: 'keywords',
                content: 'Darxon, Restaurant, Uzbek Cuisine, Guliston, Restaran, Bar,Contact'
              }
            ]
          }
        }
      ]
    },
   

  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");


  if (
    (to.name == "admin" ||
      to.name == "gallaryAdmin" ||
      to.name == "menuAdmin" ||
      to.name == "category" ||
      to.name == "menupdf" ||
      to.name == "habarlarAdmin") &&
    to.name !== "login" &&
    !token
  ) {
    return next({ name: "login" });
  }


  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if (nearestWithMeta) {
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    }).forEach(tag => document.head.appendChild(tag));
  }
  next();
});

export default router
