import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Fragment } from 'react';
import './App.css';
import Hero from './pages/Hero';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Article from './pages/Article';
import { Test, logged } from './lib/index';
import Menu from './Component/Menu';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: logged() ? <Menu /> : <Hero />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'main',
    element: <Menu />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Article />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'article',
        element: <Article />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'profile',
        element: <SignUp />,
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
