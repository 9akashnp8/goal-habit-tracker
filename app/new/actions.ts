"use server";

import { Plan } from "@/lib/model";

export type FormState =
  | {
      status: null;
    }
  | {
      status: "success";
      data: {
        id: string;
      };
    }
  | {
      status: "fail";
      data?: undefined;
    };

export async function createNewPlan(
  state: FormState,
  data: FormData
): Promise<FormState> {
  const name = data.get("planName");
  const startDate = data.get("planStartDate");
  const endDate = data.get("planEndDate");
  try {
    const plan = new Plan({
      name,
      startDate,
      endDate,
    });
    const createdPlan = await plan.save();
    return {
      status: "success",
      data: {
        id: createdPlan.id,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
    };
  }
}
