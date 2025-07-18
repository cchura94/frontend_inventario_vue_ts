<template>
    <div class="card" v-if="users.length>0">
        <h1>Lista de Usuarios</h1>

        <RouterLink to="/admin/usuario/nuevo" class=" bg-green-500 rounded-md px-4 py-2 text-white text-2xl font-semibold hover:text-gray-200">Nuevo Usuario</RouterLink>
        
        <DataTable :value="users" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="email" header="Correo"></Column>
            <Column field="accion" header="Accion"></Column>
        </DataTable>

        <pre>{{ users }}</pre>
    </div>
    <div v-else>
        <ProgressSpinner />
        <h1>Cargando...</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import userService from '../../../services/user.service';
import type { User } from '../../../Types/User';

const users = ref<User[]>([]);

onMounted(() => {
    listarUsuarios();
});

async function listarUsuarios(){
    const { data } = await userService.getUsers();
    users.value = data.data
}

</script>