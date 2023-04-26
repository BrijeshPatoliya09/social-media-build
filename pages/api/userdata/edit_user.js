import dbConnect from "../../../helper/connection";
import User from "../../../model/users";
import Follow from "../../../model/follow";
import Post from "../../../model/post";
import { nameValid } from "../../../helper/common";

export default async (req, res) => {
  const {
    body: { userId, editData },
  } = req;
  try {
    if (!editData.image) {
      return res
        .status(422)
        .json({ status: false, message: "Please add a profile image" });
    }

    if (!editData.userName) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter username" });
    }

    if (!editData.name) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter name" });
    } else if (!nameValid.test(editData.name)) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter valid name" });
    }

    dbConnect();

    await User.findByIdAndUpdate(userId, editData);
    await Follow.updateMany(
      { "following.followingId": userId },
      {
        "following.$.followingName": editData.userName,
        "following.$.followingimg": editData.image,
      }
    );
    await Follow.updateMany(
      { "follower.followerId": userId },
      {
        "follower.$.followerName": editData.userName,
        "follower.$.followerimg": editData.image,
      }
    );
    await Post.updateMany(
      { userId },
      { userName: editData.userName, userImg: editData.image }
    );
    await Post.updateMany(
      { "like.likeId": userId },
      { "like.$.likeName": editData.userName, "like.$.likeImg": editData.image }
    );

    await Post.updateMany(
      { "comments.commentId": userId },
      { "comments.$.commentName": editData.userName }
    );

    const upData = await User.findById(userId);
    res.status(200).json({
      status: true,
      message: "Profile edited successfuly",
      data: upData,
    });
  } catch (err) {
    console.log("errrrrrrrr", err);
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
};
