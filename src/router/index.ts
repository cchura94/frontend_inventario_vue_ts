import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Registro from "../views/auth/Register.vue";
import WebLayout from "../views/template/WebLayout.vue";
import Inicio from "../views/web/Inicio.vue";
// import AppLayout from "../views/template/AppLayout.vue";
import Perfil from "../views/admin/perfil/Perfil.vue";
import Usuario from "../views/admin/usuarios/Usuario.vue";
import Servicios from "../views/web/Servicios.vue";
import Nosotros from "../views/web/Nosotros.vue";
import AppLayout from "../layout/AppLayout.vue";
import Categoria from "../views/admin/inventario/categoria/Categoria.vue";
import NuevoUsuario from "../views/admin/usuarios/NuevoUsuario.vue";
import Producto from "../views/admin/inventario/producto/Producto.vue";
import Inventario from "../views/admin/inventario/Inventario.vue";
import Almacen from "./../views/admin/inventario/almacen/Almacen.vue"
import Sucursal from "../views/admin/inventario/sucursal/Sucursal.vue";
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
                name: 'Login',
                meta: {redirectIfAuth: true},
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
        meta: { requireAuth: true },
        children: [
            {
                path: 'profile',
                component: Perfil,
                name: "Perfil"
            },
            {
                path: 'usuario',
                component: Usuario
            },
            {
                path: 'usuario/nuevo',
                component: NuevoUsuario
            },
            {
                path: 'inventario',
                component: Inventario,
                children: [
                    {
                        path: 'categoria',
                        component: Categoria
                    },
                    {
                        path: 'producto',
                        component: Producto
                    },
                    {
                        path: 'almacen',
                        component: Almacen
                    },
                    {
                        path: 'sucursal',
                        component: Sucursal
                    }
                ]
            }

        ]
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes: routes
})

// Guards
router.beforeEach((to, from, next) => {
    console.log("from: ", from)
    console.log("to: ", to)
    const token = localStorage.getItem("access_token");
    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'}); 
        }else{
            return next()
        }
    }
    if(to.meta.redirectIfAuth && token){
        return next({name: 'Perfil'});
    }

    return next();
})


export default router;