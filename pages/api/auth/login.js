import dbConnect from "../../../helper/connection";
import User from "../../../model/users";
import bcrypt from "bcrypt";
import { withSessionApi } from "../../../helper/ironSession";

dbConnect();

export default withSessionApi(async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    if (!email) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter email" });
    }

    if (!password) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter password" });
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      return res
        .status(422)
        .json({ status: false, message: "email or password doesn't match" });
    }

    await User.findByIdAndUpdate(
      userData._id,
      {
        $unset: { otpTimeStamp: 1, otp: 1 },
      },
      {
        multi: true,
      }
    );

    const pswMatch = await bcrypt.compare(password, userData.password);

    if (pswMatch) {
      req.session.user = { userId: userData._id };
      await req.session.save();

      return res.status(201).json({
        status: true,
        message: "login success!",
        data: {
          userId: userData._id,
          userName: userData.userName,
          userImg: userData.image,
        },
      });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "email or password doesn't match" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something went wrong" });
  }
});
