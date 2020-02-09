import firebase from 'firebase';
import '@firebase/firestore' 
import ReduxSagaFirebase from 'redux-saga-firebase'

const config = {
  apiKey: "AIzaSyBsMNs1jS_PEonM5Qadqj7JJIkpV03Y_G4",
    authDomain: "test-a5de4.firebaseapp.com",
    databaseURL: "https://test-a5de4.firebaseio.com",
    projectId: "test-a5de4",
    storageBucket: "test-a5de4.appspot.com",
    messagingSenderId: "1041269011116",
    appId: "1:1041269011116:web:a418919b180550402ee509"
};

const firebaseApp = firebase.initializeApp(config);

const rsf = new ReduxSagaFirebase(firebaseApp)
export default  rsf