import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target; //name, value

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const formValidation = () => {
    let validationErrors = {};

    if (!email.trim()) validationErrors.email = "Email is required";
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; //true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValidation()) {
      return; //if the validation fails, do not submit the form
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        toast(data.message);
      } else {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      //Clear input fields
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      toast("Error submitting form");
      console.error("Error submitting the form", error);
      setLoading(false);
    }
  };

  return (
    <form className="w-2/5 mx-auto text-center" onSubmit={handleSubmit}>
      <h2 className="mt-20 text-primary font-bold text-3xl uppercase">Login</h2>
      <p className="font-medium mb-5">Enter your login information</p>
      <div className="flex flex-col items-center w-full gap-5">
        <input
          className="inputs"
          value={email}
          onChange={handleInput}
          name="email"
          type="text"
          placeholder="Your email"
        />
        {errors && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        <input
          className="inputs"
          value={password}
          onChange={handleInput}
          name="password"
          type="password"
          placeholder="Your password"
        />
        {errors && errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary mt-3 p-3 text-white uppercase font-semibold rounded-lg hover-links flex justify-center gap-3"
      >
        {loading && <div className="loader" />}
        Login
      </button>
      <p className="mt-3 font-semibold">
        Don't have an account?{" "}
        <Link className="text-primary hover-links" to="/login">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
