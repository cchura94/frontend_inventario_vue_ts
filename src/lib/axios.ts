import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://miempresa2.com/api" 
});

// interceptores
instance.interceptors.request.use((config) => {
    const token = "ABC.XYZ.QWE";

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

export default instance;
