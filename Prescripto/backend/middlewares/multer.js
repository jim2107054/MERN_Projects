import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use timestamp to avoid conflicts
  },
});

const upload = multer({ storage });
export default upload;
