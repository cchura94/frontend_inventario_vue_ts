import axios from './../lib/axios';

export async function loginApi(email: string, password: string){
    const respuesta = await axios.post("/auth/login", { email, password });
    return respuesta.data;
}

export async function logoutApi(){
    const respuesta = await axios.post("/auth/logout");
    return respuesta.data;
}