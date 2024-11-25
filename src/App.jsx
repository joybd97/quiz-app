import React, { useState } from "react";
import "./App.css";
import RootRouting from "./components/RootRouting";
import { UserProvider } from "./context/userContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <UserProvider>
      <RootRouting />


      <ToastContainer
        position="top-right" // Position of the toast
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Display newer toasts on top
        closeOnClick={true} // Close toast on click
        rtl={false} // Right-to-left layout
        pauseOnFocusLoss={true} // Pause timer when window loses focus
        draggable={true} // Allow dragging to dismiss
        pauseOnHover={true} // Pause timer on hover
        theme="light" // Theme: light, dark, or colored
      />
    </UserProvider>
  );
}

export default App;
