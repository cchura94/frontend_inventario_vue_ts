<template>
    <div class="card">
        <h1>Gestión Categorias</h1>

        <DataTable :value="categorias" size="small">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="detalle" header="DETALLE"></Column>
            <Column field="accion" header="ACCION"></Column>
        </DataTable>
        <br>
        <table border="1">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>NOMBRE</td>
                    <td>DETALLE</td>
                    <td>ACCION</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categorias">
                    <td>{{ cat.id }}</td>
                    <td>{{ cat.nombre }}</td>
                    <td>{{ cat.detalle }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCategorias } from "./../../../../services/categoria.service"


const categorias = ref([]);

onMounted(() => {
    obtenerCategorias();
});

async function obtenerCategorias(){
    const { data } = await getCategorias();
    categorias.value = data;
}

</script>