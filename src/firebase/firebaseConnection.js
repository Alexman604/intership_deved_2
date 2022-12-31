import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"

export const roomsRef = collection(db, "rooms")

export const accountsRef = collection(db, "accounts")

export const  getDataFromDB = (collectionRef) =>{
    return getDocs(collectionRef).then((snapshot) => {
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        
    } )
}
    