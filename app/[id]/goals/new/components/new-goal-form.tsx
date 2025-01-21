"use client";

import { useActionState, useState } from "react";

import { v4 as uuid } from "uuid";

import addNewGoal from "../action";
import { set } from "mongoose";

type Goal = {
  objectId: string;
  goal: string;
  level: number;
  subgoals?: Goal[];
};

export default function NewGoalForm() {
  const [goal, setGoal] = useState<Goal>();

  function handleL1Goal(goalName: string, level: number) {
    const objectId = uuid();
    setGoal({ objectId, goal: goalName, level });
    console.log({ objectId, goal: goalName, level });
  }

  function handleL2Goal(parentGoalId: string, goalName: string, level: number) {
    const objectId = uuid();
    if (parentGoalId !== goal?.objectId) {
      console.error("Parent goal not found");
    }
    if (goal) {
      setGoal({
        ...goal,
        subgoals: [
          ...(goal.subgoals || []),
          { objectId, goal: goalName, level },
        ],
      });
    }
    console.log(goal);
  }

  function handleL3Goal(
    parentGoalObjectId: string,
    goalName: string,
    level: number
  ) {
    const objectId = uuid();
    let parentGoal = goal?.subgoals?.find(
      (sg) => sg.objectId === parentGoalObjectId
    )!;
    const goalCopy = JSON.parse(JSON.stringify(goal));
    goalCopy.subgoals.forEach((sg: Goal) => {
      if (sg.objectId === parentGoalObjectId) {
        sg.subgoals = [
          ...(sg.subgoals || []),
          { objectId, goal: goalName, level },
        ];
      }
    });
    setGoal(goalCopy);
  }

  function handleL4Goal(
    parentGoalObjectId: string,
    goalName: string,
    level: number
  ) {
    const objectId = uuid();
    let parentGoal = goal?.subgoals?.find(
      (sg) => sg.objectId === parentGoalObjectId
    )!;
    const goalCopy = JSON.parse(JSON.stringify(goal));
    goalCopy.subgoals.forEach((sg: Goal) => {
      if (sg.objectId === parentGoalObjectId) {
        sg.subgoals?.forEach((ssg: Goal) => {
          if (ssg.objectId === parentGoalObjectId) {
            ssg.subgoals = [
              ...(ssg.subgoals || []),
              { objectId, goal: goalName, level },
            ];
          }
        });
      }
    });
    setGoal(goalCopy);
  }

  return (
    <form action="">
      <div>
        <input type="text" name="l1Goal" id="l1Goal" placeholder="Main Goal" />
        <button
          type="button"
          onClick={() => handleL1Goal("Get 3 Developer Certifications", 1)}
        >
          Add
        </button>
      </div>
      <br />
      <div>
        {goal && (
          <>
            <h2>{goal.goal}</h2>
            <ul>
              {goal.subgoals?.map((sg) => (
                <>
                  <li key={sg.objectId}>{sg.goal}</li>
                  <ul>
                    {sg.subgoals?.map((ssg) => (
                      <>
                        <li key={ssg.objectId}>{ssg.goal}</li>
                        <ul>
                          {ssg.subgoals?.map((sssg) => (
                            <>
                              <li key={sssg.objectId}>{sssg.goal}</li>
                              <ul>
                                {sssg.subgoals?.map((ssssg) => (
                                  <li key={ssssg.objectId}>{ssssg.goal}</li>
                                ))}
                              </ul>
                            </>
                          ))}
                        </ul>
                        <div>
                          <input
                            type="text"
                            name="l3Goal"
                            id="l3Goal"
                            placeholder="Daily Goal"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleL3Goal(
                                sg.objectId,
                                "Get Redis Certification",
                                3
                              )
                            }
                          >
                            Add
                          </button>
                        </div>
                      </>
                    ))}
                  </ul>
                  <div>
                    <input
                      type="text"
                      name="l3Goal"
                      id="l3Goal"
                      placeholder="Weekly Goal"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleL3Goal(sg.objectId, "Get Redis Certification", 3)
                      }
                    >
                      Add
                    </button>
                  </div>
                </>
              ))}
              <div>
                <input
                  type="text"
                  name="l2Goal"
                  id="l2Goal"
                  placeholder="Monthly Goal"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleL2Goal(goal.objectId, "Get Redis Certification", 2)
                  }
                >
                  Add
                </button>
              </div>
            </ul>
          </>
        )}
      </div>
    </form>
  );
}
