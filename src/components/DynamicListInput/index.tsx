import { useState } from "react";

interface DynamicListInputProps {
    title: string,
    icon: any,
    placeholder: string,
    list: Array<string>,
    onRemove: (index: number) => void,
    onAdd: (newItem: string) => void
}

export function DynamicListInput(props:DynamicListInputProps) {
    const [newDescription, setNewDescription] = useState("");

    function capitalizeFirstLetter(text: string) {
        const lowerText = text.toLowerCase();
        return lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
    }

    const handleAdd = () => {
        if (newDescription.trim() !== "") {
            console.log('Ola');
            props.onAdd(newDescription.trim());
            setNewDescription("");
        }
    };
    return(
        <>
        <div className="flex gap-3">
            {props.icon}
            {props.title}:
        </div>
        <div className="bg-mygray-300 p-2 rounded-[8px] border-[2px] border-mygray-500">
            <div className="flex w-[100%] gap-1 mb-2">
                <input className="rounded-[8px] pl-2 h-[35px] w-[90%] border-[2px] border-mygray-500" 
                type="text" 
                placeholder={props.placeholder}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)} />
                    <button onClick={handleAdd} type="button" className="bg-mygray-900 flex items-center justify-center h-[35px] w-[10%] rounded-[8px] hover:bg-mygray-600">
                        <img width={25} height={25} src="\src\assets\AddWhite.png" alt="" />
                    </button>
            </div>
            <div className="bg-white rounded-[8px] border-[2px] border-mygray-500 p-1">
                <div className="min-h-[50px] max-h-[200px] overflow-y-auto w-[100%]">
                        { props.list.length === 0 ? (
                            <p className="text-center text-gray-500 p-2">Nenhuma descrição disponível.</p>
                        ): (
                            <ul>
                                {props.list.map((desc, index) => (
                                    <li className="p-2 border-b flex first-letter:uppercase items-center justify-between">
                                        {capitalizeFirstLetter(desc)}
                                        <div className="flex items-center gap-2 *:p-1">
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