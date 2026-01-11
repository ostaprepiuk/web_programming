import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const fetchFarms = async (filters = {}) => {
    try {
        const params = new URLSearchParams(filters).toString();
        
        const response = await axios.get(`${API_URL}/farms?${params}`);
        return response.data;
    } catch (error) {
        console.error("Помилка завантаження ферм:", error);
        return [];
    }
};
export const fetchFarmById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/farms/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Помилка завантаження ферми з ID ${id}:`, error);
        return null;
    }
};