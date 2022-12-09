import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.baseURL = "http://188.121.113.74";

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default http;