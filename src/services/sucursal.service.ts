// import type { User } from '../Types/User';
import axios from './../lib/axios';

export default {
    getSucursales(){
        return axios.get("/sucursales")
    },
    guardarSucursal(datos: any){
        return axios.post("/sucursales", datos);
    },
    mostrarSucursal(id: number){
        return axios.get(`/sucursales/${id}`);
    },
    modificarSucursal(id: number, datos: any){
        return axios.put(`/sucursales/${id}`, datos);
    },
    eliminarSucursal(id: number){
        return axios.delete(`/sucursales/${id}`);
    }
}