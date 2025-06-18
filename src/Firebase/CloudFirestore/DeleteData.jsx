import { db } from "../firebase";

import { doc, deleteDoc, getDocs, query, where, collection } from "firebase/firestore";
import { getMatchingData } from "./GetData";
import { deleteImage } from "../CloudStorage/UploadImages";
import { updateDocument } from "./UpdateData";
// Delete a Document from a Collection
export const deleteDocument = async (collectionName, id) => {
  const res = deleteDoc(doc(db, collectionName, id)).catch((err) => console.log(err));
  return res;
};

export const deleteDocumetWithChild = async (parentCollection, parentId, childCollection, childKey, childOperator) => {
  try {
    
    const q = query(collection(db, childCollection), where(childKey,childOperator, parentId)); 
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    
    deleteDocument(parentCollection, parentId);
   


  } catch (err) {
    console.log(err);
  }
};

export const deleteDocumetWithChildKey = async (collection, parentId, childCollection, childKey, operator) => {
  try {
    let res = await getMatchingData(childCollection, childKey, operator, parentId);
    deleteDocument(collection, parentId);
    res.forEach((docData) => {
      deleteDocument(childCollection, docData.id);
      deleteImage(docData.imgUrl);
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const updateAll = async () => {
  return;
  try {
    let res = await getMatchingData("users", "role", "==", "children");
    console.log(res);
    res.forEach((res) => {
      updateDocument("users", res.id, {
        tenant_id: "436563553377628200000",
        center_name: "Global Education Development",
      });
    });
  } catch (err) {}
};
