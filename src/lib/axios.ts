import axios from 'axios'

const instance = axios.create({
    baseURL: "https://laravue2.blumbit.net/back/public/api"// import.meta.env.VITE_API_URL || "http://miempresa2.com/api" 
});

// interceptores del cliente
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

// interceptor del servidor (errores)
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // error 401
        if(error.response?.status === 401){
            localStorage.removeItem("access_token");
            location.href = "/auth/login"
        }
        // error 403
        // error 500
        // error 502
        return Promise.reject(error);
    }
)

export default instance;
