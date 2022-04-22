import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
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

  const { name, email, password, password2 } = formData;

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={OnSubmit}>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={name}
          />
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

          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            placeholder="confirm your password"
            onChange={handleChange}
            value={password2}
          />
          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
