import dbConnect from "../../../helper/connection";
import Follow from "../../../model/follow";

dbConnect();

export default async (req, res) => {
  const {
    body: { followingData, followerData },
  } = req;
  try {
    const userId = followerData.followerId;
    const folUserId = followingData.followingId;
    const data = await Follow.findOne({ userId });

    if (data.following.filter((v) => v.followingId == folUserId).length > 0) {
      await Follow.findOneAndUpdate(
        { userId },
        {
          $pull: { following: followingData },
        }
      );
      await Follow.findOneAndUpdate(
        { userId: folUserId },
        {
          $pull: { follower: followerData },
        }
      );
    } else {
      await Follow.findOneAndUpdate(
        { userId },
        {
          $push: { following: followingData },
        }
      );

      await Follow.findOneAndUpdate(
        { userId: folUserId },
        {
          $push: { follower: followerData },
        }
      );
    }
    res.status(200).json({status: true, message: "User Followed" });
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
