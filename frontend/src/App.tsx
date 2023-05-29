import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';

// Pages
import Hero from './pages/Hero';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Article from './pages/Article';
import AddArticle from './pages/AddArticle';
import Profile from './pages/Profile';
import Menu from './Component/Menu';
import SingleArticle from './pages/SingleArticle';

// Lib or utils
import getArticles from './lib/getArticles';
import getArticle from './lib/getArticle';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'home',
    element: <Menu />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Article />,
        errorElement: <ErrorPage />,
        loader: async () => {
          return await getArticles();
        },
      },
      {
        path: 'article',
        element: <Article />,
        errorElement: <ErrorPage />,
        loader: async () => {
          console.log('test');
          return await getArticles();
        },
      },
      {
        path: 'article/:id',
        element: <SingleArticle />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          if (params?.id !== undefined) {
            return await getArticle(params.id);
          }
        },
      },

      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: <AddArticle />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <Fragment>
      <RouterProvider router={BrowserRouter} />
    </Fragment>
  );
}

export default App;
