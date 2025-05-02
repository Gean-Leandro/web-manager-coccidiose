import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";

interface Iglossary {
    id: string,
    word: string,
    meaning: string
}

export const GlossaryService = {
    async getGlossary() {
        try {
            const querySnapshot = await getDocs(collection(db, 'glossary'));
            const lista: Iglossary[] = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as Iglossary[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar eimérias" + error, result: []};
        }
    },
}