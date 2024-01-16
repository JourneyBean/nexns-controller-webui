import { RouteRecordRaw } from "vue-router";

/* views */

const Home = () => import("@/views/HomeView.vue");
const Domain = () => import("@/views/DomainView.vue");
const NewDomain = () => import("@/views/DomainNewView.vue");
const Zone = () => import("@/views/ZoneView.vue");
const Record = () => import("@/views/RecordView.vue");
const Variable = () => import("@/views/VariableView.vue");
const NotFound = () => import("@/views/NotFound.vue");

/* route definition */

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/domain/new",
    component: NewDomain,
  },
  {
    path: "/domain/:id",
    component: Domain,
  },
  {
    path: "/zone/:id",
    component: Zone,
  },
  {
    path: "/record/:id",
    component: Record,
  },
  {
    path: "/variable",
    component: Variable,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
