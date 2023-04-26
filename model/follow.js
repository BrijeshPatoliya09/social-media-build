import mongoose, { model, models, Schema } from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const followSchema = new Schema(
  {
    userId: {
      type: objectId,
    },
    following: {
      type: [
        {
          followingId: objectId,
          followingName: String,
          followingimg: String,
        },
      ],
    },
    follower: {
      type: [
        {
          followerId: objectId,
          followerName: String,
          followerimg: String,
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Follow || model("Follow", followSchema);
