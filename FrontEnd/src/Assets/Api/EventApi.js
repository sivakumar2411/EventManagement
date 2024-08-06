import axios from "axios";

const API_URL = "http://localhost:4040";

export const getAllEvents = async(a) =>await axios.get(`${API_URL}/Events/GetAll`);