import multer from "multer";

const storage = multer.memoryStorage(); //to store file in M/M after uploading removed by self

const singleUpload = multer({ storage }).single("file");

export default singleUpload;
