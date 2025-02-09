"use client";

import { v4 as uuid } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";

import { useCount } from "../../state";
import GoalPreview from "../../components/goal-preview";

export default function NewGoalStep1() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useCount();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal")?.toString()!;
    const startDate = formData.get("startDate")?.toString()!;
    console.log(startDate);
    const endDate = formData.get("endDate")?.toString()!;
    console.log(endDate);
    dispatch({
      type: "add-main-goal",
      payload: {
        objectId: uuid(),
        goal: goal,
        startDate: startDate,
        endDate: endDate,
      },
    });
    router.push(
      `step-2?min=${new Date(startDate).toISOString().split("T")[0]}&max=${
        new Date(endDate).toISOString().split("T")[0]
      }`
    );
  }
  return (
    <>
      <h1>Step 1: What is your main goal</h1>
      <p>Example: Get 3 Developer Certifications</p>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="goal">Goal</label>
          <input type="text" name="goal" id="goal" />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            max={searchParams.get("max")!}
            min={searchParams.get("min")!}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            max={searchParams.get("max")!}
            min={searchParams.get("min")!}
          />
        </div>
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
