import axios from 'axios'

const instance = axios.create({
    baseURL: "https://laravue2.blumbit.net/back/public/api"// import.meta.env.VITE_API_URL || "http://miempresa2.com/api" 
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
