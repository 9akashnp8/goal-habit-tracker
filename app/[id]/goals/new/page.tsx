"use client";

import NewGoalForm from "./components/new-goal-form";

export default function AddNewGoals() {
  return (
    <main>
      <section>
        <h1>Add New Goal</h1>
      </section>
      <section>
        <NewGoalForm />
      </section>
    </main>
  );
}
