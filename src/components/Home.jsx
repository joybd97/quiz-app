import React, { useContext } from "react";
import Welcome from "./Welcome";
import { Navbar } from "./Navbar";
import QuizItemCard from "./QuizItemCard";
import { UserContext } from "../context/userContext";

function Home() {
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);

  return (
    <>
      <Navbar />
      {isLoggedIn && <Welcome />}
      <QuizItemCard />
    </>
  );
}

export default Home;
