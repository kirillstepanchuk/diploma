import axios from 'axios';
import { store } from '..';
import { COOKIES } from '../constants';
import { loginUserSuccess } from '../store/actions/auth.actions';
import { setCookie } from '../utils/cookiesUtils';
import { fetchIsAuth } from './auth.api';

export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const data = await fetchIsAuth();
        console.log('data: ', data);
        setCookie(COOKIES.token, data.accessToken);
        localStorage.setItem('token', data.accessToken);
        store.dispatch(loginUserSuccess(data));
        return $api.request(originalRequest);
      } catch (error) {
        console.log('error auth: ', error); 
      }
    }

    throw error;
  }
)


export default $api;