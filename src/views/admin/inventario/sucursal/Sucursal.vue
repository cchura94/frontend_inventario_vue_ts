<template>
    <div class="card">
        <h1>Gestión Sucursales</h1>
        <DataTable :value="sucursales" tableStyle="min-width: 50rem">
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="NOMBRE"></Column>
                <Column field="direccion" header="DIRECCIÓN"></Column>
                <Column field="telefono" header="TELFONO"></Column>
                <Column field="ciudad" header="CIUDAD"></Column>
                <Column field="Acción" header="Acción"></Column>
            </DataTable>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import sucursalService from '../../../../services/sucursal.service';

const sucursales = ref([])

onMounted(() => {
    getSucursales()
});

async function getSucursales(){
    const {data} = await sucursalService.getSucursales();
    sucursales.value = data;
}


</script>