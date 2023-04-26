import dbConnect from "../../../helper/connection";
import User from "../../../model/users";

dbConnect();

export default async (req, res) => {
  const {
    body,
    query: {singleId}
  } = req;
  try {
    const data = await User.findById(singleId, {password: 0, role: 0});
    res.status(200).json({status: true ,message: "Got user data successfuly", data})
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
