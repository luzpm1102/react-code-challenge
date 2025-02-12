import { initializeApp } from 'firebase/app';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getFirestore,
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyB-zP7f26JflgWnMCRcPa4N6z7y0xjuOi0',
  authDomain: 'meraki-react-challenge.firebaseapp.com',
  projectId: 'meraki-react-challenge',
  storageBucket: 'meraki-react-challenge.appspot.com',
  messagingSenderId: '1068507762305',
  appId: '1:1068507762305:web:de82a1cf27be4b32a68780',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export const getCollectionRef = (collectionName: string) => {
  return collection(db, collectionName);
};

export const formatData = (docs: QuerySnapshot<DocumentData, DocumentData>) => {
  return docs.docs.map((doc) => doc.data());
};
