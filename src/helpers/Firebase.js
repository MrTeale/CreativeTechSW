/* =============================================================================== */
// FIREBASE SETTINGS, REFERENCES AND FUNCTIONS
// ------------------------------
// Firebase.js
/* =============================================================================== */

// Firebase Import
import firebase from 'firebase';

// Firebase config
const config = {
	apiKey: "AIzaSyDsDtwKqlJidXt2QN0i1jB7AMzjpd5xQSc",
    authDomain: "interview-your-app.firebaseapp.com",
    databaseURL: "https://interview-your-app.firebaseio.com",
    projectId: "interview-your-app",
    storageBucket: "interview-your-app.appspot.com",
    messagingSenderId: "355783983754"
};

// Firebase Initialisation
firebase.initializeApp(config);

/* =============================================================================== */
// MAIN FIREBASE EXPORTS
/* =============================================================================== */
// Firebase Authentication
export const FirebaseAuth = firebase.auth;

/* =============================================================================== */
// PROVIDERS
/* =============================================================================== */
// Google Provider
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export function getUserObject() {
	const userKey = Object.keys(window.localStorage)
  	.filter(it => it.startsWith('firebase:authUser'))[0];
	const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;
	return user;
}

/* =============================================================================== */
// AUTHENTICATION FUNCTIONS
/* =============================================================================== */
/* ================================= */
// Authenticate
// description:
// check firebase's authentication observer
// for user login
// returns:
// User user - firebase user object or null
/* ================================= */
export function authenticate() {
	FirebaseAuth().onAuthStateChanged(function(user) {
	  if (user) {
			localStorage.set("user", user.uid);
	    return user.uid;
	  } else {
			return null;
	  }
	});
}

/* ================================= */
// Login With Google
// description:
// conducts the firebase operations for logging in with google
// as the authentication service provider
/* ================================= */
export function loginWithGoogle() {
    return FirebaseAuth().signInWithRedirect(GoogleProvider);
    //return authenticate(loginWithFirebase(GoogleProvider));
}

/* ================================= */
// Login With Email
// description:
// conducts the firebase functions using
// a provided email and password for authentication
// parameters:
// String email - user email
// String password - user password
/* ================================= */
export function loginWithEmail(email, password) {
	return FirebaseAuth().signInWithEmailAndPassword(email, password);
}

/* ================================= */
// Logout
// description:
// conduct firebase logout process
/* ================================= */
export function logout() {
    return FirebaseAuth().signOut();
}

/* =============================================================================== */
// EMAIL FUNCTIONS
/* =============================================================================== */
/* ================================= */
// Send Password Reset Email
// description:
// sends a password resent email to the
// specified email address
// parameters:
// String email - email address for password reset
/* ================================= */
export function sendPasswordResetEmail(email) {
	return FirebaseAuth().sendPasswordResetEmail(email);
}

/* ================================= */
// Sign Up Email
// description:
// creates user account with the provided
// email and password fields
// parameters:
// String email - new user email
// String password - new user password
/* ================================= */
export function signupEmail(email, password) {
	return FirebaseAuth().createUserWithEmailAndPassword(email, password);
}
