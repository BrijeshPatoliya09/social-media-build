import dbConnect from "../../../helper/connection";
import { passwordValid } from "../../../helper/common";
import User from "../../../model/users";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  const {
    body: {
      newPsw: { otp, newPassword, confirmPassword },
      userId,
    },
  } = req;

  try {
    const userData = await User.findById(userId);
    const time = Math.floor(new Date().getTime() / 1000.0);
    const timeLimite = userData.otpTimeStamp + 3000;
    if (time >= timeLimite) {
      await User.findByIdAndUpdate(
        userId,
        {
          $unset: { otpTimeStamp: 1, otp: 1 },
        },
        {
          multi: true,
        }
      );
      return res
        .status(404)
        .json({ status: false, message: "Otp has been expired" });
    }

    if (otp == userData.otp) {
      if (passwordValid.test(newPassword)) {
        if (newPassword === confirmPassword) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword, $unset: { otpTimeStamp: 1, otp: 1 } },
            { multi: true }
          );
          return res
            .status(200)
            .json({ status: true, message: "New Password Added successfuly go to login page" });
        } else {
          res
            .status(422)
            .json({
              status: false,
              message: "New and Confirmed password doesn't match",
            });
        }
      } else {
        return res
          .status(404)
          .json({ status: false, message: "Invalid Password" });
      }
    } else {
      return res.status(404).json({ status: false, message: "Invalid Otp" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something wrong" });
  }
};
