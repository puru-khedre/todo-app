import GoalItem from "./GoalItem";
function GoalContainer(props) {
  const { goals } = props;
  return (
    <>
      {" "}
      <section className="content" id="goal-container">
        {goals.length > 0 ? (
          <>
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal._id} />
            ))}
          </>
        ) : (
          <h3>You have not set any goals.</h3>
        )}
      </section>
    </>
  );
}

export default GoalContainer;
