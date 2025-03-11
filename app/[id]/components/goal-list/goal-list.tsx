import { Goal } from "@/lib/model";
import styles from "./goal-list.module.css";

type Props = {
  platId: string;
};

export default async function GoalList({ platId }: Props) {
  const goals = await Goal.find({ planId: platId });
  return (
    <>
      <h2>Goal List:</h2>
      <ul className={styles.GoalTree}>
        {goals.map((goal) => (
          <li key={goal.id}>
            <details open>
              <summary>{goal.goal.goal}</summary>
              {goal.goal.subgoals && (
                <ul>
                  {goal.goal.subgoals.map((subgoal) => (
                    <li key={subgoal.objectId}>
                      <details>
                        <summary>{subgoal.goal}</summary>
                        {subgoal.subgoals && (
                          <ul>
                            {subgoal.subgoals.map((subsubgoal) => (
                              <li key={subsubgoal.objectId}>
                                {subsubgoal.goal}
                              </li>
                            ))}
                          </ul>
                        )}
                      </details>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
