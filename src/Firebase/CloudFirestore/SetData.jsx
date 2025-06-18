// import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Add Document to a Collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), { ...data });
    const docSnapshot = await getDoc(docRef);
    const documentData = docSnapshot.data(); 
    return { id: docRef.id, ...documentData };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Re-throw the error for handling it in the calling code
  }
};

// Create a Document with DocId
export const createDocument = async (collectionName, docId, data) => {
  const result = await setDoc(doc(db, collectionName, docId), {
    ...data,
  });
  return result;
};
