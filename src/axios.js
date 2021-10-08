import axios from "axios";

let url = "https://vcpl.herokuapp.com/api";
// url = "http://localhost:9000/api";

const client = axios.create({
    baseURL: url,
});

export default client;
