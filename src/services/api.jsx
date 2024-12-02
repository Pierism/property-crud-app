import axios from "axios"; 
 
const BASE_URL = "https://674d71d4635bad45618b51f2.mockapi.io/properties/id"; 

export const fetchProperties = () => axios.get(BASE_URL); 
export const fetchPropertyById = (id) => axios.get(`${BASE_URL}/${id}`); 
export const createProperty = (data) => axios.post(BASE_URL, data); 
export const updateProperty = (id, data) => axios.put(`${BASE_URL}/${id}`, data); 
export const deleteProperty = (id) => axios.delete(`${BASE_URL}/${id}`); 