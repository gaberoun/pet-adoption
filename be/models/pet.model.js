import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    name: {
      type: String,
      required: [true, "Name field is required."],
    },
    species: {
      type: String,
      enum: ["Dog", "Cat"],
      required: [true, "Species field is required."],
    },
    breed: String,
    age: {
      type: Number,
      required: [true, "Age field is required."],
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Sex field is required."],
    },
    description: {
      type: String,
      required: [true, "Description field is required"],
    },
    location: {
      type: String,
      required: [true, "Location field is required"],
    },
    image: {
      path: {
        type: String,
        required: [true, "Image path is required."],
      },
      filename: {
        type: String,
        required: [true, "Image filename is required."],
      },
    },
    // For soft deletion
    availability: {
      type: String,
      enum: ["Available", "Adopted", "Cancelled"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Pet = model("Pet", petSchema);
export default Pet;