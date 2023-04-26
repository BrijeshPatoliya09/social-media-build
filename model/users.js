import mongoose, { model, models, Schema } from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
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
    image: {
      type: String,
      default: "/assets/video/user-logo.png"
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    Save: {
      type: [objectId],
    },
    bio: {
      type: String
    },
    otpTimeStamp: {
      type: Number
    },
    otp: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model("User", usersSchema);
