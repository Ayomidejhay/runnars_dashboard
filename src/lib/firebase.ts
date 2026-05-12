


// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { initializeFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';


//  const firebaseConfig = {
//   apiKey: "AIzaSyB7drA_TFIkhswLmmzjzrIn75OtLo0ZCt4",
//   authDomain: "runnars-e518a.firebaseapp.com",
//   projectId: "runnars-e518a",
//   storageBucket: "runnars-e518a.firebasestorage.app",
//   messagingSenderId: "901939206181",
//   appId: "1:901939206181:web:d3734d8f7fbd8b0cde07cc",
//   measurementId: "G-W2TBQK2KL3"
// };

// // Initialize Firebase App (preventing duplicate initializations in Next.js)
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Initialize Firestore pointing specifically to the "advert" database
// const db = initializeFirestore(app, "advert");

// const auth = getAuth(app);
// const storage = getStorage(app);

// export { app, db, auth, storage };



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

 const firebaseConfig = {
  apiKey: "AIzaSyB7drA_TFIkhswLmmzjzrIn75OtLo0ZCt4",
  authDomain: "runnars-e518a.firebaseapp.com",
  projectId: "runnars-e518a",
  storageBucket: "runnars-e518a.firebasestorage.app",
  messagingSenderId: "901939206181",
  appId: "1:901939206181:web:d3734d8f7fbd8b0cde07cc",
  measurementId: "G-W2TBQK2KL3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const db = getFirestore(app, "advert");
export { storage };

