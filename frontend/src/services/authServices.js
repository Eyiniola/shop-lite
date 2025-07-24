import axios from 'axios';

const API_URL =  "https://shoplite-backend.azurewebsites.net/auth";

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
