import axios from './../lib/axios';

export async function getCategorias(){
    return axios.get("/categoria");
}