import axios from "axios";

const ApiClient = axios.create({
    baseURL : "http://localhost:3000/api",
    headers : {
        "Accept" : "Application/json"
    }
})

export default ApiClient