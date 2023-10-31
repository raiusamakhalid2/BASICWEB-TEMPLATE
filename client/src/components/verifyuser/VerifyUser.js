import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./verifyuser.css";
import checkmark from "../../images/checkmark.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";

export default function VerifyUser() {
  const [validurl, setValidUrl] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const mydecoded = decodeToken(token);
        const id = mydecoded.userId;
        const res = await axios.patch(`http://localhost:4000/login/${id}`);
        if (res) {
          setValidUrl(true);
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Fragment>
      {validurl ? (
        <div className="verifyuser">
          <div className="text-center">
            <img src={checkmark} alt="" className="tick-img" />
            <h2>Congratulations your account is verfied</h2>
            <p>Click button to login</p>
            <Link to="/login" className="btn btn-info btn-lg btn-block">
              Login
            </Link>
          </div>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
}
