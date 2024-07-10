import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function Auth() {
  const serverUrl = import.meta.env.VITE_SERVERURL;

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showNote, setShowNote] = useState(false);

  function viewLogin(state) {
    setError(null);
    setIsLogIn(state);
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all the fields!");
      return;
    }
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords do not match. Please make sure they are the same.");
      return;
    }
    setShowNote(true);
    const response = await axios.post(`${serverUrl}/${endpoint}`, { email, password });
    if (response.data.failed) {
      setError(response.data.failed);
      setShowNote(false);
    } else {
      console.log(response.data);
      setCookie("Email", response.data.email);
      setCookie("UserId", response.data.userId);
      setCookie("AuthToken", response.data.token);
      window.location.reload();
    }
  }

  return (
    <>
      <div className="jumbotron text-center position-relative">
        <div className="container">
          <div className="p-3 bg-warning rounded">
            <p className="m-0">
              Note: It may take a while (even 2-5 minutes) to process your request since the app is hosted on a free hosting service (render.com).
            </p>
          </div>
          <i className="fas fa-key fa-2x"></i>
          <h1 className="display-6">To Do</h1>
          <p className="lead">Be productive</p>
          <hr />
          <form onSubmit={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}>
            {!showNote && <h2>{isLogIn ? "Please log in" : "Please sign up"}</h2>}
            {showNote && <h2><div className="spinner-border"></div></h2>}
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogIn && (
              <input
                className="form-control mb-3"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            {error && <p className="text-danger">{error}</p>}
            <input className="btn btn-dark mb-3" type="submit" value={isLogIn ? "Log In" : "Sign Up"} />
          </form>
          <div className="row">
            <button
              className="col-6 btn"
              onClick={() => viewLogin(false)}
              style={{ backgroundColor: !isLogIn ? "rgb(255,255,255)" : "rgb(188,188,188)" }}
            >
              Sign Up
            </button>
            <button
              className="col-6 btn"
              onClick={() => viewLogin(true)}
              style={{ backgroundColor: isLogIn ? "rgb(255,255,255)" : "rgb(188,188,188)" }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
