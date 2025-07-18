import type { User } from '../Types/User';
import axios from './../lib/axios';

export default {
    getUsers(){
        return axios.get("/users")
    },
    guardarUser(datos: User){
        return axios.post("/users", datos);
    },
    mostrarUser(id: number){
        return axios.get(`/users/${id}`);
    },
    modificarUser(id: number, datos: User){
        return axios.put(`/users/${id}`, datos);
    },
    eliminarUser(id: number){
        return axios.delete(`/users/${id}`);
    }
}