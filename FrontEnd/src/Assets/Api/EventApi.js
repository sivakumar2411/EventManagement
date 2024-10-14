import axios from "axios";

const API_URL = "http://localhost:4040";

export const getAllEvents = async(a) =>await axios.get(`${API_URL}/Events/GetAll`);

export const getPublicOGEvents = async() => await axios.get(`${API_URL}/Events/GetPublicOGEvents`);

export const getPublicComEvents = async() => await axios.get(`${API_URL}/Events/GetPublicComEvents`);

export const getManaNeedEvents = async() => await axios.get(`${API_URL}/Events/GetManagerNeedEvents`);

export const AddNewEventOnEvent = async(data,id) => await axios.post(`${API_URL}/Events/InsertNew/${id}`,data);

export const GetEventsByManaId = async(id) =>await axios.get(`${API_URL}/Events/GetEventsByManager/${id}`);

export const GetEventsByOrganId = async(id) =>await axios.get(`${API_URL}/Events/GetEventsByOrganiser/${id}`);

export const EventStatusUpdate = async(eId,mid,a) => await axios.put(`${API_URL}/Events/UpdateStatus/${eId}/${mid}/${a}`);

export const GetEventParticipants = async(id) =>await axios.get(`${API_URL}/Events/GetParticipants/${id}`);

export const GetEventsByParticipant = async(id) =>await axios.get(`${API_URL}/Events/GetEventsByParticipant/${id}`);

export const JoinInEvent = async(eid,uid) => await axios.put(`${API_URL}/Events/NewParticipant/${eid}/${uid}`);

// export const PostNewEvent = async(a) =>await axios.post(`${API_URL}/Events/InsertNew`,a);