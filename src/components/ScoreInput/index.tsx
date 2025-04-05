import { useState, useRef } from "react";

interface Iscore {
    level: number,
    img: string | File,
    description: Array<string>
}

interface ScoreInputProps {
    onAdd: (newScore: Iscore) => void,
    onRemove: (index: number) => void,
    list: Array<Iscore>
}

export function ScoreInput(props:ScoreInputProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [level, setLevel] = useState<number | string>("");
    const [descriprion, setDescriprion] = useState<Array<string>>([]);
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Abrir janela de seleção de imagem
    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    // Capturar imagem e convertê-la em URL temporária
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            const imageUrl = URL.createObjectURL(file); // Pré-visualização local da imagem
            setImage(imageUrl);
        } else {
            alert("Por favor, selecione uma imagem JPG ou PNG.");
        }
    };

    return(
        <>
        <div className="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Tags-1--Streamline-Ultimate" height="24" width="24"><desc>Tags 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M1.13501 2.63403v6.258c0.00017 0.79559 0.31635 1.55857 0.879 2.12097L13.644 22.643c0.096 0.0961 0.2162 0.1643 0.3479 0.1974 0.1317 0.033 0.2699 0.0297 0.3999 -0.0096 0.1299 -0.0393 0.2468 -0.1132 0.338 -0.2137 0.0913 -0.1005 0.1536 -0.2239 0.1802 -0.3571l1.225 -6.126 6.126 -1.225c0.1331 -0.0266 0.2566 -0.0889 0.3571 -0.1801 0.1005 -0.0913 0.1744 -0.2082 0.2137 -0.3381 0.0393 -0.13 0.0426 -0.2682 0.0095 -0.3999 -0.033 -0.1317 -0.1012 -0.2519 -0.1973 -0.3479L11.014 2.01303c-0.5625 -0.56264 -1.32541 -0.87883 -2.12099 -0.879h-6.258c-0.39782 0 -0.77936 0.15804 -1.06066 0.43934 -0.2813 0.28131 -0.43934 0.66284 -0.43934 1.06066Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.88501 6.38403c0 0.19699 0.0388 0.39204 0.11418 0.57403 0.07538 0.18199 0.18587 0.34735 0.32516 0.48663 0.13929 0.13929 0.30465 0.24978 0.48663 0.32516 0.18199 0.07538 0.37705 0.11418 0.57403 0.11418 0.19698 0 0.39204 -0.0388 0.57402 -0.11418 0.18199 -0.07538 0.34735 -0.18587 0.48664 -0.32516 0.13929 -0.13928 0.24978 -0.30464 0.32516 -0.48663 0.07538 -0.18199 0.11418 -0.37704 0.11418 -0.57403 0 -0.19698 -0.0388 -0.39203 -0.11418 -0.57402 -0.07538 -0.18199 -0.18587 -0.34735 -0.32516 -0.48664 -0.13929 -0.13928 -0.30465 -0.24977 -0.48664 -0.32516 -0.18198 -0.07538 -0.37704 -0.11418 -0.57402 -0.11418s-0.39204 0.0388 -0.57403 0.11418c-0.18198 0.07539 -0.34734 0.18588 -0.48663 0.32516 -0.13929 0.13929 -0.24978 0.30465 -0.32516 0.48664 -0.07538 0.18199 -0.11418 0.37704 -0.11418 0.57402Z" stroke-width="1.5"></path></svg>
            Score:
        </div>
        <div className="bg-mygray-300 p-2 rounded-[8px] border-[2px] border-mygray-500">
            
            <div className="flex w-[100%] gap-1 mb-2">
                <input 
                    value={level}
                    onChange={(e) => setLevel(e.target.value ? Number(e.target.value) : "")} 
                    className="rounded-[8px] pl-2 h-[35px] w-[45%] border-[2px] border-mygray-500" 
                    type="number" 
                    placeholder="Nível"/>
                <button onClick={handleSelectImage} 
                    type="button" 
                    className="w-[45%] h-[35px] rounded-[8px] border-[2px] border-mygray-500 bg-mygray-200 font-bold hover:bg-white">
                    {image !== null ? "IMAGEM SELECIONADA" : "SELECIONAR IMAGEM"}
                </button>
                <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"/>
                <button onClick={() => setIsOpen(true)} type="button" className="bg-mygray-900 flex items-center justify-center h-[35px] w-[10%] rounded-[8px] hover:bg-mygray-600">
                    <img width={25} height={25} src="\src\assets\AddWhite.png" alt="" />
                </button>
            </div>
            <div className="bg-white rounded-[8px] border-[2px] border-mygray-500 p-1">
                <div className="min-h-[50px] max-h-[200px] overflow-y-auto w-[100%]">
                { props.list.length === 0 ? (
                            <p className="text-center text-gray-500 p-2 mt-1">Nenhuma descrição disponível.</p>
                        ): (
                            <ul>
                                {props.list.map((score, index) => (
                                    <li className="p-2 border-b flex first-letter:uppercase items-center justify-between">
                                        {score.level}
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

        {/* Modal */}
        {isOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-[8px] w-[50%] h-[50%]">
                    <div className="flex justify-between h-[10%] mb-3">
                        <div className="font-bold text-[18px] flex justify-center items-center w-[90%]">
                            <strong className="text-mygray-600 mr-1">SCORE {">"}</strong>INFORMAÇÕES ADICIONAIS
                        </div>
                        <button>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="bg-mygray-300 p-2 h-[70%] rounded-[8px] border-[2px] border-mygray-500">
                        <div className="flex w-[100%] gap-1 mb-1">
                            <input className="rounded-[8px] pl-2 h-[35px] w-[90%] border-[2px] border-mygray-500" type="text" placeholder="Descrição" />
                            <button className="bg-mygray-900 flex items-center justify-center h-[35px] w-[10%] rounded-[8px] hover:bg-mygray-600">
                                <img width={25} height={25} src="\src\assets\AddWhite.png" alt="" />
                            </button>
                        </div>
                        <div className="bg-white h-[80%] rounded-[8px] border-[2px] border-mygray-500 p-1">
                            <div className="h-[100%] overflow-y-auto w-[100%]">
                            { descriprion.length === 0 ? (
                                <p className="text-center text-gray-500 p-2 mt-1">Nenhuma descrição disponível.</p>
                                ): (
                                    <ul>
                                        {descriprion.map((desc, index) => (
                                            <li className="p-2 border-b flex first-letter:uppercase items-center justify-between">
                                                {desc}
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
                    <div className="h-[20%] flex justify-end items-center gap-4 *:font-bold *:py-1 *:px-10">
                        <button onClick={() => setIsOpen(false)} className="border-[2px] border-black rounded-[8px] hover:bg-mygray-600 hover:text-white">CANCELAR</button>
                        <button type="button" onClick={() => setIsOpen(false)} className="border-[2px] border-black bg-black rounded-[8px] text-white hover:bg-mygray-600">ADICIONAR</button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}