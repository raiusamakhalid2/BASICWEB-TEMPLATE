import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import bcrypt from 'bcryptjs';
import "./signup.css";
import loginimgside from "../../images/login.jpg";

export default function SignUp() {
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [password, setpassword] = useState()
  const [email, setemail] = useState()
  const [Emailexist, setEmailexist] = useState()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerOptions = {
    email: {
      required: "Email cannot be empty",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address format",
      },
    },
    password: {
      required: "Password cannot be empty",
      minLength: {
        value: 5,
        message: "Password must be at least 10 characters",
      }
    },
  };
  const navigate = useNavigate()
  const Submit = async (data) => {
    const hashedPassword = bcrypt.hash(await data.password, 10);
    const formData = { email: data.email, password: await hashedPassword,phone: phoneNumbers };
    console.log(formData);
    try {

      const response = await axios.post("http://localhost:4000/users", formData);
      if (response.data.status === 404) {
        setEmailexist(response.data.message)
      }else {
        navigate('/login');
      }
      
    } catch (err) {
      console.error(err);
    }

  }
  
// <--------------handlePhoneNumber Start------------------->
  const addField = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const removeField = (index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleChange = (value, index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  // <--------------handlePhoneNumber End------------------->

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black ">
            <div className="signupblockleft">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "23rem" }} onSubmit={handleSubmit(Submit)} method="post">
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign Up
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      className="form-control form-control-lg"
                      onChange={(e) => setemail(e.target.value)}
                    {...register("email", registerOptions.email)}
                    />
                    <label className="form-label">Email address</label>
                    <small className="text-danger">
                    {(errors?.email && errors.email.message) || Emailexist}
                    {/* {errors?.email && errors.email.message} */}
                  </small>
                  </div>

                  <div className="form-outline mb-4">
                    {phoneNumbers.map((phoneNumber, index) => (
                      <div key={index} className="number-field">
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => handleChange(e.target.value, index)}
                          className="form-control form-control-lg"
                        />
                        {index === phoneNumbers.length - 1 &&
                          phoneNumbers.length <= 3 && (
                            <button
                              className="btn btn-primary btn-sm me-1"
                              onClick={addField}
                            >
                              +
                            </button>
                          )}
                        {phoneNumbers.length > 1 && (
                          <button
                            className="btn btn-primary btn-sm ml-3"
                            onClick={() => removeField(index)}
                          >
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    <label className="form-label">Phone Number</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      className="form-control form-control-lg"
                      onChange={(e) => setpassword(e.target.value)}
                    {...register("password", registerOptions.password)}
                    />
                    <label className="form-label">Password</label>
                    <small className="text-danger">
                    {errors?.password && errors.password.message}
                  </small>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                    >
                      SugnUp
                    </button>
                  </div>

                  <p>
                    Do you have an account?{" "}
                    <Link to="/login" className="link-info">
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={loginimgside}
              alt=""
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
