type Goal = {
  objectId: string;
  goal: string;
  level: number;
  subgoals?: Goal[];
};

export default function GoalPreview(goal: Goal) {
  return (
    <div>
      <div>{goal.goal}</div>
      {goal.subgoals && (
        <ul>
          {goal.subgoals.map((subgoal) => (
            <li key={subgoal.objectId}>
              <GoalPreview {...subgoal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
