import firebase from "firebase/compat/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import "firebase/compat/firestore"
// import "firebase/compat/storage"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// const fs = app.firestore()
// export const db = {
//   users: fs.collection("adminUsers"),
//   players: fs.collection("athletes"),
//   teams: fs.collection("teams"),
//   alumni: fs.collection("alumni"),
//   gameSched: fs.collection("gameSchedule"),
//   stories: fs.collection("athleteStories"),
//   news: fs.collection("news"),
//   about: fs.collection("aboutContent"),
//   headerFooter: fs.collection("headerFooter"),
//   pViews: fs.collection("playerViewCounters"),
//   tViews: fs.collection("teamViewCounters"),
//   wViews: fs.collection("webViewCounter"),
//   tForms: fs.collection("tryoutForms"),
//   logs: fs.collection("auditLogs"),
//   getServerTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
// };

// use firebase authentication
export const auth = firebase.auth()

export default app
