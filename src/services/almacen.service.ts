// import type { User } from '../Types/User';
import axios from './../lib/axios';

export default {
    getAlmacenes(id_sucursal: number){
        return axios.get("/almacen?sucursal="+id_sucursal)
    },
    guardarAlmacen(datos: any){
        return axios.post("/almacen", datos);
    },
    mostrarAlmacen(id: number){
        return axios.get(`/almacen/${id}`);
    },
    modificarAlmacen(id: number, datos: any){
        return axios.put(`/almacen/${id}`, datos);
    },
    eliminarAlmacen(id: number){
        return axios.delete(`/almacen/${id}`);
    }
}