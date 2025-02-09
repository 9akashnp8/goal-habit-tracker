"use client";

import { v4 as uuid } from "uuid";
import { FormEvent, useContext } from "react";

import { useCount } from "../../state";
import { useRouter, useSearchParams } from "next/navigation";
import GoalPreview from "../../components/goal-preview";

export default function NewGoalStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useCount();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal")!.toString();
    const startDate = formData.get("startDate")?.toString()!;
    const endDate = formData.get("endDate")?.toString()!;
    const objectId = uuid();
    dispatch({
      type: "add-monthly-goal",
      payload: { objectId, goal, startDate, endDate },
    });
    router.push(
      `step-3?parentId=${objectId}&min=${
        new Date(startDate).toISOString().split("T")[0]
      }&max=${new Date(endDate).toISOString().split("T")[0]}`
    );
  }
  return (
    <>
      <h1>Step 2: What are your monthly goals</h1>
      <p>
        What are your achievements going to be by the end of each month to
        ensure that you reach your main goal.
      </p>
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
