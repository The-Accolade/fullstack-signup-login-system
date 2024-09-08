import { Routes, Route, Link, Navigate } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NotFound = () => {
  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-6xl text-red-500 animate-pulse font-title">
          Not Found!
        </h1>
        <p className="text-2xl">
          Click{" "}
          <Link to="/" className="underline text-red-500">
            here
          </Link>{" "}
          to go back to our website
        </p>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        autoClose={2000}
        closeOnClick
        theme="dark"
      />
    </div>
  );
}

export default App;
