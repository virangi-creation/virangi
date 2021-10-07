import axios from "axios";

let url = "https://vcpl.herokuapp.com/api";

const client = axios.create({
    baseURL: url,
});

export default client;
