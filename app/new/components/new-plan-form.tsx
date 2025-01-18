"use client";
import { useActionState } from "react";
import Link from "next/link";

import { createNewPlan } from "../actions";

export default function NewPlanForm() {
  const [state, action, isPending] = useActionState(createNewPlan, {
    status: null,
  });

  return (
    <form action={action}>
      <div>
        <input type="text" name="planName" id="planName" />
        <label htmlFor="planName">Name</label>
      </div>
      <div>
        <input type="date" name="planStartDate" id="planStartDate" />
        <label htmlFor="planStartDate">Plan Start</label>
      </div>
      <div>
        <input type="date" name="planEndDate" id="planEndDate" />
        <label htmlFor="planEndDate">Plan End</label>
      </div>
      <button disabled={isPending}>Submit</button>
      <div>
        {state.status == "success" ? (
          <Link href={`/plan/${state.data.id}/goal/new`}>Add Goal</Link>
        ) : (
          "Something went wrong"
        )}
      </div>
    </form>
  );
}
