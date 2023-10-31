import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import loginimgside from "../../images/login.jpg";
import "./login.css";

export default function Login() {
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const [Error, setError] = useState();

  useEffect(() => {
    setError("");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        value: 4,
        message: "Password must be at least 10 characters",
      },
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const Submit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/login",data);

      if (response.data.status === 404) {
        setError(response.data.message);
      } else {

        const mylogintoken = response.data;
        localStorage.setItem("mylogintoken", JSON.stringify(mylogintoken));

        const storedValue = localStorage.getItem("mylogintoken");
        console.log(storedValue);


        navigate(from, {replace: true});
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black ">
            <div className="loginblockleft">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form
                  style={{ width: "23rem" }}
                  onSubmit={handleSubmit(Submit)}
                  method="post"
                >
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
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
                      {errors?.email && errors.email.message}
                    </small>
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
                    <button className="btn btn-info btn-lg btn-block">
                      Login
                    </button>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <Link to="/" className="text-muted">
                      Forgot password?
                    </Link>
                  </p>
                  <small className="text-danger">{Error}</small>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-info">
                      Register here
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
