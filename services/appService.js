import axios from 'axios';

const get = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  return response.data[0];
};

const create = async (baseUrl, newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { get, create };