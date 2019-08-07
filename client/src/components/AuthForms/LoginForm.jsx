import React, { useState } from "react";
import "./styles.scss";
import { Redirect } from "react-router-dom";

const LoginForm = props => {
  const [registerRedirect, setRedirect] = useState(false);

  const onHandleLogin = e => {
    let email = e.target.email.value;
    let password = e.target.password.value;
    if (email === "") {
      console.log("empty email");
      return;
    }

    if (password === "") {
      console.log("empty password");
      return;
    }

    const userCredentials = {
      email,
      password
    };

    console.log(userCredentials);
  };

  return (
    <div className="w-full h-full max-w-xs form-registration">
      {registerRedirect ? (
        <Redirect
          to={{
            pathname: "registration",
            state: { from: props.location }
          }}
        />
      ) : null}
      <form onSubmit={onHandleLogin} className=" px-8 pt-6 pb-8 ">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*************"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-start">
            <input className="mr-2 " type="checkbox" />
            <span className="text-xs ">Remember me</span>
          </div>
          <a className="text-xs" href="/">
            Forgot password?
          </a>
        </div>

        <div className="flex items-center justify-start">
          <button
            type="submit"
            className="font-medium  py-2 px-4 mr-2 border  sign-up-btn"
          >
            Log In
          </button>
          <button
            type="button"
            className="font-medium  py-2 px-4 border sign-up-btn-no-bg"
            onClick={() => {
              setRedirect(true);
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="block mt-8 cursor-pointer">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7092 0H2.2908C1.02565 0 0 0.965273 0 2.15603V13.8439C0 15.0346 1.02561 15.9999 2.2908 15.9999H8.41549L8.42593 10.2824H6.84768C6.64256 10.2824 6.47609 10.1263 6.4753 9.93328L6.46774 8.0903C6.46695 7.8962 6.63391 7.73847 6.84015 7.73847H8.41552V5.95767C8.41552 3.89107 9.75657 2.76579 11.7153 2.76579H13.3227C13.5283 2.76579 13.6951 2.92271 13.6951 3.11629V4.67031C13.6951 4.86383 13.5285 5.0207 13.3229 5.02081L12.3365 5.02124C11.2713 5.02124 11.065 5.49766 11.065 6.19681V7.7385H13.4057C13.6287 7.7385 13.8018 7.9218 13.7755 8.13025L13.5434 9.97325C13.5212 10.1496 13.3623 10.2825 13.1736 10.2825H11.0754L11.065 16H14.7093C15.9744 16 17 15.0348 17 13.844V2.15603C17 0.965273 15.9744 0 14.7092 0Z"
              fill="#1EE3CF"
            />
          </svg>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
