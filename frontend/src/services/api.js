import axios from "axios";

export const api = axios.create({
  baseURL: "https://whaticketbank-api.onrender.com",
});
