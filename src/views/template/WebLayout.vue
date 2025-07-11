<template>
    <nav class="bg-green-600 p-4">
        <div class="container max-auto flex justify-between items-center">

            <RouterLink to="/" class="text-white text-2xl font-bold">MI EMPRESA</RouterLink>

            <ul class="flex space-x-6">
                <li>
                    <RouterLink to="/" class="text-white text-2xl font-semibold hover:text-gray-200">INICIO</RouterLink>
                </li>
                <li>
                    <RouterLink to="/servicios" class="text-white text-2xl font-semibold hover:text-gray-200">SERVICIOS</RouterLink>
                </li>
                <li>
                    <RouterLink to="/nosotros" class="text-white text-2xl font-semibold hover:text-gray-200">NOSOTROS</RouterLink>
                </li>
                <li>
                    <RouterLink to="/auth/login" class="text-white text-2xl font-semibold hover:text-gray-200">INGRESAR</RouterLink>
                </li>
                <li>
                    <RouterLink to="/auth/register" class="text-white text-2xl font-semibold hover:text-gray-200">REGISTRARSE</RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/profile" class="text-white text-2xl font-semibold hover:text-gray-200">ADMIN</RouterLink>
                </li>
            </ul>

        </div>
    </nav>
    <div class="bg-green-400 text-white py-4">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold">Bienvenido a mi plataforma</h1>
            <p class="mt-4 text-lg">Observa los productos que ofrecemos en nuestra empresa </p>
        </div>
    </div>
    <div class="py-12">
        <div class="container mx-auto px-4">
            <router-view></router-view>
        </div>
    </div>
    

</template>