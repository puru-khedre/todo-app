import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoalContainer from "../components/GoalContainer";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (user) {
      isError && toast.error(message);

      dispatch(getGoals());
    } else navigate("/");

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div>
      {user ? (
        <>
          <section className="heading">
            <h2>Welcome Back, {user.name}</h2>
            <p>Goals Dashboard</p>
          </section>
          <GoalForm />
          <GoalContainer goals={goals} />
          {isLoading && <Spinner />}
        </>
      ) : (
        <section className="heading">
          <h2>Dashboard</h2>
          <p>Welcome to GoalSetter application</p>
          <p>Login or Register if new user, to get your Dashboard/Goals.</p>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
