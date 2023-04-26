import dbConnect from "../../../helper/connection";
import Post from "../../../model/post";

dbConnect();

export default async (req, res) => {
  const {
    body: { likeData, postId },
  } = req;
  try {
    const postData = await Post.findById(postId);
    if (postData.like.filter((v) => v.likeId == likeData.likeId).length > 0) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { like: likeData },
      });
    } else {
    await Post.findOneAndUpdate({_id: postId}, {
      $push: { like: likeData },  
    });
    }
    res.status(200).json({status: true, message: "Post Liked" });
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
