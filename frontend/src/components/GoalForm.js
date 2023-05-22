import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FaTextHeight } from "react-icons/fa";
import { createGoal } from "../features/goals/goalSlice";
import { toast } from "react-toastify";

function GoalForm() {
  const [goal, setGoal] = useState({ text: "" });

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    let { value } = event.target;
    setGoal((prevState) => ({ text: value }));
  };

  const submitGoal = (event) => {
    event.preventDefault();
    if (/\S/.test(goal.text)) {
      dispatch(createGoal(goal));
    } else {
      toast.error("Please enter valid text");
    }
    setGoal({ text: "" });
  };

  const { text } = goal;

  return (
    <section>
      <form className="form goal-form" id="goal-form" onSubmit={submitGoal}>
        <div className="input-div">
          <input
            type="text"
            className="form-control"
            id="goal"
            name="goal"
            placeholder="Enter your goal"
            onChange={handleChange}
            value={text}
          />
          <label htmlFor="goal">
            <span>
              <FaTextHeight />
            </span>
          </label>
        </div>
        <input type="submit" value="Set Goal" className="form-btn" />
      </form>
    </section>
  );
}

export default GoalForm;
