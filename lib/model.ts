import mongoose, { Document, Model } from "mongoose";

export interface IPlan {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface IPlanDocument extends IPlan, Document {
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new mongoose.Schema<IPlanDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Plan: Model<IPlanDocument> =
  mongoose.models.Plan || mongoose.model("Plan", planSchema);

export interface IGoal {
  planId: string;
  goal: {
    objectId: string;
    goal: string;
    level: number;
    subgoals?: IGoal["goal"][];
  };
}

export interface IGoalDocument extends IGoal, Document {
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new mongoose.Schema<IGoalDocument>(
  {
    planId: {
      type: String,
      required: true,
    },
    goal: {
      type: {
        objectId: String,
        goal: String,
        level: Number,
        subgoals: [],
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Goal: Model<IGoalDocument> =
  mongoose.models.Goal || mongoose.model("Goal", goalSchema);
