import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

function getToken(userToken) {
  token = userToken;
}

async function getAll() {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function createBlog(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(baseUrl, data, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export default { getAll, getToken, createBlog };
