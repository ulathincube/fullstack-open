import axios from 'axios';
const baseUrl = '/api/auth/login';

async function login(userData) {
  try {
    const response = await axios.post(baseUrl, userData);
    
    return response.data;
  } catch (error) {
   
    throw new Error(error.response.data.error);
  }
}

export default {
  login,
};
