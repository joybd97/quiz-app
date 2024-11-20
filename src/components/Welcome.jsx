import React, { useContext } from "react";
import Avatar from "react-avatar";
import { UserContext } from "../context/userContext";

const Welcome = () => {
  const { username } = useContext(UserContext);

  return (
    <div className="text-center mb-12">
      <Avatar
        name={username} 
        size="120" 
        round={true} 
        className="mx-auto mb-4" 
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
