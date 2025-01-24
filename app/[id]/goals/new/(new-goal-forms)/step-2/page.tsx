"use client";

import { FormEvent, useContext } from "react";

import { useCount } from "../../state";
import { useRouter } from "next/navigation";

export default function NewGoalStep2() {
  const router = useRouter();
  const { state, dispatch } = useCount();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal");
    console.log({ goal });
    dispatch({ type: "increment" });
    router.push("step-3");
  }
  return (
    <>
      <h1>Step 2: What are your monthly goals</h1>
      <p>
        What are your achievements going to be by the end of each month to
        ensure that you reach your main goal.
      </p>
      <p>Test: {state.count}</p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="goal">Goal</label>
        <input type="text" name="goal" id="goal" />
        <button type="submit">Next</button>
      </form>
    </>
  );
}
