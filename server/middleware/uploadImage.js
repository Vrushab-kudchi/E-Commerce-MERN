import multer from "multer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const multerStorage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, path.join(__dirname, "../", "/public/images"));
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Format" }, false);
  }
};

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 20000000 },
});

export const productImageResize = async (req, res, next) => {
  if (!req.files) return next();
  let urls = [];
  await Promise.all(
    req.files.map(async (file) => {
      const inputFilePath = file.path;
      const outputFilePath = path.join(
        __dirname,
        "../",
        "/public/images/products/",
        file.filename
      );
      await sharp(inputFilePath)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputFilePath);
      urls.push(outputFilePath);
    })
  );
  req.url = urls;
  next();
};

export const blogImageResize = async (req, res, next) => {
  if (!req.files) return next();
  let urls = [];
  await Promise.all(
    req.files.map(async (file) => {
      const inputFilePath = file.path;
      const outputFilePath = path.join(
        __dirname,
        "../",
        "/public/images/blogs/",
        file.filename
      );
      await sharp(inputFilePath)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputFilePath);
      urls.push(outputFilePath);
    })
  );
  req.url = urls;
  next();
};
