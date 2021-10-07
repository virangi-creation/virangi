import axios from "axios";

const client = axios.create({
    baseURL: "https://vcpl.herokuapp.com/api",
});

export default client;
