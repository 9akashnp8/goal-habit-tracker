"use client";

import { useState, FormEvent } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { v4 as uuid } from "uuid";

import addNewGoal from "../../action";
import { useCount } from "../../state";
import GoalPreview from "../../components/goal-preview";

export default function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { state: goal, dispatch } = useCount();
  const [weeklyGoal, setWeeklyGoal] = useState<string>("");

  async function saveGoal() {
    if (!id) {
      throw new Error("No task found");
    }
    const formData = new FormData();
    formData.append("taskId", id);
    formData.append("goal", JSON.stringify(goal));
    const result = await addNewGoal(formData);
    console.log(result);
  }

  return (
    <>
      <h1>Step 3: What are your weekly goals</h1>
      <p>
        What are your achievements going to be by the end of each week to ensure
        that you reach your main goal.
      </p>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "add-weekly-goal",
            payload: {
              parentId: searchParams.get("parentId") || undefined,
              objectId: uuid(),
              goal: weeklyGoal,
            },
          });
        }}
      >
        <label htmlFor="goal">Goal</label>
        <input
          type="text"
          name="goal"
          id="goal"
          value={weeklyGoal}
          onChange={(e) => setWeeklyGoal(e.target.value)}
        />
        <button type="submit">Add Another</button>
        <button type="button" onClick={() => router.back()}>
          Add Another Monthly Goal?
        </button>
        <button type="button" onClick={async () => await saveGoal()}>
          Save
        </button>
      </form>
      <br />
      <GoalPreview
        objectId={goal.objectId}
        goal={goal.goal}
        level={goal.level}
        subgoals={goal.subgoals}
      />
    </>
  );
}
