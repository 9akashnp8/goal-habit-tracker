"use client";

import { useRouter } from "next/navigation";

import { useCount } from "../../state";

export default function NewGoalStep1() {
  const router = useRouter();
  const { state, dispatch } = useCount();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goal = formData.get("goal");
    console.log({ goal });
    dispatch({ type: "increment" });
    router.push("step-2");
  }
  return (
    <>
      <h1>Step 1: What is your main goal</h1>
      <p>Example: Get 3 Developer Certifications</p>
      <p>Test: {state.count}</p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="goal">Goal</label>
        <input type="text" name="goal" id="goal" />
        <button type="submit">Next</button>
      </form>
    </>
  );
}
