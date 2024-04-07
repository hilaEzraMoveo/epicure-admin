import axios from "axios";

const API_BASE_URL = "http://localhost:3002/api/v1";

export const getDishes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dishes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};
