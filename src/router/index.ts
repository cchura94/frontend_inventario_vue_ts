import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Registro from "../views/auth/Register.vue";
import WebLayout from "../views/template/WebLayout.vue";
import Inicio from "../views/web/Inicio.vue";
import AppLayout from "../views/template/AppLayout.vue";
import Perfil from "../views/admin/perfil/Perfil.vue";
import Usuario from "../views/admin/usuarios/Usuario.vue";
import Servicios from "../views/web/Servicios.vue";
import Nosotros from "../views/web/Nosotros.vue";

const routes = [
    {
        path: '/',
        component: WebLayout,
        children: [
            {
                path: '',
                component: Inicio,
                name: "Inicio"
            },
            {
                path: 'servicios',
                component: Servicios,
                name: "Servicios"
            },
            {
                path: 'nosotros',
                component: Nosotros
            }
        ]
    },
    {
        path: '/auth',
        component: WebLayout,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Registro
            }

        ]
    },
    {
        path: '/admin',
        component: AppLayout,
        children: [
            {
                path: 'profile',
                component: Perfil,
                name: "Perfil"
            },
            {
                path: 'usuario',
                component: Usuario
            }

        ]
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes: routes
})

export default router;