import axios from "axios";

let url = "http://localhost:9000/api";
if (process.env.NODE_ENV === "production") {
    url = "https://vcpl.herokuapp.com/api";
}

const client = axios.create({
    baseURL: url,
});

export default client;
