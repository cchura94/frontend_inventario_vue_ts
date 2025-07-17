<template>
    <div v-if="perfil" class="max-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center space-x-6 mb-8">

            <img src="https://reqres.in/img/faces/8-image.jpg" alt="" class="w-24 h-24 rounded-full border-2 border-gra-300">
            <div>
                <p class="text-3xl font-semibold text-gray-800">Mi Perfil</p>
                <p class="text-gray-500 text-sm">Última Actualización: {{ new Date(perfil.updated_at).toLocaleString() }}</p>
            </div>
        </div>

        <div class="space-y-4">
            <div class="flex justify-between">
                <span class="text-gray-600 font-bold">Nombre de Usuario:</span>
                <span>{{ perfil.name }}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600 font-bold">Correo Electronico:</span>
                <span>{{ perfil.email }}</span>
            </div>

        </div>
        
    </div>
    <div v-else>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PerfilApi } from "./../../../services/auth.service"
import type { Perfil } from '../../../Types/Perfil';

const perfil = ref<Perfil>()

onMounted(() => {
    obtenerPerfil()
})

async function obtenerPerfil() {
    perfil.value = await PerfilApi();
}

</script>