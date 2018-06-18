import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCMlp3UmJT3lZBkLSBB36URbHE_DmKxkHc",
	    authDomain: "recommendations2018.firebaseapp.com",
	    databaseURL: "https://recommendations2018.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
