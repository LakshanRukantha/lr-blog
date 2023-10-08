import mongoose, { Schema } from "mongoose";

type UserSchema = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const UserSchema = new Schema<UserSchema>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
