import nextConnect from "next-connect";
import multer from "multer";
import connection from "../../../helper/connection";
import path from "path"

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const apiRoute = nextConnect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/assets/video"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddleware = upload.single("file");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
  await connection();

  const fileName = req.file.filename;
  console.log("efhiouwbfioulwesgfoewgs",fileName);
  res.status(200).json({ data: "success", imgUrl: fileName });
});

export default apiRoute;
