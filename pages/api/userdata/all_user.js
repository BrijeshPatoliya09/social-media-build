import dbConnect from "../../../helper/connection";
import User from "../../../model/users";

dbConnect();

export default async (req, res) => {
  const { body } = req;
  try {
    const data = await User.find();
    res.status(200).json({status: true, message: "All user data got successfuly", data});
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
