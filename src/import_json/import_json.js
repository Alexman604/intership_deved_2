import data from "./firebase-data.json"
import { doc, setDoc, collection} from "firebase/firestore"; 
import { accountsRef, roomsRef } from "../firebase/firebaseConnection";
import { db } from "../firebase/firebase";

export   function importData () {
 
    // for (const user in data.Accounts) {
    //     addDocToDBuser(accountsRef, {user, ...data.Accounts[user]})

    // }
    
     data.Rooms.map(room => addDocToDBroom(room.id, {key: room.id, ...room} ))

 }

 async function addDocToDBuser(collectionREF, object) {
    await setDoc(doc(collectionREF), object);
}

export async function addDocToDBroom(id, object) {
    console.log("stored")
    await setDoc(doc(db,  'rooms', id), object);
}

