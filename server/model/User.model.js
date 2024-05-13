import mongoose, { Schema } from "mongoose";
export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide unique Username"],
      unique: [true, "Username Exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
    },
    fullName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    kycStatus: {
      type: Boolean,
      default: false,
    },
    region: {
      type: String,
      required: [true, "Please provide a region"],
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "pic",
    },
    isMerchant: {
      type: Boolean,
      default: false,
    },
    isRepresentative: {
      type: Boolean,
      default: false,
    },
    merchantFee: {
      type: Number,
      default: 0,
    },
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    allowServices: {
      type: Boolean,
      default: false,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      default: null,
    },
  },
  { timestamps: true }
);

//if already have user model in mongodb database then use exisiting model otherwise return new one
export default mongoose.models.Users || mongoose.model("User", UserSchema);
