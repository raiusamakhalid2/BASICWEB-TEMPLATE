import React,{useContext,useEffect} from 'react';
import {useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function Protected({children}) {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

    useEffect(() =>{

        if(!user.IsAdmin){
            navigate('/')
        }
    },[user, setUser]);

  return children;
}
