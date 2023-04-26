import dbConnect from "../../../helper/connection";
import User from "../../../model/users";

dbConnect();

export default async (req, res) => {
  const { body } = req;

  try {
    const userData = await User.findOne({ email: body });
    if (!userData) {
      return res
        .status(404)
        .json({ status: false, message: "This User does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpTimeStamp = Math.floor(new Date().getTime() / 1000.0);

    await await User.findOneAndUpdate({ email: body }, { otp, otpTimeStamp });

    res.status(200).json({status: true, message: "otp generated", data: userData._id });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something wrong" });
  }
};
