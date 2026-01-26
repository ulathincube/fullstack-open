const baseUrl = 'http://localhost:3001/persons';
import axios from 'axios';

const create = personObject =>
  axios.post(baseUrl, personObject).then(response => response.data);

const deleteUser = id =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const updateUser = (id, personObject) =>
  axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data);

export default {
  create,
  deleteUser,
  updateUser,
};
