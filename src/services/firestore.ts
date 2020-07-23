import firebase from "firebase";

export function initializeFirestore () {
	const firebaseConfig = {
		apiKey: "AIzaSyAIrLhvRs4EXZJWNtD1SqTVKKk1R583Q_8",
		authDomain: "bartograph.firebaseapp.com",
		databaseURL: "https://bartograph.firebaseio.com",
		projectId: "bartograph",
		storageBucket: "bartograph.appspot.com",
		messagingSenderId: "99910079681",
		appId: "1:99910079681:web:8a5f774adce2a1069db040",
		measurementId: "G-3YSD8DX8T2"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
}