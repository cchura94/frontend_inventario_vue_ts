import axios from './../lib/axios';

export async function getCategorias(){
    return axios.get("/categoria");
}

export async function guardarCategoria(datos: any){
    return axios.post("/categoria", datos);
}

export async function modificarCategoria(id: number, datos: any){
    return axios.put("/categoria/"+id, datos);
}

export async function eliminarCategoria(id: number){
    return axios.delete("/categoria/"+id);
}