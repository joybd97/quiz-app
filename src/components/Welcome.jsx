import React, { useContext } from "react";
import avatar from "../assets/avater.webp";
import { UserContext } from "../context/userContext";

const Welcome = () => {
  const { username } = useContext(UserContext);

  return (
    <div className="text-center mb-12">
      <img
        src={avatar}
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
      />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2
        className="text-4xl font-bold text-gray-700"
        style={{ fontFamily: "Jaro" }}
      >
        {username}
      </h2>
    </div>
  );
};

export default Welcome;
