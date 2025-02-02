"use client";

import { createContext, useContext, useReducer } from "react";

type Action = {
  type: string;
  payload: {
    objectId: string;
    goal: string;
    startDate: string;
    endDate: string;
    parentId?: string;
  };
};
type Dispatch = (action: Action) => void;
type State = {
  objectId: string;
  goal: string;
  startDate: string;
  endDate: string;
  level: number;
  subgoals?: State[];
};
type CountProviderProps = { children: React.ReactNode };

const CountContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case "add-main-goal": {
      return {
        ...state,
        level: 1,
        ...action.payload,
      };
    }
    case "add-monthly-goal": {
      return {
        ...state,
        subgoals: [
          ...(state.subgoals || []),
          {
            ...action.payload,
            level: 2,
          },
        ],
      };
    }
    case "add-weekly-goal": {
      let copy = JSON.parse(JSON.stringify(state));
      copy.subgoals?.forEach((subgoal: typeof state) => {
        if (subgoal.objectId === action.payload.parentId) {
          subgoal.subgoals = [
            ...(subgoal.subgoals || []),
            {
              ...action.payload,
              level: 3,
            },
          ];
        }
      });
      return copy;
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function CountProvider({ children }: CountProviderProps) {
  const [state, dispatch] = useReducer(countReducer, {
    objectId: "",
    goal: "",
    startDate: "",
    endDate: "",
    level: 0,
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useCount() {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { CountProvider, useCount };
