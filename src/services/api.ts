import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-java-usersandproducts.onrender.com",
    timeout: 18000,
})