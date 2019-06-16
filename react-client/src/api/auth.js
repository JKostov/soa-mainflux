import axios from '.';

export function login(email, password) {
  return axios.post('/auth/login', {
    email,
    password,
  });
}
