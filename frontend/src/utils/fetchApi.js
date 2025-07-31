import axios from "axios";
import { render } from "../host";

const BASE_URL = render;

// Configure axios defaults
axios.defaults.timeout = 15000; // 15 second timeout
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;

export const fetchDataFromApi = async (url, params) => {
  try {
    const res = await axios.get(BASE_URL + url, {
      params,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return res;
  } catch (error) {
    console.error("API Request failed:", {
      url: BASE_URL + url,
      params,
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText
    });
    
    // Re-throw with more context
    throw {
      ...error,
      message: error.response?.data?.msg || error.message || 'Network request failed',
      status: error.response?.status,
      isNetworkError: !error.response
    };
  }
};
