import React, { useState, useEffect } from "react";
import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Login"); // Toggle Login/SignUp
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (state === "Sign Up" && !formData.username.trim()) {
      alert("Name is required.");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Email is required.");
      return false;
    }
    if (!formData.password.trim()) {
      alert("Password is required.");
      return false;
    }
    if (state === "Sign Up" && !agree) {
      alert("You must agree to the terms of use and privacy policy.");
      return false;
    }
    return true;
  };

  const signup = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some(
        (user) => user.email === formData.email
      );

      if (userExists) {
        alert("User already exists. Please log in.");
      } else {
        const newUser = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
        localStorage.setItem(
          "users",
          JSON.stringify([...existingUsers, newUser])
        );
        localStorage.setItem("user", JSON.stringify(newUser)); // Save logged-in user
        setIsLoggedIn(true);
        alert("Sign-up successful! Redirecting...");
        window.location.replace("/");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const login = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user)); // Save logged-in user
        setIsLoggedIn(true);
        alert("Login successful! Redirecting...");
        window.location.replace("/");
      } else {
        alert("Invalid email or password. Try again.");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("Logged out successfully!");
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        {isLoggedIn ? (
          <div>
            <h1>Welcome!</h1>
            <p>
              You are logged in as{" "}
              {JSON.parse(localStorage.getItem("user")).email}
            </p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <h1>{state}</h1>
            <div className="login-signup-fields">
              {state === "Sign Up" && (
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Your Name"
                />
              )}
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder="Your Email"
              />
              <input
                name="password"
                value={formData.password}
                onChange={changeHandler}
                type="password"
                placeholder="Your Password"
              />
            </div>

            <button
              onClick={state === "Login" ? login : signup}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>

            {state === "Login" ? (
              <p className="login-signup-login">
                Create An Account?{" "}
                <span onClick={() => setState("Sign Up")}>Click Here</span>
              </p>
            ) : (
              <p className="login-signup-login">
                Already have an account?{" "}
                <span onClick={() => setState("Login")}>Login Here</span>
              </p>
            )}

            {state === "Sign Up" && (
              <div className="login-signup-agree">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
                <p>
                  By continuing, I agree to the terms of use and privacy policy.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
