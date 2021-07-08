import axios from "axios";

const Users = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default Users;
