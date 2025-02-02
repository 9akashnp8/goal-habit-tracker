import { Goal } from "@/lib/model";

type Props = {
  platId: string;
};

export default async function GoalList({ platId }: Props) {
  const goals = await Goal.find({ planId: platId });
  return (
    <>
      <h2>Goal List:</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.goal.goal}
            {goal.goal.subgoals && (
              <ul>
                {goal.goal.subgoals.map((subgoal) => (
                  <li key={subgoal.objectId}>
                    {subgoal.goal}
                    {subgoal.subgoals && (
                      <ul>
                        {subgoal.subgoals.map((subsubgoal) => (
                          <li key={subsubgoal.objectId}>{subsubgoal.goal}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
