import multer from "multer";
import sharp from "sharp";
import path from "path";

multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "/public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now + ".jpeg");
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
  limits: { fileSize: 2000000 },
});

export const productImageResize = async (req, res, next) => {};
