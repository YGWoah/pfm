import { LoaderFunction } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

export default async function getArticle(id: string) {
  try {
    const article = await axiosInstance
      .get(`/article/${id}`)
      .then((response) => {
        return response.data;
      });
    console.log(article);

    return article;
  } catch (error) {
    throw new Error('Error while fetching article');
  }
}
