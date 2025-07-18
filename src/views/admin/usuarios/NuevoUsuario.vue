<template>
  <div class="card">
    <h1>Guardar Usuario</h1>

    <div class="flex flex-col gap-6">
      <div>
        <label for="name" class="block font-bold mb-3">Nombre</label>
        <InputText
          id="name"
          v-model.trim="usuario.name"
          required="true"
          autofocus
          :invalid="submitted && !usuario.name"
          fluid
        />
        <small v-if="submitted && !usuario.name" class="text-red-500"
          >El nombre es obligatorio.</small
        >
      </div>

      <div>
        <label for="email" class="block font-bold mb-3">Correo</label>
        <InputText
          id="email"
          v-model.trim="usuario.email"
          required="true"
          autofocus
          :invalid="submitted && !usuario.email"
          fluid
        />
        <small v-if="submitted && !usuario.email" class="text-red-500"
          >El Correo es obligatorio.</small
        >
      </div>

      <div class="col-span-6">
        <label for="pass" class="block font-bold mb-3">Contraseña</label>
        <InputText
          id="pass"
          type="password"
          v-model="usuario.password"
          fluid
        />
      </div>
    </div>

      <Button label="Cancelar" icon="pi pi-times" text @click="funVolver()" />
      <Button label="Guardar" icon="pi pi-check" @click="guardarUsuario" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "../../../Types/User";
import userService from "../../../services/user.service";
import { useRouter } from "vue-router"

const usuario = ref<User>({email: "", name: "", password: ""})

const submitted = ref<boolean>(false);

const route = useRouter()

async function guardarUsuario(){
    await userService.guardarUser(usuario.value);
    route.push("/admin/usuario");
}

async function funVolver(){
    route.push("/admin/usuario");

}
</script>
