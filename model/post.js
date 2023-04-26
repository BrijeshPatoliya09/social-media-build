import mongoose, { model, models, Schema } from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const postSchema = new Schema({
  like: {
    type: [
      {
        likeId: objectId,
        likeName: String,
        likeImg: String,
      },
    ],
  },
  file: {
    type: [String],
  },
  location: {
    type: String,
  },
  comments: {
    type: [
      {
        commentId: objectId,
        comments: String,
        commentName: String
      },
    ],
  },
  userName: {
    type: String,
  },
  userImg: {
    type: String,
  },
  userId: {
    type: objectId,
  },
  bookmark: {
    type: [objectId]
  }
});

export default models.Post || model("Post", postSchema);
