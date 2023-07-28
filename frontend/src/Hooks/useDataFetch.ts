import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { redirect } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
export default function useDataFetch(
  url: string,
  //   params: any,
  method: string,
  data: any
) {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        axiosInstance({
          url,
          method,
          data,
        })
          .then((res) => {
            console.log(res);
            setResponse(res?.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            console.log(error?.response?.status);

            if (error?.response?.status === 401) {
              console.log('i am redirecting to login');

              redirect('/login');
            }
          });
      } catch (error) {
        console.log(error);

        setError(error);
      }
    };
    fetchData();
  }, [url, method, data]);

  return { response, error, loading };
}
