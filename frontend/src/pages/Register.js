import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaKey, FaEnvelope } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    isError && toast.error(message);

    (isSuccess || user) && navigate("/");

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData((prevState) => {
      const { name, value } = event.target;
      return { ...prevState, [name]: value };
    });
  };

  const OnSubmit = (event) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="heading">
        <h2>
          <FaUser /> Register
        </h2>
        <p>Please create an account</p>
      </section>

      <section>
        <form onSubmit={OnSubmit} className="form">
          <div className="input-div">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={name}
            />
            <label htmlFor="name">
              <span>
                <FaUser />
              </span>
            </label>
          </div>
          <div className="input-div">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="email">
              <span>
                <FaEnvelope />
              </span>
            </label>
          </div>
          <div className="input-div">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={password}
            />
            <label htmlFor="password">
              <span>
                <FaKey />
              </span>
            </label>
          </div>

          <div className="input-div">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="confirm your password"
              onChange={handleChange}
              value={password2}
            />
            <label htmlFor="password2">
              <span>
                <FaKey />
              </span>
            </label>
          </div>
          <input type="submit" value="Submit" className="form-btn" />
        </form>
      </section>
    </div>
  );
}

export default Register;
