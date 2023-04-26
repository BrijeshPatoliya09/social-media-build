import dbConnect from "../../../helper/connection";
import Follow from "../../../model/follow";

dbConnect();

export default async (req, res) => {
  const {
    body,
    query: {followId}
  } = req;
  try {
    const data = await Follow.findOne({userId: followId});
    res.status(200).json({status: true, message: "Got follow data successfuly", data})
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
