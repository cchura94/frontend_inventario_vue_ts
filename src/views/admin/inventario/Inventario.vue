<template>
    
    <Breadcrumb :home="inv" :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
        
    <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inv = ref({
    icon: 'pi pi-home',
    route: '/admin/inventario'
});
const items = ref([
    { label: 'Categoria', route: '/admin/inventario/categoria' },
    { label: 'Producto', route: '/admin/inventario/producto' },
    { label: 'Almacen', route: '/admin/inventario/almacen' },
    { label: 'Sucursal', route: '/admin/inventario/sucursal' },
]);
</script>