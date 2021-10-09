import axios from "axios";

let url = process.env.REACT_APP_BACKEND_URL;
// url = "http://localhost:9000/api";

let token = window.localStorage.getItem("vcpltokenrepier");
let headersObj = {};
if (token && token.length > 5)
    headersObj = { Authorization: `Bearer ${token}` };

const client = axios.create({
    baseURL: url,
    headers: headersObj,
});

export default client;
