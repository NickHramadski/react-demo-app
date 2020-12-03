import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.API_URL;

const authApi = axios.create({
  baseURL: config.AUTH_API_URL
});

const notesApi = axios.create({
  baseURL: config.NOTES_API_URL
});

export {
  authApi,
  notesApi
}
