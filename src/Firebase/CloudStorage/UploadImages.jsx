import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

// Upload Image to Firebase Cloud Storage
export const UploadImage = async (imageFile) => {
  // const imgName = crypto.randomUUID();

  const storageRef = ref(storage, `images/${imageFile.name}`);

  const upload = await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(upload.ref);
  return downloadURL;
};

export const deleteImage = async (imageUrl) => {
  try {
    const storageRef = ref(storage, imageUrl);

    const deletes = await deleteObject(storageRef);
    return true;
  } catch (err) {
    return true;
  }
};
