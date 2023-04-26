import mongoose, { model, models, Schema } from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const storySchema = new Schema(
  {
    userId: {
      type: objectId,
      required: true,
    },
    story: {
      type: [
        {
          url: String,
          duration: {
            type: Number,
            default: 3000,
          },
          type: {
            type: String,
            enum: ["image", "video"],
          },
          header: {
            type: [
              {
                heading: String,
                subheading: String,
                profileImage: String,
              },
            ],
          },
          timeStamp: Number,
          seen: [{
            userId: objectId,
            timeStamp: Number
          }],
        },
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Story || model("Story", storySchema);
