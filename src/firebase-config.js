import { initializeApp } from "firebase/app";

import {getFireStore} from "@firebase/firestore";

const firebaseConfig = {
    authDomain: "crud-57c06.firebaseapp.com",
    projectId: "crud-57c06",
    storageBucket: "crud-57c06.appspot.com",
    messagingSenderId: "558676497692",
    appId: "1:558676497692:web:578ecce57bd5e2408116d9",
    measurementId: "G-21L8KD6TBD"
  };


  const app = initializeApp(firebaseConfig);

  export const db = getFireStore(app)