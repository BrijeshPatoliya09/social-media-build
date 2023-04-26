import dbConnect from "../../../helper/connection";
import Story from "../../../model/story";

dbConnect();

export default async (req, res) => {
  try {
    const data = await Story.aggregate([
      { $match: { story: { $exists: true, $ne: [] } } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
          pipeline: [{ $project: { _id: 0, Save: 0, role: 0, password: 0 } }],
        },
      },
      {
        $lookup: {
          from: "users",
          as: "seeNUser",
          localField: "story.seen.userId",
          foreignField: "_id",
        },
      },
    ]);

    const filData = data
      .map((v) => {
        const filter = v.story.filter(
          (fil) =>
            fil.timeStamp + 86400 > Math.floor(new Date().getTime() / 1000.0)
        );
        return {
          ...v,
          story: filter,
        };
      })
      .filter((filData) => filData.story.length > 0);

    res.status(200).json({status: true, message: "Got story data successfuly", data: filData});
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something wrong" });
  }
};
