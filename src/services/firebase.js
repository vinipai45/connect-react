import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDING_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
}

firebase.initializeApp(firebaseConfig)
// firebase.analytics();

export { firebase }
// export { firebaseAuth }