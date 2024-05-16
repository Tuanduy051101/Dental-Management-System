import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  // {
  //   path: "/",
  //   name: "Login",
  //   component: () => import("../views/Login.vue"),
  // },
  {
    path: "/customers",
    name: "Customer",
    component: () => import("../views/Customer.vue"),
  },
  {
    path: "/customers/:id",
    name: "Customer.view",
    component: () => import("../views/CustomerView.vue"),
    props: true,
  },
  {
    path: "/customers/:id",
    name: "Customer.edit",
    component: () => import("../views/CustomerEdit.vue"),
    props: true,
  },
  {
    path: "/schedules",
    name: "Schedule",
    component: () => import("../views/Schedule.vue"),
  },
  {
    path: "/schedules/asignments",
    name: "Schedule.add",
    component: () => import("../views/ScheduleAdd.vue"),
  },
  {
    path: "/activities",
    name: "Activity",
    component: () => import("../views/Activity.vue"),
  },
  {
    path: "/invoices",
    name: "Invoice",
    component: () => import("../views/Invoice.vue"),
  },
  {
    path: "/employees",
    name: "Employee",
    component: () => import("../views/Employee.vue"),
  },
  {
    path: "/employees/:id",
    name: "Employee.view",
    component: () => import("../views/EmployeeView.vue"),
    props: true,
  },
  {
    path: "/employees/:id",
    name: "Employee.edit",
    component: () => import("../views/EmployeeEdit.vue"),
    props: true,
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue"),
  },
  {
    path: "/settings",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_url),
  routes,
});

export default router;
