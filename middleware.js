const cloudinary = require('./cloudinary');

// Functions that deal with deleting images from cloudinary on Item delete
// Extract the ID from URL
function urlToPublicId(url) {
  // Split URL at '/upload/' — the public_id and version follow this
  const parts = url.split('/upload/');
  if (parts.length < 2) return null; // invalid URL format

  // Remove version folder, e.g. 'v1234567890/'
  let publicIdWithExt = parts[1].replace(/^v\d+\//, '');

  // Remove file extension (jpg, png, etc.)
  const lastDot = publicIdWithExt.lastIndexOf('.');
  if (lastDot === -1) return publicIdWithExt; // no extension found

  return publicIdWithExt.substring(0, lastDot);
}
// Function to delete images from Cloudinary along with deleting the Item from the DB.
module.exports.deleteImagesByUrl = async (imageUrls) => {
  try {
    const deletePromises = imageUrls.map((url) => {
      const publicId = urlToPublicId(url);
      if (!publicId) {
        console.warn(`Skipping invalid URL: ${url}`);
        return Promise.resolve(null);
      }
      return cloudinary.uploader.destroy(publicId);
    });

    const results = await Promise.all(deletePromises);
    console.log('Delete results:', results);
  } catch (error) {
    console.error('Error deleting images:', error);
  }
};
