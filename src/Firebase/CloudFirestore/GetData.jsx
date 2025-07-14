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

// Get all the data from a collection
export const getCollectionData = async (collectionName) => {
  const arr = [];
  let querySnapshot;

  if (collectionName === "jobs") {
    const dataQuery = query(collection(db, collectionName), orderBy("submitDate", "desc"));
    querySnapshot = await getDocs(dataQuery);
  } else {
    querySnapshot = await getDocs(collection(db, collectionName));
  }

  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });

  return arr;
};

// Get all the data from a document
export const getDocumentData = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docId };
  } else {
    console.log("No such document!");
  }
};

// Get Number of Documents in Collection
export const numOfDocuments = async (collectionName) => {
  const data = await getCollectionData(collectionName);
  return data.length;
};

// Get Data using a Query
export const getMatchingData = async (collectionName, key, operator, value) => {
  const arr = [];

  const dataQuery = query(collection(db, collectionName), where(key, operator, value));

  const querySnapshot = await getDocs(dataQuery);

  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });

  return arr;
};

export const getSnapShotData = async (collectionName, key, operator, value) => {
  const dataQuery = query(collection(db, collectionName), where(key, operator, value));

  onSnapshot(dataQuery, (snapShot) => {
    let data = snapShot.docs.map((doc) => doc.data());
    return data;
  });
};

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

export const compoundQuery = async (collectionName, QueryArr) => {
  const arr = [];
  const queryParams = [];

  QueryArr.forEach((e) => {
    queryParams.push(where(e.key, e.operator, e.value));
  });

  const dataQuery = query(collection(db, collectionName), ...queryParams);

  const querySnapshot = await getDocs(dataQuery);

  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });

  return arr;
};

export const getLatestData = async (collectionName, QueryArr, orderByKey) => {
  const arr = [];
  const queryParams = [];

  QueryArr.forEach((e) => {
    queryParams.push(where(e.key, e.operator, e.value));
  });

  const dataQuery = query(collection(db, collectionName), ...queryParams, orderBy("created_at", "desc"), limit(1));

  // const querySnapshot = await getDocs(dataQuery).orderByChild(orderByKey).limitToLast(1)
  const querySnapshot = await getDocs(dataQuery);

  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });

  return arr;
};

export const getOrderByCollectionData = async (collectionName, orderByField, order) => {
  const q = query(collection(db, collectionName), orderBy(orderByField, order));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getCoumpoundQueryLength = async (collectionName, QueryArr) => {
  try {
    const arr = [];
    const queryParams = [];

    QueryArr.forEach((e) => {
      queryParams.push(where(e.key, e.operator, e.value));
    });

    const dataQuery = query(collection(db, collectionName), ...queryParams);

    let dd = await getCountFromServer(dataQuery);

    return dd.data().count;
  } catch (err) {
    console.log(err);
  }
};

export const getDocumentDataArr = async (collectionName, docIds) => {
  const dataArray = [];

  for (const docId of docIds) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dataArray.push({ ...docSnap.data(), id: docId });
    } else {
      console.log("Document with ID", docId, "does not exist!");
    }
  }

  return dataArray;
};

// export const fetchSnapShotData = async (collectionName) => {
//   const colRef = collection(db, collectionName);
//   let data = await onSnapshot(colRef);
//   return data;
// };
export const fetchSnapShotData = async (collectionName) => {
  try {
    // Get a reference to the collection
    const colRef = collection(db, collectionName);

    // Fetch the initial snapshot of documents
    const querySnapshot = await getDocs(colRef);

    // Extract and process document data
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data() // Spread operator for other fields
    }));

    // Return the processed snapshot data
    return documents;
  } catch (error) {
    console.error("Error fetching snapshot data:", error);
    // Handle errors appropriately (e.g., throw an error, display a message)
  }
};
