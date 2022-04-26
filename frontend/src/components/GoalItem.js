import { FaTrash, FaRecycle } from "react-icons/fa";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function GoalItem(props) {
  const dispatch = useDispatch();
  const { goal } = props;

  const [goalUpdater, setGoalUpdater] = useState(false);
  const [goalText, setGoalText] = useState(goal.text);

  const toggleGoalUpdater = () => {
    setGoalUpdater((prev) => !prev);
  };

  const handleChange = (event) => {
    setGoalText(event.target.value);
  };

  const updateGoalText = () => {
    dispatch(updateGoal({ id: goal._id, text: goalText }));
    setGoalUpdater((prev) => !prev);
  };

  const previewGoal = (event) => {
    let { name } = event.target;
    console.log(event.target);
    let holder = document.querySelector(`[id='${name}']`);
    holder.style.border = "3px solid red";
  };

  return (
    <div className="goalItemHolder" id={goal._id} onClick={previewGoal}>
      <div className="goalItem">
        <div>
          {new Date(goal.createdAt).toLocaleDateString() +
            " " +
            new Date(goal.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
        </div>
        {goalUpdater ? (
          <div className="goal-updater">
            <input value={goalText} onChange={handleChange} />
            <input value="Set" type="submit" onClick={updateGoalText} />
          </div>
        ) : (
          <h2>{goalText}</h2>
        )}
        <div className="goalItem-btns">
          <button onClick={toggleGoalUpdater}>
            <FaRecycle />
          </button>
          <button onClick={() => dispatch(deleteGoal(goal._id))}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalItem;
