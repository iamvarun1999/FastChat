import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  orderBy,
  onSnapshot,
  getCountFromServer,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";




export const listenToFirestore = (collectionName, docId, callback) => {
  try {
    let unsubscribe;
    
    if (docId) {
      // 🔹 Listen to a specific document
      const docRef = doc(db, collectionName, docId);
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          callback({
            id: docSnap.id,
            ...docSnap.data()
          });
        } else {
          console.warn("No such document!");
          callback(null);
        }
      });
    } else {
      // 🔹 Listen to the entire collection
      const colRef = collection(db, collectionName);
      unsubscribe = onSnapshot(colRef, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data()
          });
        });
        callback(docs);
      });
    }

    return unsubscribe; // allow unsubscribe
  } catch (error) {
    console.error("Error listening to Firestore:", error);
    return () => {}; // no-op fallback unsubscribe
  }
};

const listenToQuery = (collectionName, constraints, callback) => {
  try {
    // Allow either a single constraint or array of constraints
    const constraintArray = Array.isArray(constraints)
      ? constraints
      : [constraints];

    const dataQuery = query(collection(db, collectionName), ...constraintArray);

    const unsubscribe = onSnapshot(dataQuery, (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(docs);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error listening to Firestore query:", error);
    return () => {}; // fallback no-op unsubscribe
  }
};

export const listenToWhere = (collectionName, key, operator, value, callback) => {
  return listenToQuery(
    collectionName,
    where(key, operator, value),
    callback
  );
};