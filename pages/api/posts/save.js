import dbConnect from "../../../helper/connection";
import User from "../../../model/users";
import Post from "../../../model/post";
dbConnect();

export default async (req, res) => {
  const {
    body: { userId, postId },
  } = req;
  try {
    const saveData = await User.findById(userId);
    if (saveData.Save.filter((v) => v == postId).length > 0) {
      await User.findByIdAndUpdate(userId, {
        $pull: { Save: postId },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { Save: postId },
      });
    }
    const postData = await Post.findById(postId);
    if (postData.bookmark.filter((v) => v == userId).length > 0) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { bookmark: userId },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $push: { bookmark: userId },
      });
    }
    res.status(200).json({ status: true, message: "Post Saved" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
};
