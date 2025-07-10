<template>
    <nav>
        <RouterLink to="/">INICIO</RouterLink> |
        <RouterLink to="/servicios">SERVICIOS</RouterLink> |
        <RouterLink to="/nosotros">ACERCA DE NOSOTROS</RouterLink> |
        <RouterLink to="/auth/login">INGRESAR</RouterLink> |
        <RouterLink to="/auth/register">REGISTRARSE</RouterLink> |
        <RouterLink to="/admin/profile">INGRESAR AL PERFIL DEL ADMIN</RouterLink>
    </nav>

    <router-view></router-view>

</template>