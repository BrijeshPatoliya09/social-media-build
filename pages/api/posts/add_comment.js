import dbConnect from "../../../helper/connection";
import Post from "../../../model/post";

dbConnect();

export default async (req, res) => {
  const {
    body: { commentData, postId },
  } = req;
  try {
    if (!commentData.comments || commentData.comments.trim == "") {
      return res
        .status(422)
        .json({ status: false, message: "Please enter comment" });
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: commentData },
      }
    );
    res.status(200).json({ status: true, message: "Comment added" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
};
