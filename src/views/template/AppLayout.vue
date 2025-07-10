<template>
     <nav>
        <RouterLink to="/admin">DASHBOARD</RouterLink> |
        <RouterLink to="/admin/profile">MI PERFIL</RouterLink> |
        <RouterLink to="/admin/usuario">USUARIOS</RouterLink> |
        <RouterLink to="/">VER PAGINA INICIO</RouterLink>
        
    </nav>

    <router-view></router-view>
</template>