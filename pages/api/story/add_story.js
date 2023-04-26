import dbConnect from "../../../helper/connection";
import Story from "../../../model/story";

dbConnect();

export default async (req, res) => {
  const {
    body: { userId, storyData },
  } = req;

  try {
    if(storyData.length == 0) {
    res.status(422).json({ status: false, message: "Please add an image or video" });
    }
    storyData.map(async (v) => {
      const otpTimeStamp = Math.floor(new Date().getTime() / 1000.0);
      await Story.findOneAndUpdate(
        { userId },
        { $push: { story: { ...v, timeStamp: otpTimeStamp } } }
      );
    });

    res.status(200).json({ status: true, message: "Story added successfuly" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: false, message: "Something wrong" });
  }
};
