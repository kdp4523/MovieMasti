import { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/fetchApi";
import { searchContext } from "../context/searchContext";

const useFetch = (url, params) => {
  const [resData, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { query } = useContext(searchContext);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url, params)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        console.error("API Error:", err);
        
        // Better error handling with specific messages
        if (err.response?.status === 404) {
          setError("Content not found");
        } else if (err.response?.status === 500) {
          setError("Server temporarily unavailable");
        } else if (err.code === 'NETWORK_ERROR' || !navigator.onLine) {
          setError("Network connection lost");
        } else {
          setError("Unable to load content");
        }
      });
  }, [url, query]);
  
  return { resData, loading, error };
};

export default useFetch;
