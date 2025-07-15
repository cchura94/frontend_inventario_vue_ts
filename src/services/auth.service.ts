import axios from './../lib/axios';

export async function loginApi(email: string, password: string){
    const respuesta = await axios.post("/v1/auth/login", { email, password });
    return respuesta.data;
}

export async function PerfilApi(){
    const respuesta = await axios.get("/v1/auth/profile");
    return respuesta.data;
}

export async function logoutApi(){
    const respuesta = await axios.post("/auth/logout");
    return respuesta.data;
}