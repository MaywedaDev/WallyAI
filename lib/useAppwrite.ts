import { useEffect, useState } from "react";

const useAppwrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await fn();
      //   console.log("Response: ", response);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh };
};

export default useAppwrite;
