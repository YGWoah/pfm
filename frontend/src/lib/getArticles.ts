import axiosInstance from '../utils/axiosConfig';
const getArticles = async () => {
  let articles = await axiosInstance
    .get('/article')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      // throw Error('Error while fetching articles');
    });
  return articles;
};

export default getArticles;
