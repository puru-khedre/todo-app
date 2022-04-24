import { FaTrash } from "react-icons/fa";
import { deleteGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";

function GoalItem(props) {
  const dispatch = useDispatch();
  const { goal } = props;
  return (
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
      <h2>{goal.text}</h2>
      <button
        onClick={() => dispatch(deleteGoal(goal._id))}
        className="close-btn"
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default GoalItem;
