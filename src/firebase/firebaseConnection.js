import { collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const roomsRef = collection(db, "rooms");

export const accountsRef = collection(db, "accounts");

export const updRoomStatus = async (id, object) => {
  const room = doc(db, "rooms", id);
  const docSnap = await getDoc(room);
  await updateDoc(room, object);
};
