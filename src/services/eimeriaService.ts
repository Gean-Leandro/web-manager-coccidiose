import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";

export interface Iscore {
    level: number | string,
    img: string | File,
    imgPath: string,
    description: Array<string>
}

export interface eimeriaProps{
    id?: string,
    name: string,
    imgLocal: string | File,
    imgPath: string,
    category: string,
    general_description: Array<string>,
    place_of_action: Array<string>,
    clinical_signs: Array<string>,
    score: Array<Iscore>
}

export const EimeriaService = {

    
    async getEimerias(): Promise<{status: string, result: Array<eimeriaProps>}> {
        try {
            const querySnapshot = await getDocs(collection(db, 'eimerias'));
            const lista: eimeriaProps[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as eimeriaProps[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar eimérias" + error, result: []};
        }
    },
    
    async salvarEimeria(data: eimeriaProps, category: string) {
        try {
            // 1. Cria o documento com ID automático
            const eimeriaRef = await addDoc(collection(db, "eimerias"), {
                name: data.name,
                imgLocal: "", // temporário
                imgPath: "",
                category: category,
                general_description: data.general_description,
                place_of_action: data.place_of_action,
                clinical_signs: data.clinical_signs,
                score: [], // temporário
            });
            
            const id = eimeriaRef.id;
            
            // 2. Faz upload da imagem principal
            let imgLocalUrl = "";
            let imgLocalPath = "";
            
            if (data.imgLocal instanceof File) {
                const path = `eimerias/${id}/principal_${data.imgLocal.name}`;
                const imageRef = ref(storage, path);
                await uploadBytes(imageRef, data.imgLocal);
                imgLocalUrl = await getDownloadURL(imageRef);
                imgLocalPath = path;
            }
            
            // 3. Faz upload das imagens dos scores
            const updatedScores = await Promise.all(
                data.score.map(async (item, index) => {
                    if (item.img instanceof File) {
                        const path = `eimerias/${id}/score_${index}_${item.img.name}`;
                        const imageRef = ref(storage, path);
                        await uploadBytes(imageRef, item.img);
                        const url = await getDownloadURL(imageRef);
                        return {
                            level: item.level,
                            img: url,
                            imgPath: path,
                            description: item.description    
                        };
                    } else {
                        return {
                            level: item.level,
                            img: "",
                            imgPath: "",
                            description: item.description
                        }
                    }
                })
            );
            
            // 4. Atualiza o documento com as URLs e o próprio ID
            await updateDoc(eimeriaRef, {
                id,
                imgLocal: imgLocalUrl,
                imgPath: imgLocalPath,
                score: updatedScores,
            });
            
            
            console.log("Espécie salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar eimeria:", error);
        }
    }
}