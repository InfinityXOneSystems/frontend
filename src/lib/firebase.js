import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { config } from './config';

// Initialize Firebase using centralized config
// This ensures that even if env vars are missing in the environment, 
// the hardcoded fallbacks in config.js will allow the app to function.
const firebaseConfig = config.firebase;

let app;
let auth;
let githubProvider;
let googleProvider;

try {
  // Check if critical keys exist (they should, given the config defaults)
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    githubProvider = new GithubAuthProvider();
    googleProvider = new GoogleAuthProvider();
    
    // Add scopes for GitHub
    githubProvider.addScope('read:user');
    githubProvider.addScope('user:email');
    
    // Add scopes for Google
    googleProvider.addScope('email');
    googleProvider.addScope('profile');
    
    console.log('Firebase initialized successfully with project:', firebaseConfig.projectId);
  } else {
    console.warn("Firebase config missing. Authentication features will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
}

export { auth, githubProvider, googleProvider, signInWithPopup, signOut };