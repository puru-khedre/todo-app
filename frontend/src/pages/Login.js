import { useState, useEffect } from "react";
import { FaSignInAlt, FaEnvelope, FaKey } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { email, password } = formData;

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

    const userData = { email, password };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="heading">
        <h2>
          <FaSignInAlt /> Login
        </h2>
        <p>Login and start setting goals</p>
      </section>

      <section>
        <form onSubmit={OnSubmit} className="form">
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
            />{" "}
            <label htmlFor="password">
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

export default Login;
