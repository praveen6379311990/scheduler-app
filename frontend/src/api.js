import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/projects/scheduler-app/backend/api",
   headers: {
    "Content-Type": "application/json"
  }
});
