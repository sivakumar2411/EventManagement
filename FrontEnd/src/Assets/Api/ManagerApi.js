import axios from "axios";

const API_URL = "http://localhost:4040";

export const PostNewManager = async(data) =>await axios.post(`${API_URL}/Managers/InsertNew`,data);

export const GetManagerRequests = async() => await axios.get(`${API_URL}/Managers/GetReqs`);

export const GetAllManagers = async(a) => await axios.get(`${API_URL}/Managers/GetAll`)

export const DeleteManagerById = async(id) => await axios.delete(`${API_URL}/Managers/DeleteById/${id}`)