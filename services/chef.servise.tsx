import axios from "axios";
import { HttpClientService } from "./HttpClient.service";

const API_BASE_URL = "http://localhost:3002/api/v1";

export const getChefs = async () => {
  try {
    //HttpClientService.get("/chefs");
    const response = await axios.get(`${API_BASE_URL}/chefs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chefs:", error);
    throw error;
  }
};
