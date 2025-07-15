<template>
    <div v-if="perfil">
        <h1>Mi Perfil</h1>
        <h2>{{ perfil }}</h2>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PerfilApi } from "./../../../services/auth.service"

const perfil = ref({})

onMounted(() => {
    obtenerPerfil()
})

async function obtenerPerfil() {
    perfil.value = await PerfilApi();
}

</script>