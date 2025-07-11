<template>
    <div class="bg-gray-100 flex items-center justify-center min-h-100">
        <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
    
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Ingresar (Login)</h1>
    
            <form class="space-y-5">
                <div>
                    <label for="c" class="block text-gray-700">Ingrese su Correo</label>
                    <input type="email" class="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-green-500">
                </div>
                <div>
                    <label for="p" class="block text-gray-700">Ingrese su Contraseña</label>
                    <input type="password" class="w-full px-4 py-2 rounded-lg focus:outline-none border focus:ring-2 focus:ring-green-500">
                </div>
                
                <input type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-400" value="INGRESAR">            
            </form>
            <p class="text-center">
                ¿No tienes Cuenta?
                <RouterLink to="/auth/register" class="text-green-500 hover:underline">Registrate</RouterLink>
    
            </p>
        </div>

    </div>
</template>