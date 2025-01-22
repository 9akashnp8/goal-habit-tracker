"use client";

import { SetStateAction, useActionState, useState } from "react";

import { v4 as uuid } from "uuid";

import addNewGoal from "../action";
import { set } from "mongoose";

type Goal = {
  objectId: string;
  goal: string;
  frequency: string;
};

type Props = {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
};

export default function NewGoalForm({ goals, setGoals }: Props) {
  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const goalName = form.goal.value;
    const frequency = form.frequency.value;
    console.log(goalName, frequency);
    setGoals([...goals, { objectId: uuid(), goal: goalName, frequency }]);
    form.reset();
  }

  return (
    <form onSubmit={handleAdd}>
      <div>
        <input type="text" name="goal" id="goal" placeholder="Main Goal" />
      </div>
      <br />
      <div>
        <input type="radio" name="frequency" id="daily" value="daily" />
        <label htmlFor="daily">Daily</label>
        <input type="radio" name="frequency" id="weekly" value="weekly" />
        <label htmlFor="weekly">Weekly</label>
        <input type="radio" name="frequency" id="monthly" value="monthly" />
        <label htmlFor="monthly">Monthly</label>
      </div>
      <button>Add</button>
    </form>
  );
}
