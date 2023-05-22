import { FaTrash, FaRecycle, FaArrowCircleUp } from "react-icons/fa";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function GoalItem(props) {
  const dispatch = useDispatch();
  const { goal } = props;

  const [goalUpdater, setGoalUpdater] = useState(false);
  const [goalPreview, setGoalPreview] = useState(false);
  const [goalText, setGoalText] = useState(goal.text);

  const toggleGoalUpdater = () => {
    console.log("puru");
    setGoalUpdater((prev) => !prev);
  };

  const toggleGoalPreview = (event) => {
    setGoalPreview((prev) => !prev);
    previewerOn(goal._id, event);
  };

  const handleChange = (event) => {
    setGoalText(event.target.value);
  };

  const updateGoalText = () => {
    dispatch(updateGoal({ id: goal._id, text: goalText }));
    setGoalUpdater((prev) => !prev);
  };
  const submitForm = (e) => {
    e.preventDefault();
    updateGoalText();
  };

  return (
    <div className="goalItem" onClick={toggleGoalPreview} id={"id" + goal._id}>
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
          <form onSubmit={submitForm}>
            <input
              value={goalText}
              onChange={handleChange}
              id="update-goal-input"
            />
          </form>
        </div>
      ) : (
        <h2>{goalText}</h2>
      )}
      <div className="goalItem-btns">
        <button onClick={goalUpdater ? updateGoalText : toggleGoalUpdater}>
          <label htmlFor="update-goal-input">
            {goalUpdater ? <FaArrowCircleUp /> : <FaRecycle />}
          </label>
        </button>
        <button onClick={() => dispatch(deleteGoal(goal._id))}>
          <FaTrash />
        </button>
      </div>
      <div className="goalItem-close-btn">
        {goalPreview && <button onClick={toggleGoalPreview}>X</button>}
      </div>
    </div>
  );
}

export default GoalItem;

const previewerOn = (id, e) => {
  document.querySelector(`#id${id}`).style = `z-index:1;`;
  document.querySelector(`#id${id} h2`).style = `white-space: unset;`;
};
const previewerOff = (id, e) => {
  document.querySelector(`#id${id}`).style = `z-index:1;`;
  console.log(e.target);
};
