import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://railway.bookreview.techtrain.dev', // Replace with your API base URL
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

