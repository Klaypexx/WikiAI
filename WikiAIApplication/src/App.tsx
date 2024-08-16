//all files code UTF-8!!!!
import "./App.css";
//import Body from "./components/Body/Body";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import StoragePage from "./pages/StoragePage";
import MyStoragePage from "./pages/MyStoragePage";
import WriteStatePage from "./pages/WriteStatePage";
import LLMSearchPage from "./pages/LLMSearchPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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

function App() {
  return (
  <>
    <RouterProvider router={router} />;
  </>
  );
}

export default App;
