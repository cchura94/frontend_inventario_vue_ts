<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Administrador',
        items: [
            { label: 'Admin', icon: 'pi pi-fw pi-home', to: '/admin' },
            { label: 'Mi Perfil', icon: 'pi pi-fw pi-user', to: '/admin/profile' }
        ]
    },
    {
        label: 'Seguridad',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-id-card', to: '/admin/usuario' },
            { label: 'Roles y Permisos', icon: 'pi pi-fw pi-table', to: '/admin/role' }
        ]
    },
    {
        label: 'Gestión Inventarios',
        items: [
            { label: 'Productos', icon: 'pi pi-fw pi-box', to: '/admin/inventario/producto' },
            { label: 'Categoria', icon: 'pi pi-fw pi-share-alt', to: '/admin/inventario/categoria' },
            { label: 'Almacen', icon: 'pi pi-fw pi-tablet', to: '/admin/inventario/almacen' },
            { label: 'Sucursal', icon: 'pi pi-fw pi-tablet', to: '/admin/inventario/sucursal' }
        ]
    },
    {
        label: 'Movimientos',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Compras',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/movimientos/nota/compra'
            },
            {
                label: 'Ventas',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/movimientos/nota/venta'
            }
        ]
    },
    
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
