<template>
    <div class="card">
        <h1>Gestión Almacenes</h1>

        <Select v-model="sucursal_id" :options="sucursales" optionLabel="nombre" option-value="id" placeholder="Sucursal" class="w-full md:w-56" @change="getAlmacenes()" />


        <DataTable :value="almacenes" tableStyle="min-width: 50rem">
            <Column field="id" header="Code"></Column>
            <Column field="codigo" header="Name"></Column>
            <Column field="nombre" header="Category"></Column>
            <Column field="Acción" header="Acción"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import almacenService from '../../../../services/almacen.service';
import sucursalService from '../../../../services/sucursal.service';

const almacenes = ref([]);
const sucursal_id = ref(1);
const sucursales = ref([])

onMounted(() => {
    getAlmacenes();
    getSucursales()
});

async function getAlmacenes(){
    const {data} = await almacenService.getAlmacenes(sucursal_id.value);
    almacenes.value = data;
}

async function getSucursales(){
    const {data} = await sucursalService.getSucursales();
    sucursales.value = data;
}

const guardarAlmacen = function (){

}

const funEditarAlmacen = () => {

}


</script>