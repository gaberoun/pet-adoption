import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name field is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name field is required."],
    },
    email: {
      type: String,
      required: [true, "Email field is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password field is required."],
    },
    phone: {
      type: String,
      default: "",
    },
    link: {
      site: { type: String, enum: ["Facebook", "X", "Instagram", "Other", ""] },
      url: String
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
