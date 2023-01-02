import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"

export const roomsRef = collection(db, "rooms")

export const accountsRef = collection(db, "accounts")


    