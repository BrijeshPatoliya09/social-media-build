import dbConnect from "../../../helper/connection";
import User from "../../../model/users";
import { emailValid, nameValid, passwordValid } from "../../../helper/common";
import Follow from "../../../model/follow";
import Story from "../../../model/story";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  const {
    body: { email, password, name, userName },
  } = req;

  try {
    if (!userName) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter username" });
    }

    if (!name) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter name" });
    } else if (!nameValid.test(name)) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter valid name" });
    }

    if (!email) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter email" });
    } else if (!emailValid.test(email)) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter valid email" });
    }

    if (!password) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter password" });
    } else if (!passwordValid.test(password)) {
      return res
        .status(422)
        .json({ status: false, message: "Please enter valid password" });
    }

    const userData = await User.findOne({ email });
    if (userData) {
      return res
        .status(422)
        .json({ status: false, message: "user already exists with that email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User({ email, password: hashedPassword, name, userName }).save();
    const user = await User.findOne({ email });
    await Follow({ userId: user._id }).save();
    await Story({ userId: user._id }).save();

    return res.status(200).json({ status: true, message: "User registered successfuly, Go back to login" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something wrong" });
  }
};
