import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user`);

  return response.data;
};
const deleteUser = async (id) => {
  const response = await axios.delete(`${base_url}user/${id}`);
  return response.data;
};
const customerService = {
  getUsers,
  deleteUser,
};

export default customerService;
