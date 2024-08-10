import axios from "axios";

const dropVicesAPI = axios.create({
  baseURL: "http://192.168.2.190:3000",
});

export default dropVicesAPI;
