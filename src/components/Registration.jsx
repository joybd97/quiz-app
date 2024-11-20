import React, { useState } from "react";
import axios from "axios";
import avatar from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const basicFormData = {
  full_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAdmin: false, // Tracks admin registration
};

const Registration = () => {
  const [formData, setFormData] = useState({ ...basicFormData });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes and text inputs
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Determine the payload based on the role
    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      ...(formData.isAdmin && { role: "admin" }), // Add role field if registering as admin
    };

    try {
      console.log(payload);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      // Handle success response
      if (response.status === 201) {
        alert("Account created successfully!");
        setSuccess("Account created successfully!");
        setError("");
        setFormData({ ...basicFormData });

        // Redirect to login after success
        setTimeout(() => navigate("/log-in"), 2000);
      }
    } catch (err) {
      // Handle error response
      if (err.response) {
        alert("Registration failed!");
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const goToLogIn = () => {
    navigate("/log-in"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-left">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white flex-col justify-center items-center p-12">
        <img src={avatar} alt="Illustration" className="max-w-sm" />
        <h2 className="text-3xl font-bold mt-6 text-left">Sign Up Now</h2>
        <p className="text-xl mt-4 text-center">
          Logging in unlocks your personal progress tracker, letting you
          evaluate your performance and see how you stack up against others.
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 lg:p-12 text-left">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-4">
            <span>Welcome to</span>
            <img src={logo} alt="Logo" className="h-8" />
          </h2>
          <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="full_name" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password & Confirm Password */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="confirmPassword" className="block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>

            {/* Register as Admin */}
            <div className="mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                id="admin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="w-5 h-5 border-gray-300"
              />
              <label htmlFor="admin" className="text-sm">
                Register as Admin
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
            >
              Create Account
            </button>
          </form>

          {/* Redirect to Log In */}
          <p className="text-center mt-6">
            Already have an account?{" "}
            <button onClick={goToLogIn} className="text-primary underline">
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
