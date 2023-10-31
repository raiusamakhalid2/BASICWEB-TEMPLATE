import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { decodeToken } from 'react-jwt';

import Login from './components/login/Login';
import Home from './components/home/Home';
import SignUp from './components/signup/SignUp';
import AdminPage from './components/home/AdminPage';
import UserPage from './components/home/UserPage';
import Protected from './components/protected/Protected';
import LessProtected from './components/protected/LessProtected';
import VerifyUser from './components/verifyuser/VerifyUser';
import SideBar from './components/sidebar/SideBar';
import NotFound from './pages/404/404';
import './App.css'

function App() {
  const [user, setUser] = useState(AuthContext);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('mylogintoken');
    if (storedValue) {
      const decodeduser = decodeToken(storedValue);
      setUser(decodeduser);
    } else {
      setUser(null);
    }

    setUserDataLoaded(true);
  }, []);

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignpage  = location.pathname === '/signup'
  const PageNotFound  = location.pathname === '/404'
  const isVerified = location.pathname.startsWith('/verify/') 

  return (
    <>
    <div className='mycontainer'>
      <AuthContext.Provider value={{ user, setUser }}>
        
      {isLoginPage || isVerified || isSignpage || PageNotFound ? null : <SideBar />}
        {userDataLoaded && (
          <Routes>
            <Route path="/verify/:token" element={<VerifyUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<LessProtected><Home/></LessProtected>} path="/" />       
            <Route element={<LessProtected><UserPage/></LessProtected>} path="/user" />

            <Route element={<Protected><AdminPage/></Protected>} path="/admin" />

            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        )}
      </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
