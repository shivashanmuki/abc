import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getAllStaff = async () => {
  const response = await axios.get(`${base_url}staff`, config);
  return response.data; 
};

const createStaff = async (staff) => {
  const response = await axios.post(`${base_url}staff`, staff, config);
  return response.data;
};

const updateStaff = async (staff) => {
  const response = await axios.put(
    `${base_url}staff/${staff.id}`,
    staff,
    config
  );
  return response.data;
};

const getAStaff = async (id) => {
  const response = await axios.get(`${base_url}staff/${id}`, config);
  return response.data;
};

const deleteStaff = async (id) => {
  const response = await axios.delete(`${base_url}staff/${id}`, config);
  return response.data;
};

const staffService = {
  getAllStaff,
  createStaff,
  updateStaff,
  getAStaff,
  deleteStaff,
};

export default staffService;
