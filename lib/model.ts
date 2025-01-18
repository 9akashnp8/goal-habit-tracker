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

const Plan: Model<IPlanDocument> =
  mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
