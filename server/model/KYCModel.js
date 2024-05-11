import mongoose from "mongoose";

const { Schema } = mongoose;

export const KYCSchema = new Schema(
  {
    user:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    nationality: {
      type: String,
    },
    nationalIdentity: {
      type: String,
    },
    reasonRejection: {
      type: String,
      default: ''
    },
    dateTimeField: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default : "Pending"
    },
  },
  { timestamps: true }
);

export default mongoose.model("KYC", KYCSchema);
