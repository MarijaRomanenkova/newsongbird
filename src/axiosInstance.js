/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

