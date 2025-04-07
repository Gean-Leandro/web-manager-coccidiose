import { useState } from "react";
import { Notification } from "../Notification";

interface DynamicListInputProps {
    title: string,
    icon: any,
    textEmptyReport: string,
    placeholder: string,
    list: Array<string>,
    onRemove: (index: number) => void,
    onAdd: (newItem: string) => void,
    onEdit: (index: number | null, newDescription: string) => boolean
}

export function DynamicListInput(props:DynamicListInputProps) {
    const [newDescription, setNewDescription] = useState("");
    const [editDescriptionIndex, setEditDescriptionIndex] = useState<number | null>(null);
    const [showNotification, setShowNotification] = useState<{active:boolean, mensage:string, bgColor:string}>(
        {active:false, mensage:"", bgColor:""}
    );

    function capitalizeFirstLetter(text: string) {
        const lowerText = text.toLowerCase();
        return lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
    }

    const addNewDescriptionButton = () => {
        if (newDescription.trim() !== "") {
            props.onAdd(newDescription.trim());
            setNewDescription("");
        } else {
            setShowNotification({
                active: true,
                mensage: "Preencha o campo para poder adicionar uma nova descrição",
                bgColor: "bg-orange-500"
            })
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
        if (props.onEdit(editDescriptionIndex, newDescription.trim())) {
            setNewDescription("");
            setEditDescriptionIndex(null);
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
            {props.icon}
            {props.title}:
        </div>
        <div className="bg-mygray-300 p-2 rounded-[8px] border-[2px] border-mygray-500">
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

            <div className="bg-white rounded-[8px] border-[2px] border-mygray-500 p-1">
                <div className="min-h-[50px] max-h-[200px] overflow-y-auto w-[100%]">
                        { props.list.length === 0 ? (
                            <p className="text-center text-gray-500 p-2 mt-1">{ props.textEmptyReport }</p>
                        ): (
                            <ul>
                                {props.list.map((desc, index) => (
                                    <li className="p-2 border-b flex first-letter:uppercase items-center justify-between">
                                        <div className="w-[85%] break-words">
                                            {capitalizeFirstLetter(desc)}
                                        </div>
                                        <div className="flex items-center gap-2 *:p-1">
                                            {/* Botão de edição */}
                                            <button onClick={() => editDescriptionActivate(index, desc)}
                                                type="button" 
                                                className={`hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px] ${index === editDescriptionIndex ? "hidden": ""}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Pencil-1--Streamline-Ultimate" height="24" width="24"><desc>Pencil 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.19 1.81002c-0.3406 -0.33916 -0.7449 -0.60748 -1.1898 -0.78945 -0.4449 -0.181969 -0.9214 -0.273985 -1.402 -0.270731 -0.4806 0.003255 -0.9558 0.101715 -1.3982 0.289691 -0.4423 0.18798 -0.8431 0.46175 -1.179 0.80549L2.521 16.345 0.75 23.25l6.905 -1.771 14.5 -14.49998c0.3437 -0.33593 0.6175 -0.73665 0.8055 -1.17901 0.188 -0.44235 0.2864 -0.91756 0.2897 -1.39819 0.0032 -0.48063 -0.0888 -0.95713 -0.2707 -1.40199 -0.182 -0.44486 -0.4503 -0.84925 -0.7895 -1.18981Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m16.606 2.26001 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.512 4.354 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m2.521 16.345 5.139 5.129" stroke-width="1.5"></path></svg>
                                            </button>
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
        </>
    )
}