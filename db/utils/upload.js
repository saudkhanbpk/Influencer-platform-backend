const uploadPhoto = require('../utils/UploadImage');
const imageUpload = async (fileToUploads) => {
  try {
    const result = await uploadPhoto.single("image");
    console.log("result", result)
    return result;
  } catch (error) {
    console.log(error)
  }
}
module.exports = imageUpload;

