import axiosInstance from '../utils/axiosConfig';
import { redirect } from 'react-router-dom';

const getArticles = async () => {
  let response = await axiosInstance
    .get('/article')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.status);
      if (error?.response?.status === 401) {
        return redirect('/login');
      }
    });
  console.log('status ', response?.status);

  // return redirect('/login');

  return response;
};

export default getArticles;
