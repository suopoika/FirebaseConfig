import {initializeApp} from 'firebase/app';
import {getFirestore, collection, addDoc, serverTimestamp} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgF-7qhaYTt7BcXINE45RHspA_DQKGZ7M",
    authDomain: "chat-1dca1.firebaseapp.com",
    projectId: "chat-1dca1",
    storageBucket: "chat-1dca1.appspot.com",
    messagingSenderId: "105800672418",
    appId: "1:105800672418:web:cfa40c57bfbe3ca476e3fb"
  };

  initializeApp(firebaseConfig);

  const firestore = getFirestore();

  const MESSAGES = 'messages'

  export {
    firestore,
    collection,
    addDoc,
    MESSAGES
  };