import dbConnect from "../../../helper/connection";
import Post from "../../../model/post";

dbConnect();

export default async (req, res) => {
  const { body } = req;
  try {
    const postData = await await Post.find().sort({$natural: -1})
    res.status(200).json({status: true, message: "Get post successfuly", data: postData});
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
