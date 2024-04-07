import axios from "axios";

const API_BASE_URL = "http://localhost:3002/api/v1";

export const getRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
