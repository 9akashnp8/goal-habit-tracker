"use client";

import { useState, useContext, createContext } from "react";

import styles from "./page.module.css";
import NewGoalForm from "./components/new-goal-form";

type Goal = {
  objectId: string;
  goal: string;
  frequency: string;
};

export const NewGoalContext = createContext<{ test: string }>({ test: "" });

export default function AddNewGoals() {
  const [test, setTest] = useState({ test: "hello" });
  const [goals, setGoals] = useState<Goal[]>([]);

  return (
    <main>
      <section>
        <h1>Add New Goal</h1>
      </section>
      <section>
        <NewGoalForm goals={goals} setGoals={setGoals} />
      </section>
      <section className={styles.GoalList}>
        <div>
          {goals
            .filter((goal) => goal.frequency == "daily")
            .map((goal) => (
              <div key={goal.objectId}>
                <p>{goal.goal}</p>
                <p>{goal.frequency}</p>
              </div>
            ))}
        </div>
        <br />
        <div>
          {goals
            .filter((goal) => goal.frequency == "weekly")
            .map((goal) => (
              <div key={goal.objectId}>
                <p>{goal.goal}</p>
                <p>{goal.frequency}</p>
              </div>
            ))}
        </div>
        <br />
        {goals
          .filter((goal) => goal.frequency == "monthly")
          .map((goal) => (
            <div key={goal.objectId}>
              <p>{goal.goal}</p>
              <p>{goal.frequency}</p>
            </div>
          ))}
      </section>
    </main>
  );
}
