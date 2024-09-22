import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegistrationForm() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target; //name, value

    if (name === "firstName") setFirstNameInput(value);
    if (name === "lastName") setLastNameInput(value);
    if (name === "email") setEmailInput(value);
    if (name === "password") setPasswordInput(value);
    if (name === "confirmPassword") setConfirmPasswordInput(value);

    // switch (name) {
    //   case "firstName":
    //     setFirstNameInput(value);
    //     break;
    //   case "lastName":
    //     setLastNameInput(value);
    //     break;
    //   case "email":
    //     setEmailInput(value);
    //     break;
    //   case "password":
    //     setPasswordInput(value);
    //     break;

    //   default:
    //     return;
    // }
  };

  const formValidation = () => {
    let validationErrors = {};
    if (!firstNameInput.trim())
      validationErrors.firstName = "First name is required";
    if (!lastNameInput.trim())
      validationErrors.lastName = "Last name is required";
    if (!emailInput.trim()) validationErrors.email = "Email is required";
    if (!passwordInput.trim()) {
      validationErrors.password = "Password is required";
    } else if (passwordInput.length < 4) {
      validationErrors.password = "Password length must be more than 4";
    } else if (passwordInput !== confirmPasswordInput) {
      validationErrors.password = "Passwords do no match";
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
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        // setTimeout(() => , 2000);
        navigate("/dashboard");
        toast(data.message);
      } else {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      //Clear input fields
      setFirstNameInput("");
      setLastNameInput("");
      setEmailInput("");
      setPasswordInput("");
      setConfirmPasswordInput("");
      setLoading(false);
    } catch (error) {
      // toast("Error submitting form");
      // console.error("Error submitting the form", error);
      // setLoading(false);

      //if the error is 401 unauthorized and the token is expired, send an error message
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Token is expired!"
      ) {
        toast("Token expired, logging out...");
        localStorage.removeItem("token");
        navigate("/login");
        setLoading(false);
      } else {
        toast(error.response.data);
        console.error(error.response.data);
        setLoading(false);
      }
    }
  };

  return (
    <form className="w-2/5 mx-auto text-center" onSubmit={handleSubmit}>
      <h2 className="mt-20 text-primary font-bold text-3xl uppercase">
        Registration
      </h2>
      <p className="font-medium mb-5">Enter your registration information</p>
      <div className="flex flex-col items-center w-full gap-5">
        <input
          className="inputs" //provides styling
          value={firstNameInput} //tracks the values inputed
          name="firstName" //provides a name to track the input field/for specificity
          onChange={handleInput} //function to use the values inputed
          type="text" //determines the type of input we are using
          placeholder="Your first name" //gives text definition of the input
        />
        {errors && errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
        <input
          className="inputs"
          value={lastNameInput}
          onChange={handleInput}
          name="lastName"
          type="text"
          placeholder="Your last name"
        />
        {errors && errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
        <input
          className="inputs"
          value={emailInput}
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
          value={passwordInput}
          onChange={handleInput}
          name="password"
          type="password"
          placeholder="Your password"
        />
        <input
          className="inputs"
          value={confirmPasswordInput}
          onChange={handleInput}
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
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
        Sign up
      </button>
      <p className="mt-3 font-semibold">
        Already registered?{" "}
        <Link className="text-primary hover-links" to="/login">
          Log in
        </Link>
      </p>
    </form>
  );
}

export default RegistrationForm;
