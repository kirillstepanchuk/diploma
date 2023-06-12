import axios from "axios";
import $api from ".";
import { TOKEN_ACTIONS } from "../constants";

export const fetchAuthorization = async (data: any):Promise<any> => {
  const fetched = await $api.post('/login', {
    email: data.email,
    password: data.password,
  });
  return fetched.data;
};

export const fetchRegistration = async (data: any):Promise<any> => {
  const fetched = await $api.post('/register', {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  });
  return fetched.data;
};

export const fetchLogout = async ():Promise<any> => {
  const fetched = await $api.post('/logout');
  return fetched.data;
};

export const fetchUsers = async ():Promise<any> => {
  const fetched = await $api.get('/users');
  return fetched.data;
};

export const fetchCurrentUser = async ():Promise<any> => {
  const fetched = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/get-user`,
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return fetched.data;
};

export const fetchIsAuth = async ():Promise<any> => {
  const fetched = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
  return fetched.data;
}