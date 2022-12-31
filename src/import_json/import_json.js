import data from "./firebase-data.json"
import { doc, setDoc } from "firebase/firestore"; 
import { accountsRef, roomsRef } from "../firebase/firebaseConnection";



export   function importData () {
 
 
    for (const user in data.Accounts) {
        addDocToDB(accountsRef, {user, ...data.Accounts[user]})

 
    }
    
    //  data.Rooms.map(room => addDocToDB(roomsRef, room))


 }


async function addDocToDB(collectionREF, object) {
    await setDoc(doc(collectionREF), object);
}