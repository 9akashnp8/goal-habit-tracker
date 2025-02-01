import { Plan, Goal } from "@/lib/model";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const plan = await Plan.findById(id);
  const goals = await Goal.find({ planId: id });
  return (
    <>
      <h1>Goals for {plan?.name}</h1>
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
