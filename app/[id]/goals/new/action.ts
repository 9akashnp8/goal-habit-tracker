"use server";

import { Goal } from "@/lib/model";

type FormState =
  | {
      status: null;
    }
  | {
      status: "success";
    }
  | {
      status: "fail";
    };

export default async function addNewGoal(data: FormData): Promise<FormState> {
  const taskId = data.get("taskId") as string;
  const goal = JSON.parse(data.get("goal") as string);
  console.log(taskId, goal);
  await Goal.create({
    planId: taskId,
    goal,
  });
  return {
    status: "success",
  };
}
