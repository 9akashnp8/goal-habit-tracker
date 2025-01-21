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

export default async function addNewGoal(
  state: FormState,
  data: FormData
): Promise<FormState> {
  return {
    status: "success",
  };
}
