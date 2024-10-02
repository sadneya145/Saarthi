import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Care from './Components/Care/Care';
import Header from './Components/Essentials/Header';
import Footer from './Components/Essentials/Footer';
import Forms from './Components/Forms/Forms';
import NurseProfile from './Components/Care/CompanionProfile/Nurse';
import LoginSignup from './Components/LoginSignup/LoginSignup';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginSignup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/care/:type",
    element: <Care />,
    // children: [
    //   {
    //     path: ":name", 
    //     element: <NurseProfile />
    //   }
    // ]
  },
  {
    path: "/care/:type/:name",
    element: <NurseProfile/>
  },
  {
    path: "/register/:type",
    element: <Forms />
  }
]);



function App() {
  return (
    <React.StrictMode>
      
      <main className='mb-0'>
        <RouterProvider router={router} />
      </main>
      
    </React.StrictMode>
  );
}

export default App;
