import SignUp from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
//import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import StoragePage from "../pages/StoragePage";
import MyStoragePage from "../pages/MyStoragePage";
import WriteStatePage from "../pages/WriteStatePage";
import LLMSearchPage from "../pages/LLMSearchPage";
import NotFoundPage from "../pages/NotFoundPage";
import { createBrowserRouter } from 'react-router-dom';
import App from "../App"

const Router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
            path: '/',
            element: <HomePage />,
        },
        {
          path: '/storage',
          element: <StoragePage />,
        },
        {
          path: '/my_storage',
          element: <MyStoragePage />,
        },
        {
          path: '/write_state',
          element: <WriteStatePage />,
        },
        {
          path: '/LLMSearch',
          element: <LLMSearchPage />,
        },
        {
          path: '/SignUp',
          element: <SignUp />,
        },
        {
          path: '/LogIn',
          element: <LogIn/>,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

export default Router   