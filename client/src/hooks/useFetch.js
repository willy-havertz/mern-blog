import { useState, useEffect } from "react";
import API from "../services/api";

export default function useFetch(endpoint, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get(endpoint, { params })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint, params]);

  return { data, loading, error };
}
