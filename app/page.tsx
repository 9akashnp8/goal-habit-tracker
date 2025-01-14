"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { use, useState } from "react";

export default function Home() {
  const [goals, setGoals] = useState<string[]>([]);

  function handleSubmit(e) {
    e.preventDefault();
    const goal = e.target.goal.value;
    setGoals([...goals, goal]);
    e.target.reset();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Add Goal</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="goal">Type your goal</label>
          <input type="text" id="goal" />
          <button>Submit</button>
        </form>
        <div>
          <ul>
            {goals.map((goal) => {
              return (
                <li key={goal}>
                  <div>
                    {goal}
                    <button>Add sub goal</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
