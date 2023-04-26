import mongoose from "mongoose";
import dbConnect from "../../../helper/connection";
import Post from "../../../model/post";

dbConnect();

export default async (req, res) => {
  const {
    body,
    query: { savePostId },
  } = req;
  try {
    const data = await Post.aggregate([
      {
        $match: {
          bookmark: { $in: [new mongoose.Types.ObjectId(savePostId)] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "bookmark",
          foreignField: "_id",
          as: "userInfo",
          pipeline: [
            { $match: { _id: new mongoose.Types.ObjectId(savePostId) } },
          ],
        },
      },
    ]);
    res.status(200).json({ status: true, message: "Get post data", data });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
};
