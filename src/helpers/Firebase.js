/* =============================================================================== */
// FIREBASE SETTINGS, REFERENCES AND FUNCTIONS
// ------------------------------
// Firebase.js
/* =============================================================================== */

// Firebase Import
import firebase from 'firebase';
// Debug
import {Debug, DebugLevel} from './Debug';

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

/*export function saveUser(uid, data) {
	FirebaseAuth().onAuthStateChanged(function(user) {
		if (user) {
			// Save claim data to database
			UsersDatabase.push().set({
				uid: user.uid,
				timestamp: Date.now(),
				data: data
			});
			// Get claim entry key
			var claimKey = ClaimsDatabase.key;
			// Return claim key
			return claimKey;
		} else {
			// Save claim data to database
			ClaimsDatabase.push().set({
				uid: data.email,
				timestamp: Date.now(),
				data: data
			});
			// Get claim entry key
			var claimKey = ClaimsDatabase.key;
			// Return claim key
			return claimKey;
		}
	});
}*/

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

/*function authenticate(promise) {
    return promise
        .then(function (result) {
            // login with your app with result object to get accessToken (token)
            // localStorage.save(token);
            var token = result.credential.accessToken;
            var user = result.user;
            console.log("login happened with firebase, ", JSON.stringify(user));
            localStorage.setItem("firebaseUser", JSON.stringify(result));
            return Promise.resolve(result);
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert("failed firebase login" + error);
            return Promise.reject("err");
        });
}*/

/* ================================= */
// Login With Firebase
// description:
// conducts the firebase functions using
// a provided email and password for authentication
// parameters:
// String email - user email
// String password - user password
/* ================================= */
/*
function loginWithFirebase(provider) {
    return FirebaseAuth().signInWithRedirect(provider);

		/*
     FirebaseAuth().signInWithPopup(provider).then(function (result) {
     // This gives you a Google Access Token. You can use it to access the Google API.
     const token = result.credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     // ...
     console.log("google login success. token=", token, ",user=", JSON.stringify(user));
     }).catch(function (error) {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     // The email of the user's account used.
     const email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     const credential = error.credential;
     // ...
     console.log("google login failed.reason=", errorMessage);
     });

}*/

/* ================================= */
// Login As Guest
// description:
// function for anonymous login with temporary
// guest user accounts
/* ================================= */
/*function loginAsGuest() {
	return FirebaseAuth().signInAnonymously();
}*/

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
