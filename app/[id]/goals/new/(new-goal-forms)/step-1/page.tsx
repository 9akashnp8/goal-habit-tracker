"use client";

import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

import { useCount } from "../../state";
import GoalPreview from "../../components/goal-preview";

export default function NewGoalStep1() {
  const router = useRouter();
  const { state, dispatch } = useCount();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal")?.toString()!;
    dispatch({
      type: "add-main-goal",
      payload: { objectId: uuid(), goal: goal },
    });
    router.push("step-2");
  }
  return (
    <>
      <h1>Step 1: What is your main goal</h1>
      <p>Example: Get 3 Developer Certifications</p>
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
