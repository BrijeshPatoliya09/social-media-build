import mongoose from "mongoose";
import dbConnect from "../../../helper/connection";
import Story from "../../../model/story";

dbConnect();

export default async (req, res) => {
  const {
    body: { userId, storyId, index },
  } = req;

  try {
    const storyData = await Story.findById(storyId);
    if (
      !(
        storyData.story[index].seen.filter((fil) => fil.userId == userId)
          .length > 0
      )
    ) {
      const otpTimeStamp = Math.floor(new Date().getTime() / 1000.0);
      await Story.findByIdAndUpdate(storyId, {
        $push: { [`story.${index}.seen`]: { userId, timeStamp: otpTimeStamp } },
      });
    }

    const seenData = await Story.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $project: { story: { $arrayElemAt: ["$story", index] } } },
      {
        $lookup: {
          from: "users",
          as: "seenUser",
          localField: "story.seen.userId",
          foreignField: "_id",
        },
      },
    ]);

    res
      .status(200)
      .json({ status: true, message: "user Seen", data: seenData });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something wrong" });
  }
};
