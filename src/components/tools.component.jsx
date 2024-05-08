import Embed from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

import { uploadImage } from "../common/aws";

const uploadImageByFile = (e) => {
  return uploadImage(e).then((url) => {
    if (url) {
      return {
        success: 1,
        file: { url },
      };
    }
  });
};

// const uploadImageByURL = () => {
//   let link = new Promise((resolve, reject) => {
//     try {
//       resolve(e);
//     } catch (err) {
//       reject(e);
//     }
//   });

//   return link.then((url) => {
//     return {
//       success: 1,
//       file: { url },
//     };
//   });
// };

const uploadImageByURL = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      // Return the uploaded image data
      return {
        success: 1,
        file: { url: imageUrl },
      };
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      return {
        success: 0,
        file: { url: "" }, // Return empty URL or handle error as needed
      };
    });
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Try Heading...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
