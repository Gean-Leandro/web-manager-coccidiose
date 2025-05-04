import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';

export interface IAccount {
    uid: string,
    name: string,
    email: string,
    level: string,
}

export const AccountService = {
    async new(email: string, senha: string, nome: string, nivel: string) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
          const user = userCredential.user;
      
          // Cria documento com ID igual ao UID do usuário
          await setDoc(doc(db, "accounts", user.uid), {
            uid: user.uid,
            name: nome,
            level: nivel,
            email: email
          });
        } catch (error) {
          throw error
        }
    },

    async getAccounts() {
        try {
            const querySnapshot = await getDocs(collection(db, 'accounts'));
            const lista: IAccount[] = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as IAccount[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar contas" + error, result: []};
        }
    },

    async getAccount(uid:string) {
        try {
            const docRef = doc(db, 'accounts', uid); // Supondo que o doc tem o UID como ID
            const docSnap = await getDoc(docRef);
  
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log('Usuário não encontrado na coleção accounts.');
            }
        } catch (error) {
            return error;
        }
    }
}