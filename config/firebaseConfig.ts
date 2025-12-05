import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
 
// You'll n eed to replace this with your actual service account file name
import serviceAccount from "../back-end-final-project-firebase-adminsdk-fbsvc-552f6dbc3b.json";
 
// initialize the Firebase app with our service account key
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});
 
// get a reference to firebase authentication
const auth: Auth = getAuth();
 
// get a reference to the firestore database
const db: Firestore = getFirestore();
 
export { auth, db };

