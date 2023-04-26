import dbConnect from "../../../helper/connection";
import { nameValid } from "../../../helper/common";
import Post from "../../../model/post";

dbConnect();

export default async (req, res) => {
  const { body } = req;
  try {

    if(body.file.length == 0) {
      return res.status(422).json({ status: false, message: "Please upload post video or image" });
    }

    if (!body.location || body.location == "") {
      return res.status(422).json({ status: false, message: "Please enter post location" });
    } else if (!nameValid.test(body.location)) {
      return res.status(422).json({ status: false, message: "Please enter valid location" });
    }


    await Post(body).save();
    res.status(200).json({ status: true, message: "post added successfuly" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
};
