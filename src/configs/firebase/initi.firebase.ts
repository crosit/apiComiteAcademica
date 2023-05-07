import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.join(
  __dirname,
  // "../../../sabeeo-firebase-adminsdk-az0yy-cc97ff94cb.json"
  "./sabeeo-firebase-adminsdk-az0yy-cc97ff94cb.json"
);

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert(serviceAccount),
};

// Initialize Firebase
export default admin.initializeApp(firebaseConfig);