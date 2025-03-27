import axios from "axios";

export const uploadImage = async (img) => {
  try {
    // Convert File to base64
    const base64Image = await toBase64(img);

    const { data } = await axios.post(
      import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url",
      { image: base64Image }
    );

    return data.uploadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Helper function to convert File to base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};