import React, { useState } from "react";
import "./App.css";
import RootRouting from "./components/RootRouting";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <RootRouting />
    </UserProvider>
  );
}

export default App;
