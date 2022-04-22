import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevState) => {
      const { name, value } = event.target;
      return { ...prevState, [name]: value };
    });
  };

  const OnSubmit = (event) => {
    event.preventDefault();
  };

  const { email, password } = formData;

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={OnSubmit}>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={email}
          />
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={password}
          />

          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
