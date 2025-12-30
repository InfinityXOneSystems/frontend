export const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDOLjf-mj1mLyizad34WroDVt4TBCbK7Fo",
    authDomain: "infinity-x-one-systems.firebaseapp.com",
    projectId: "infinity-x-one-systems",
    storageBucket: "infinity-x-one-systems.firebasestorage.app",
    messagingSenderId: "896380409704",
    appId: "1:896380409704:android:1b4c74854efcd6261d6d91"
  },
  stripe: {
    publicKey: "pk_test_51SYhO99nw0KLZg68PjK7H7eY5ic7PspMHAStJBz59ySQXDBVaVKCW0Fxg2QL3E6XIdE593lwr20KldbOr4Qf7NBo00V5xmYQKz"
  }
};