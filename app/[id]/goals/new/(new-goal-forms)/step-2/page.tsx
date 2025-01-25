"use client";

import { v4 as uuid } from "uuid";
import { FormEvent, useContext } from "react";

import { useCount } from "../../state";
import { useRouter } from "next/navigation";
import GoalPreview from "../../components/goal-preview";

export default function NewGoalStep2() {
  const router = useRouter();
  const { state, dispatch } = useCount();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal")!.toString();
    const objectId = uuid();
    dispatch({
      type: "add-monthly-goal",
      payload: { objectId, goal },
    });
    router.push(`step-3?parentId=${objectId}`);
  }
  return (
    <>
      <h1>Step 2: What are your monthly goals</h1>
      <p>
        What are your achievements going to be by the end of each month to
        ensure that you reach your main goal.
      </p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="goal">Goal</label>
        <input type="text" name="goal" id="goal" />
        <button type="submit">Next</button>
      </form>
      <br />
      <GoalPreview
        objectId={state.objectId}
        goal={state.goal}
        level={state.level}
        subgoals={state.subgoals}
      />
    </>
  );
}
