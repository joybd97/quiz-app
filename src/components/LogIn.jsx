import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPIError } from "../api/APIErrorHandler";
import avatar from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/userContext";

function LogIn() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    isAdmin,
    setIsAdmin,
  } = useContext(UserContext);

  const [password, setPassword] = useState("");
  //const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // API request payload
    const payload = {
      email: username,
      password: password,
    };

    if (isAdmin) {
      payload.role = "admin";
    }

    try {
      const response = await axios
        .post("http://localhost:5000/api/auth/login", payload)
        .then((response) => {
          console.log(response);
          const token = response?.data?.data?.tokens?.accessToken;
          localStorage.setItem("authToken", token); // Store the token in localStorage
          console.log(token);
          const user = response.data.data.user.full_name;
          setUsername(user);
          setIsLoggedIn(true);
        });

      alert("Sign-in successful!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.log(error);
      const errorMessage = handleAPIError(error);
      alert(errorMessage);
    }
  };

  const goToSignUp = () => {
    navigate("/register"); // Redirect to the sign-up page
  };

  return (
    <div className="bg-white text-gray-800 overflow-hidden text-left">
      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <img src={avatar} alt="Illustration" className="mx-auto" />
            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you're preparing for exams, improving your knowledge, or
              simply having fun, there's no better way to sharpen your mind.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} alt="Logo" className="h-7" />
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-2">
                  Enter your username or email address
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Username or email address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Enter your Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6 flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="admin"
                  className="px-4 py-3 rounded-lg border border-gray-300"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="admin" className="block">
                  Login as Admin
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mb-4"
              >
                Sign in
              </button>
            </form>

            <div className="text-center">
              <a href="#" className="text-primary">
                Forgot Password
              </a>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account?{" "}
                <button onClick={goToSignUp} className="text-primary underline">
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
