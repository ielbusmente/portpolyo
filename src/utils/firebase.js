import firebase from "firebase/compat/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/firestore"
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
const app = firebase.initializeApp(firebaseConfig)

const fs = app.firestore()

export const db = {
  logs: fs.collection("audit_logs"),
  projects: fs.collection("projects"),
  skills: fs.collection("skills"),
  skill_types: fs.collection("skill_types"),
  proj_types: fs.collection("proj_types"),
  // get_server_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
}

// use firebase authentication
export const auth = firebase.auth()

export function listen_for_updates(setter, collection) {
  let database
  switch (collection) {
    case "logs":
      database = db.logs.orderBy("date", "asc")
      break
    case "projects":
      database = db.projects
      break
    case "proj_types":
      database = db.proj_types
      break
    default:
      console.error(`Something went wrong in listening for updates.`)
      break
  }
  database.onSnapshot(doc => {
    const new_data = doc.docs.map(d => {
      return { id: d.id, ...d.data() }
    })
    setter(new_data)
  })
}

export default app
