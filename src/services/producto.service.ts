// import type { User } from '../Types/User';
import axios from './../lib/axios';

export default {
    getProductos(almacen_id: string='', page:number=1, limit:number=10, buscar:string='' ){
        almacen_id = almacen_id?almacen_id:'';
        return axios.get(`/producto?page=${page}&limit=${limit}&almacen=${almacen_id}&search=${buscar}`)
    },
    guardarProducto(datos: any){
        return axios.post("/producto", datos);
    },
    mostrarProducto(id: number){
        return axios.get(`/producto/${id}`);
    },
    modificarProducto(id: number, datos: any){
        return axios.put(`/producto/${id}`, datos);
    },
    eliminarProducto(id: number){
        return axios.delete(`/producto/${id}`);
    },
    actualizarImagenProducto(id: number, formData: FormData){
        return axios.post(`/producto/${id}/actualizar-imagen`, formData);
    }
}