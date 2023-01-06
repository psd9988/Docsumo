import React, { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { SiGooglechat } from "react-icons/si";
import { LoginStateContext } from "../../contexts/LoginContext";
import brandLogo from "../../assets/docsumoLogo.png";
import ReactLoading from "react-loading";

import "./LoginPage.css";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as yup from "yup";

export const LoginPage = () => {
  // validations in yup library:-
  const loginValidations = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: yup
      .string()
      .min(1, "Please enter a password")
      .required("Please enter a password"),
  });

  // all hooks:-
  const loginApiUrl = "https://apptesting.docsumo.com/api/v1/eevee/login/";
  const navigate = useNavigate();
  const [chat, setChat] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState();

  //  global state:-
  const { setLoggedinUser } = useContext(LoginStateContext);

  const handleLogin = (email, password) => {
    setLoginError("");
    setLoader(true);

    Axios.post(loginApiUrl, { email: email, password: password })
      .then((response) => {
        navigate("/dashboard");
        setLoggedinUser(response.data.data.user.full_name);
      })
      .catch((errorData) => {
        if (errorData.response.data.message) {
          setLoginError(errorData.response.data.message);
        } else if (errorData.response.data.error) {
          setLoginError(errorData.response.data.error);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {/* LOGO OF APP */}
      <a href="#">
        <img id="brandLogo" src={brandLogo} alt="Brand Logo" />
      </a>

      {/* Login Form */}
      <Formik
        validationSchema={loginValidations}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, action) => {
          handleLogin(values.email, values.password);
          console.log(values);
          action.resetForm();
        }}
      >
        <Form className="loginFormContainer">
          <h1 className={loginError ? "loginPageHeading2" : "loginPageHeading"}>
            Login to your Docsumo account
          </h1>

          {/* Api Login Error */}
          <span className={loginError ? "errorMessageTxt" : "displayNone"}>
            {loginError}
          </span>

          {/* email input */}
          <label className="labelText" htmlFor="email">
            Work Email
          </label>

          <Field
            placeholder="janedoe@abc.com"
            type="text"
            name="email"
            className="email"
          />

          {/* email error */}
          <div className="emailError">
            <ErrorMessage name="email" />
          </div>

          {/* password input */}
          <label className="labelText" htmlFor="password">
            Password
          </label>
          <Field
            placeholder="Enter password here..."
            className="password"
            name="password"
            type="password"
          />

          {/* Password Error */}
          <span className="passwordError">
            <ErrorMessage name="password" />
          </span>

          <a href="#" className="forgotPwdTextLink">
            Forgot Password?
          </a>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loader}
            className={loader ? "loaderLoginBtn" : "loginBtn"}
          >
            {loader ? (
              <>
                <div className="loaderIconText">
                  <span className="loaderIcon">
                    <ReactLoading
                      type={"spin"}
                      color={"white"}
                      height={23}
                      width={23}
                    />
                  </span>
                  <span> Logging in...</span>
                </div>
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* sign up options for user below:- */}
          <div className="signupAccTextContainer">
            <span className="signUpText">Don't have an account?</span>
            <a href="#" className="signUpLink">
              Sign Up
            </a>
          </div>
        </Form>
      </Formik>

      {/* Live Chat icons */}
      <a>
        <div
          onClick={() => setChat(!chat)}
          className={chat ? "iconBgColor1" : "iconBgColor2"}
        >
          {chat ? (
            <a className="chatCloseIcon"> X </a>
          ) : (
            <SiGooglechat className="chatMessageIcon" />
          )}
        </div>
      </a>
    </>
  );
};
