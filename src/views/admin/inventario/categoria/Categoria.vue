<template>
    <div v-if="cargando">
        <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
    <div class="card">
        <h1>Gestión Categorias</h1>

        <Button label="Nueva Categoria" @click="visibleCategoria = true" />

        <Dialog v-model:visible="visibleCategoria" modal header="Gestión Categoria" :style="{ width: '25rem' }">
            {{ categoria }}
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Ingrese datos de Categoria.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="nom" class="font-semibold w-24">Nombre</label>
                <InputText id="nom" class="flex-auto" autocomplete="off" v-model="categoria.nombre" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="det" class="font-semibold w-24">Descripción</label>
                <InputText id="det" class="flex-auto" autocomplete="off" v-model="categoria.descripcion" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visibleCategoria = false"></Button>
                <Button type="button" label="Guardar" @click="funGuardarCategoria()"></Button>
            </div>
        </Dialog>

        <DataTable :value="categorias" size="small">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="descripcion" header="DETALLE"></Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <br>
        <table class="min-w-full bg-white shadow-md rounded-lg">
            <thead>
                <tr class="border-b">
                    <td class="py-2 px-4 text-left text-sm font-bold text-gray-700 ">ID</td>
                    <td class="py-2 px-4 text-left text-sm font-bold text-gray-700 ">NOMBRE</td>
                    <td class="py-2 px-4 text-left text-sm font-bold text-gray-700 ">DETALLE</td>
                    <td class="py-2 px-4 text-left text-sm font-bold text-gray-700 ">ACCION</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categorias" class="border-b">
                    <td class="py-2 px-4 text-sm text-gray-800">{{ cat.id }}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">{{ cat.nombre }}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">{{ cat.descripcion }}</td>
                    <td class="py-2 px-4 text-sm text-gray-800">
                        <Button icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(cat)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(cat)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCategorias, guardarCategoria,modificarCategoria, eliminarCategoria } from "./../../../../services/categoria.service"
import type { Categoria } from './../../../../Types/Categoria';


const categorias = ref<Categoria[]>([]);
const cargando = ref<boolean>(false);
const visibleCategoria = ref<boolean>(false);
const categoria = ref<Categoria>({ nombre: "", descripcion: ""});

onMounted(() => {
    obtenerCategorias();
});

async function obtenerCategorias(){
    try {
        cargando.value = true;
        const { data } = await getCategorias();
        categorias.value = data;

        cargando.value = false;
    } catch (error) {
        console.log('Error al obtener los datos: ', error);
        cargando.value = false
    }
}

async function funGuardarCategoria(){
    if(categoria.value.id){
        // editar
        const id = categoria.value.id?categoria.value.id:-1;
        await modificarCategoria(id, categoria.value);

        visibleCategoria.value = false;
        obtenerCategorias();
    }else{
        // guardar
        await guardarCategoria(categoria.value);

        visibleCategoria.value = false;
        obtenerCategorias();
    }
}

async function editProduct(data: any){
    categoria.value = data;
    visibleCategoria.value = true;

    
}
async function confirmDeleteProduct(data:any){
    if(confirm("Está seguro de Eliminar los registros?")){
        await eliminarCategoria(data.id)
        obtenerCategorias();

    }
}

</script>