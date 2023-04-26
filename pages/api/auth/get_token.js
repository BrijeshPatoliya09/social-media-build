import dbConnect from "../../../helper/connection";

dbConnect();

export default async (req, res) => {
  const { body } = res;
  try {
    const tokens = req.cookies.BT_TOKT24;
    return res.status(201).json({status: true, message: "dum success!", data: tokens });
  } catch (err) {
    console.log(err);
    res.status(404).json({status: false, message: "Something went wrong" });
  }
};
