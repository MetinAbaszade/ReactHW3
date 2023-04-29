import { post, get, postJSON } from './requestservice'

export const getUsers = () => get('/users');
export const getUserById = (id) => get(`/users/${id}`);
export const addUser = (data) => post(`/users`, data);