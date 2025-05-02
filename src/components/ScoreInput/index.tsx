import { useState, useRef } from "react";
import { Notification } from "../Notification";

interface Iscore {
    level: number | string,
    img: string | File,
    imgUrlTemp: string,
    imgPath: string,
    description: Array<string>
}

interface ScoreInputProps {
    onAdd: (newScore: Iscore) => void;
    onRemove: (index: number) => void;
    onEdit: (index:number, score:Iscore) => void;
    list: Array<Iscore>
}

export function ScoreInput(props:ScoreInputProps) {
    const [showNotification, setShowNotification] = useState<{active:boolean, mensage:string, bgColor:string}>(
        {active:false, mensage:"", bgColor:""}
    );
    const [imageModal, setImageModal] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [level, setLevel] = useState<number | string>("");
    const [description, setDescription] = useState<Array<string>>([]);
    const [newDescription, setNewDescription] = useState<string>("");
    const [editDescriptionIndex, setEditDescriptionIndex] = useState<number | null>(null);
    const [editScoreIndex, setEditScoreIndex] = useState<number | null>(null);
    const [image, setImage] = useState<string | File>("");
    const [imageUrlFile, setImageUrlFile] = useState<string>("");
    const [alertLevel, setAlertLevel] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const editScore = (index:number, level:number|string) => {
        setEditScoreIndex(index);
        setLevel(level);
        if (props.list[index].img !== ""){
            setImage(props.list[index].img);
        }
    }
    
    const editScoreCancel = () => {
        setLevel("");
        setEditScoreIndex(null);
    }

    const editScoreSave = () => {
        if (editScoreIndex !== null) {
            const editScore:Iscore = {
                level: level, 
                img:image,
                imgUrlTemp: imageUrlFile,
                imgPath: '',
                description:props.list[editScoreIndex].description
            };

            props.onEdit(editScoreIndex, editScore);
            setEditScoreIndex(null);
            setImage("");
            setLevel("");
            setImageUrlFile("");
            setShowNotification({
                active: true,
                mensage: "Score atualizado",
                bgColor: "bg-green-600"
            });
        }
    }

    const editScoreDescriptionActive = (index:number) => {
        setEditScoreIndex(index);
        setDescription(props.list[index].description)
        setIsOpen(true);
    }

    const editScoreDescriptionSave = () => {
        if (editScoreIndex !== null) {
            if (description.length === 0){
                setShowNotification({
                    active: true,
                    mensage: "Adicione pelo menos uma descrição",
                    bgColor: "bg-orange-500"
                });
            } else {
                if (props.list[editScoreIndex].level !== level){
                    const editScore:Iscore = {
                        level: props.list[editScoreIndex].level, 
                        img: props.list[editScoreIndex].img, 
                        imgUrlTemp: props.list[editScoreIndex].imgUrlTemp,
                        imgPath: props.list[editScoreIndex].imgPath,
                        description: description
                    };

                    props.onEdit(editScoreIndex, editScore);
                    setEditScoreIndex(null);
                    setEditDescriptionIndex(null);
                    setNewDescription("");
                    setIsOpen(false);
                    setShowNotification({
                        active: true,
                        mensage: "Score atualizado",
                        bgColor: "bg-green-600"
                    });
                } else {
                    setShowNotification({
                        active: true,
                        mensage: "Nível é idêntico ao anterior, ação cancelada",
                        bgColor: "bg-orange-500"
                    });
                }
            }
        }
    }

    const editDescriptionActivate = (index:number, description:string) => {
        setEditDescriptionIndex(index);
        setNewDescription(description);
    }
    
    const editDescriptionCancel = () => {
        setNewDescription("");
        setEditDescriptionIndex(null);
    }

    const editDescriptionSave = () => {
        if (editDescriptionIndex !== null) {
            if (description[editDescriptionIndex] !== newDescription.trim()){
                const updateDescription = [...description];
                updateDescription[editDescriptionIndex] = newDescription.trim();
                setDescription(updateDescription);
                setEditDescriptionIndex(null);
                setNewDescription("");
                setShowNotification({
                    active: true,
                    mensage: "Descrição atualizada",
                    bgColor: "bg-green-600"
                });
            } else {
                setShowNotification({
                    active: true,
                    mensage: "Descrição é idêntica a anterior, ação cancelada",
                    bgColor: "bg-orange-500"
                });
            }
        }
    }

    const cancelDescriptionbutton = () => {
        setNewDescription("");
        setLevel("");
        setDescription([]);
        setImage("");
        setEditScoreIndex(null);
        setIsOpen(false);
        setEditDescriptionIndex(null);
    }

    const addNewScoreButton = () => {
        if (description.length > 0) {
            setNewDescription("");
            props.onAdd({
                level: level, 
                img: image, 
                imgPath: '',
                imgUrlTemp: imageUrlFile, 
                description: description
            });
            setDescription([]);
            setImage("");
            setLevel("");
            setImageUrlFile("");
            setIsOpen(false);
            setShowNotification({
                active: true,
                mensage: "Score adicionado",
                bgColor: "bg-green-600"
            });
        } else {
            setShowNotification({
                active: true,
                mensage: "Adicione pelo menos uma descrição",
                bgColor: "bg-orange-500"
            });
        }
    }

    const addNewDescriptionButton = () => {
        if (newDescription.trim() !== "") {
            setDescription([...description, newDescription.trim()]);
            setNewDescription("");
        } else {
            setShowNotification({
                active: true,
                mensage: "Preencha o campo para poder adicionar uma nova descrição",
                bgColor: "bg-orange-500"
            })
        }
    }

    const removeItemListDescription = (index:number) => {
        setDescription(description.filter((_,i) => i !== index))
    }

    const openModal = () => {
        if (level !== "") {
            if (!props.list.some((score) => score.level === level)){
                if (!(Number(level) < 1)){
                    setIsOpen(true);
                    setAlertLevel(false);
                } else {
                    setShowNotification({
                        active: true,
                        mensage: "Nível não pode ser menor que 1",
                        bgColor: "bg-orange-500"
                    })
                    setAlertLevel(true);
                }
            } else {
                setShowNotification({
                    active: true,
                    mensage: "Não pode ter níveis iguais",
                    bgColor: "bg-orange-500"
                })
                setAlertLevel(true);
            }
        } else {
            setAlertLevel(true);
        }
    }

    // Capturar imagem e convertê-la em URL temporária
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            const imageUrl = URL.createObjectURL(file); // Pré-visualização local da imagem
            setImageUrlFile(imageUrl);
            setImage(file);
        } else {
            setShowNotification({
                active: true,
                mensage: "Por favor, selecione uma imagem JPG ou PNG.",
                bgColor: "bg-orange-500"
            });
        }
    };

    return(
        <>
        {showNotification.active && (
            <Notification
            message={showNotification.mensage}
            bgColor={showNotification.bgColor}
            onClose={() => setShowNotification({active: false, mensage:"", bgColor:""})}
            />
        )}
        <div className="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Tags-1--Streamline-Ultimate" height="24" width="24"><desc>Tags 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M1.13501 2.63403v6.258c0.00017 0.79559 0.31635 1.55857 0.879 2.12097L13.644 22.643c0.096 0.0961 0.2162 0.1643 0.3479 0.1974 0.1317 0.033 0.2699 0.0297 0.3999 -0.0096 0.1299 -0.0393 0.2468 -0.1132 0.338 -0.2137 0.0913 -0.1005 0.1536 -0.2239 0.1802 -0.3571l1.225 -6.126 6.126 -1.225c0.1331 -0.0266 0.2566 -0.0889 0.3571 -0.1801 0.1005 -0.0913 0.1744 -0.2082 0.2137 -0.3381 0.0393 -0.13 0.0426 -0.2682 0.0095 -0.3999 -0.033 -0.1317 -0.1012 -0.2519 -0.1973 -0.3479L11.014 2.01303c-0.5625 -0.56264 -1.32541 -0.87883 -2.12099 -0.879h-6.258c-0.39782 0 -0.77936 0.15804 -1.06066 0.43934 -0.2813 0.28131 -0.43934 0.66284 -0.43934 1.06066Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.88501 6.38403c0 0.19699 0.0388 0.39204 0.11418 0.57403 0.07538 0.18199 0.18587 0.34735 0.32516 0.48663 0.13929 0.13929 0.30465 0.24978 0.48663 0.32516 0.18199 0.07538 0.37705 0.11418 0.57403 0.11418 0.19698 0 0.39204 -0.0388 0.57402 -0.11418 0.18199 -0.07538 0.34735 -0.18587 0.48664 -0.32516 0.13929 -0.13928 0.24978 -0.30464 0.32516 -0.48663 0.07538 -0.18199 0.11418 -0.37704 0.11418 -0.57403 0 -0.19698 -0.0388 -0.39203 -0.11418 -0.57402 -0.07538 -0.18199 -0.18587 -0.34735 -0.32516 -0.48664 -0.13929 -0.13928 -0.30465 -0.24977 -0.48664 -0.32516 -0.18198 -0.07538 -0.37704 -0.11418 -0.57402 -0.11418s-0.39204 0.0388 -0.57403 0.11418c-0.18198 0.07539 -0.34734 0.18588 -0.48663 0.32516 -0.13929 0.13929 -0.24978 0.30465 -0.32516 0.48664 -0.07538 0.18199 -0.11418 0.37704 -0.11418 0.57402Z" stroke-width="1.5"></path></svg>
            Score:
        </div>
        <div className="bg-mygray-200 p-2 rounded-[8px] border-[2px] border-mygray-500">
            
            <div className={`flex w-[100%] gap-1 mb-2 ${editScoreIndex !== null ? "hidden" : ""}`}>
                <div className="w-[45%]">
                    <input 
                        value={level}
                        onChange={(e) => setLevel(e.target.value ? Number(e.target.value) : "")} 
                        className={`rounded-[8px] pl-2 h-[35px] w-[100%] border-[2px] ${alertLevel ? "border-red-600" : "border-mygray-500"}`} 
                        type="number" 
                        placeholder="Nível"/>
                    <p className={`text-red-600 mt-1 w-[100%] text-center ${alertLevel ? "" : "hidden"}`}>Adicione um nível válido</p>
                </div>
                <button onClick={handleSelectImage} 
                    type="button" 
                    className={`w-[45%] h-[35px] rounded-[8px] border-[2px] border-mygray-500 font-bold hover:bg-white ${image !== "" ? "bg-green-500 text-white" : "bg-mygray-200"}`}>
                    {image !== "" ? "IMAGEM SELECIONADA" : "SELECIONAR IMAGEM"}
                </button>
                <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"/>
                <button className={`${image !== "" ? "" : "hidden"} bg-white h-[35px] border-red-600 border-[2px] rounded-[8px] px-2`}
                    type="button"
                    onClick={() => setImage("")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button onClick={openModal} type="button" className="bg-mygray-900 flex items-center justify-center h-[35px] w-[10%] rounded-[8px] hover:bg-mygray-600">
                    <img width={25} height={25} src="\src\assets\AddWhite.png" alt="" />
                </button>
            </div>
            
            {/* Campo para editar */}
            <div className={`flex w-[100%] gap-1 mb-2 ${editScoreIndex !== null ? "" : "hidden"}`}>
                <div className="w-[20%]">
                    <input 
                        value={level}
                        onChange={(e) => setLevel(e.target.value ? Number(e.target.value) : "")} 
                        className={`rounded-[8px] pl-2 h-[35px] w-[100%] border-[2px] ${alertLevel ? "border-red-600" : "border-mygray-500"}`} 
                        type="number" 
                        placeholder="Nível"/>
                    <p className={`text-red-600 mt-1 w-[100%] text-center ${alertLevel ? "" : "hidden"}`}>Adicione um nível válido</p>
                </div>
                <button onClick={handleSelectImage} 
                    type="button" 
                    className={`w-[40%] h-[35px] rounded-[8px] border-[2px] border-mygray-500 font-bold hover:bg-white ${image !== "" ? "bg-green-500 text-white" : "bg-mygray-200"}`}>
                    {image !== "" ? "IMAGEM SELECIONADA" : "SELECIONAR IMAGEM"}
                </button>
                <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"/>
                <button className={`${image !== "" ? "" : "hidden"} bg-white h-[35px] border-red-600 border-[2px] rounded-[8px] px-2`}
                    type="button"
                    onClick={() => setImage("")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button
                    onClick={editScoreCancel}
                    type="button" 
                    className="bg-mygray-900 flex items-center justify-center text-white font-bold h-[35px] w-[20%] rounded-[8px] hover:bg-mygray-600">
                    CANCELAR
                </button>
                <button
                    onClick={editScoreSave}
                    type="button" 
                    className="bg-green-600 flex items-center justify-center text-white font-bold h-[35px] w-[20%] rounded-[8px] hover:bg-green-500">
                    SALVAR
                </button>
            </div>
            <div className="bg-white rounded-[8px] border-[2px] border-mygray-500 p-1">
                <div className="min-h-[50px] max-h-[200px] overflow-y-auto w-[100%]">
                { props.list.length === 0 ? (
                            <p className="text-center text-gray-500 p-2 mt-1">Nenhum score disponível.</p>
                        ): (
                            <ul>
                                {props.list.map((score, index) => (
                                    <li className="p-2 border-b flex first-letter:uppercase items-center justify-between">
                                        {score.level}
                                        <div className="flex items-center gap-2 *:p-1">
                                            {/* Botão visualizar imagem */}
                                            <button onClick={() => {
                                                setImage(score.img);
                                                setImageUrlFile(score.imgUrlTemp);
                                                setImageModal(true);
                                            }} 
                                                type="button" 
                                                className={`${score.img === "" ? "hidden": ""} hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Picture-Double-Landscape--Streamline-Ultimate" height="24" width="24"><desc>Picture Double Landscape Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M18.75 5.25v-0.978c0.0015 -0.26409 -0.0491 -0.52588 -0.1488 -0.77042 -0.0998 -0.24454 -0.2467 -0.46704 -0.4324 -0.6548 -0.1857 -0.18776 -0.4066 -0.3371 -0.65 -0.4395 -0.2435 -0.1024 -0.5047 -0.15584 -0.7688 -0.15728H2.75003c-0.26409 0.00144 -0.52531 0.05488 -0.76874 0.15728 -0.24344 0.1024 -0.46432 0.25174 -0.65004 0.4395 -0.18572 0.18776 -0.332633 0.41026 -0.432359 0.6548 -0.099726 0.24454 -0.150309 0.50633 -0.148861 0.77042v9.456c-0.001448 0.2641 0.049135 0.5259 0.148861 0.7704 0.099726 0.2446 0.246639 0.4671 0.432359 0.6548 0.18572 0.1878 0.4066 0.3371 0.65004 0.4395 0.24343 0.1024 0.50465 0.1559 0.76874 0.1573" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m11.339 21.7499 4.439 -6.307c0.1304 -0.1863 0.3015 -0.3404 0.5003 -0.4508 0.1987 -0.1105 0.42 -0.1743 0.6471 -0.1866 0.227 -0.0123 0.4539 0.0271 0.6634 0.1154 0.2096 0.0882 0.3964 0.223 0.5462 0.394l4.938 5.643" stroke-width="1.5"></path><path stroke="#000000" d="M10.875 13.5c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M10.875 13.5c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.25 8.25H7c-0.55228 0 -1 0.44772 -1 1v11.5c0 0.5523 0.44772 1 1 1h15.25c0.5523 0 1 -0.4477 1 -1V9.25c0 -0.55228 -0.4477 -1 -1 -1Z" stroke-width="1.5"></path></svg>
                                            </button>

                                            {/* Botão de edição */}
                                            <button onClick={() => editScore(index, score.level)}
                                                type="button" 
                                                className={`hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px] ${index === editScoreIndex ? "hidden": ""}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Pencil-1--Streamline-Ultimate" height="24" width="24"><desc>Pencil 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.19 1.81002c-0.3406 -0.33916 -0.7449 -0.60748 -1.1898 -0.78945 -0.4449 -0.181969 -0.9214 -0.273985 -1.402 -0.270731 -0.4806 0.003255 -0.9558 0.101715 -1.3982 0.289691 -0.4423 0.18798 -0.8431 0.46175 -1.179 0.80549L2.521 16.345 0.75 23.25l6.905 -1.771 14.5 -14.49998c0.3437 -0.33593 0.6175 -0.73665 0.8055 -1.17901 0.188 -0.44235 0.2864 -0.91756 0.2897 -1.39819 0.0032 -0.48063 -0.0888 -0.95713 -0.2707 -1.40199 -0.182 -0.44486 -0.4503 -0.84925 -0.7895 -1.18981Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m16.606 2.26001 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.512 4.354 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m2.521 16.345 5.139 5.129" stroke-width="1.5"></path></svg>
                                            </button>
                                            
                                            {/* Botão de visualizar */}
                                            <button 
                                                onClick={() => editScoreDescriptionActive(index)}
                                                type="button" 
                                                className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Search-Circle--Streamline-Ultimate" height="24" width="24"><desc>Search Circle Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.75 12c0 2.9837 1.18526 5.8452 3.29505 7.955C6.15483 22.0647 9.01631 23.25 12 23.25c2.9837 0 5.8452 -1.1853 7.955 -3.295 2.1097 -2.1098 3.295 -4.9713 3.295 -7.955 0 -2.98369 -1.1853 -5.84517 -3.295 -7.95495C17.8452 1.93526 14.9837 0.75 12 0.75c-2.98369 0 -5.84517 1.18526 -7.95495 3.29505C1.93526 6.15483 0.75 9.01631 0.75 12Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M6.75 11.125c0 1.1603 0.46094 2.2731 1.28141 3.0936 0.82047 0.8205 1.93327 1.2814 3.09359 1.2814 1.1603 0 2.2731 -0.4609 3.0936 -1.2814 0.8205 -0.8205 1.2814 -1.9333 1.2814 -3.0936 0 -1.16032 -0.4609 -2.27312 -1.2814 -3.09359C13.3981 7.21094 12.2853 6.75 11.125 6.75c-1.16032 0 -2.27312 0.46094 -3.09359 1.28141C7.21094 8.85188 6.75 9.96468 6.75 11.125Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.219 14.218 3.031 3.032" stroke-width="1.5"></path></svg>
                                            </button>

                                            {/* Botão de exclusão */}
                                            <button onClick={() => props.onRemove(index)} type="button" className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                                <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_100_271)">
                                                    <path d="M0.833252 4.1665H19.1666" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M11.875 0.833496H8.125C7.79348 0.833496 7.47553 0.965196 7.24112 1.19961C7.0067 1.43403 6.875 1.75198 6.875 2.0835V4.16683H13.125V2.0835C13.125 1.75198 12.9933 1.43403 12.7589 1.19961C12.5245 0.965196 12.2065 0.833496 11.875 0.833496Z" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M8.125 14.7915V8.5415" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M11.875 14.7915V8.5415" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M15.7167 18.0165C15.6935 18.3297 15.5525 18.6224 15.3221 18.8358C15.0917 19.0492 14.789 19.1673 14.475 19.1665H5.525C5.21098 19.1673 4.90828 19.0492 4.67789 18.8358C4.4475 18.6224 4.30652 18.3297 4.28333 18.0165L3.125 4.1665H16.875L15.7167 18.0165Z" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_100_271">
                                                    <rect width="20" height="20" fill="white"/>
                                                    </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                </div>
            </div>
        </div>

        {/* Modal */}
        {isOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-[8px] w-[50%] h-[50%]">
                    <div className="flex justify-between h-[10%] mb-3">
                        <div className="font-bold text-[18px] flex justify-center items-center w-[90%]">
                            <strong className="text-mygray-600 mr-1">SCORE {">"}</strong>INFORMAÇÕES ADICIONAIS
                        </div>
                        <button type="button" onClick={cancelDescriptionbutton}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="bg-mygray-300 p-2 h-[70%] rounded-[8px] border-[2px] border-mygray-500">
                        <div className={`flex w-[100%] gap-1 mb-1 ${editDescriptionIndex !== null ? "hidden": ""}`}>
                            <input
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="rounded-[8px] pl-2 h-[35px] w-[90%] border-[2px] border-mygray-500" type="text" placeholder="Descrição" />
                            <button
                                onClick={addNewDescriptionButton}
                                type="button" 
                                className="bg-mygray-900 flex items-center justify-center h-[35px] w-[10%] rounded-[8px] hover:bg-mygray-600">
                                <img width={25} height={25} src="\src\assets\AddWhite.png" alt="" />
                            </button>
                        </div>

                        {/* Campo de edição */}
                        <div className={`flex w-[100%] gap-1 mb-1 ${editDescriptionIndex === null ? "hidden": ""}`}>
                            <input
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="rounded-[8px] pl-2 h-[35px] w-[60%] border-[2px] border-mygray-500" type="text" placeholder="Descrição" />
                            <button
                                onClick={editDescriptionCancel}
                                type="button" 
                                className="bg-mygray-900 flex items-center justify-center text-white font-bold h-[35px] w-[20%] rounded-[8px] hover:bg-mygray-600">
                                CANCELAR
                            </button>
                            <button
                                onClick={editDescriptionSave}
                                type="button" 
                                className="bg-green-600 flex items-center justify-center text-white font-bold h-[35px] w-[20%] rounded-[8px] hover:bg-green-500">
                                SALVAR
                            </button>
                        </div>

                        <div className="bg-white h-[80%] rounded-[8px] border-[2px] border-mygray-500 p-1">
                            <div className="h-[100%] overflow-y-auto w-[100%]">
                            { description.length === 0 ? (
                                <p className="text-center text-gray-500 p-2 mt-1">Nenhuma descrição disponível.</p>
                                ): (
                                    <ul>
                                        {description.map((desc, index) => (
                                            <li className="p-2 border-b flex first-letter:uppercase items-center justify-between">
                                                <div className="w-[85%] break-words">
                                                    {desc}
                                                </div>
                                                <div className="flex items-center gap-2 *:p-1">
                                                    {/* Botão de edição */}
                                                    <button onClick={() => editDescriptionActivate(index, desc)}
                                                        type="button" 
                                                        className={`hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px] ${index === editDescriptionIndex ? "hidden": ""}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Pencil-1--Streamline-Ultimate" height="24" width="24"><desc>Pencil 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.19 1.81002c-0.3406 -0.33916 -0.7449 -0.60748 -1.1898 -0.78945 -0.4449 -0.181969 -0.9214 -0.273985 -1.402 -0.270731 -0.4806 0.003255 -0.9558 0.101715 -1.3982 0.289691 -0.4423 0.18798 -0.8431 0.46175 -1.179 0.80549L2.521 16.345 0.75 23.25l6.905 -1.771 14.5 -14.49998c0.3437 -0.33593 0.6175 -0.73665 0.8055 -1.17901 0.188 -0.44235 0.2864 -0.91756 0.2897 -1.39819 0.0032 -0.48063 -0.0888 -0.95713 -0.2707 -1.40199 -0.182 -0.44486 -0.4503 -0.84925 -0.7895 -1.18981Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m16.606 2.26001 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.512 4.354 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m2.521 16.345 5.139 5.129" stroke-width="1.5"></path></svg>
                                                    </button>
                                                    {/* Botão da lixeira */}
                                                    <button onClick={() => removeItemListDescription(index)}
                                                        type="button" className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_100_271)">
                                                            <path d="M0.833252 4.1665H19.1666" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.875 0.833496H8.125C7.79348 0.833496 7.47553 0.965196 7.24112 1.19961C7.0067 1.43403 6.875 1.75198 6.875 2.0835V4.16683H13.125V2.0835C13.125 1.75198 12.9933 1.43403 12.7589 1.19961C12.5245 0.965196 12.2065 0.833496 11.875 0.833496Z" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M8.125 14.7915V8.5415" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M11.875 14.7915V8.5415" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M15.7167 18.0165C15.6935 18.3297 15.5525 18.6224 15.3221 18.8358C15.0917 19.0492 14.789 19.1673 14.475 19.1665H5.525C5.21098 19.1673 4.90828 19.0492 4.67789 18.8358C4.4475 18.6224 4.30652 18.3297 4.28333 18.0165L3.125 4.1665H16.875L15.7167 18.0165Z" stroke="#BE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </g>
                                                            <defs>
                                                            <clipPath id="clip0_100_271">
                                                            <rect width="20" height="20" fill="white"/>
                                                            </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-[20%] flex justify-end items-center gap-4 *:font-bold *:py-1 *:px-10">
                        <button onClick={cancelDescriptionbutton} className="border-[2px] border-black rounded-[8px] hover:bg-mygray-600 hover:text-white">
                            CANCELAR
                        </button>
                        <button type="button" 
                            onClick={() => {
                                if (editScoreIndex !== null) {
                                    editScoreDescriptionSave()
                                } else {
                                    addNewScoreButton()
                                }
                            }} 
                            className="border-[2px] border-black bg-black rounded-[8px] text-white hover:bg-mygray-600">
                            ADICIONAR
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Imagem */}
        {imageModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white px-4 pb-1 pt-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto relative">
                    <div className="flex justify-between h-[10%] mb-3">
                        <div className="font-bold text-[18px] flex justify-center items-center w-[90%] pl-12">
                            IMAGEM
                        </div>
                        <button type="button" onClick={() => {
                            if (editScoreIndex === null){
                                setImage("");
                            } else {
                                setImage(props.list[editScoreIndex].img);
                            }
                            setImageModal(false)
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <img src={typeof image === "string"? image : imageUrlFile} alt="Visualização" className="max-w-full max-h-[70vh] rounded border-[2px] border-mygray-500 mb-4" />
                </div>
            </div>
        )}

        </>
    )
}