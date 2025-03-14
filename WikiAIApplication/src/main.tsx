import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import Router from "./router/Router";
import { UserProvider } from '././Context/UserContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={Router} />
    </UserProvider>
  </React.StrictMode>,
)
