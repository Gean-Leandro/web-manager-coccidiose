import { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { Notification } from "../../components/Notification";
import { AccountService, IAccount } from "../../services/accountService";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export function Profile() {
    const [showNotification, setShowNotification] = useState<{active:boolean, mensage:string, bgColor:string}>(
        {active:false, mensage:"", bgColor:""}
    );
    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [login, setLogin] = useState<IAccount>({uid:'', name:'Test', email: 'test@test.com', level:'user'});

    useEffect(() => {
        document.title = "Perfil";
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const query = await AccountService.getAccountLevel(uid);
                // setLogin(query);
            } 
        })
        return () => {
            unsubscribe();
        };
    }, []);

    return(
        <>
        {showNotification.active && (
            <Notification
            message={showNotification.mensage}
            bgColor={showNotification.bgColor}
            onClose={() => setShowNotification({active: false, mensage:"", bgColor:""})}
            />
        )}

        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar levelAccount={login.level}/>
            <div className="px-[15svh] overflow-y-auto">
                <div className="rounded-[8px] bg-mygray-300 flex items-center px-8 mt-5 h-[10svh] text-[25px]">
                    PERFIL
                </div>

                <div className="flex items-center justify-start mt-[10%]">
                    <div className="gap-10">
                        {/* Campo Nome */}
                        <div className="w-[100%] mb-5">
                            <p className="mb-2">Nome:</p>
                            <p className="flex items-center h-[45px] w-[403px] bg-mygray-200 border-[2px] border-mygray-500 rounded-[8px] px-2">
                                {login.name}
                            </p>
                            {/* <button type="button" onClick={() =>{}}
                                className="bg-mygray-900 text-white font-bold h-[35px] w-[100px]  rounded-r-[8px]">
                                ALTERAR SENHA
                            </button> */}
                        </div>
                        
                        {/* Campo Email */}
                        <div className="w-[100%] mb-5">
                            <p className="mb-2">E-mail:</p>
                            <p className="flex items-center h-[45px] w-[403px] bg-mygray-200 border-[2px] border-mygray-500 rounded-[8px] px-2">
                                {login.email}
                            </p>
                        </div>
                        {/* Campo Nível */}
                        <div className="w-[100%] mb-5">
                            <p className="mb-2">Nível:</p>
                            <p className="flex items-center h-[45px] w-[403px] bg-mygray-200 border-[2px] border-mygray-500 rounded-[8px] px-2">
                                {login.level == "admin" ? "Administrador" : "Usuário"}
                            </p>
                        </div>
                        {/* Campo Senha */}
                        <div className="w-[100%]">
                            <p className="mb-2">Senha:</p>
                            <button className="bg-mygray-900 text-white font-bold h-[50px] w-[50%] rounded-[8px]" 
                                type="button">ALTERAR SENHA</button>
                        </div>
                    </div>
                </div>
            </div>        
        </div>

        {confirmModal && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-[8px] w-[25%]">
                    <div className="flex justify-between h-[10%] mb-3">
                        <div className="font-bold h-[24px] justify-center text-[18px] pl-8 flex items-center w-[90%]">
                            CONFIRMAÇÃO
                        </div>
                        <button type="button" onClick={() => {
                                setConfirmModal(false);
                            }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className="text-center mb-10">
                        <div className="flex mt-[50px] mb-4 items-center justify-center">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_514_1034)">
                                    <path d="M41.625 2H18.375L1.875 18.25V41.7501L18.375 58.0001H41.625L58.125 41.7501V18.25L41.625 2Z" stroke="#F97316" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M29.875 46.25C31.946 46.25 33.625 44.5712 33.625 42.5C33.625 40.429 31.946 38.75 29.875 38.75C27.8038 38.75 26.125 40.429 26.125 42.5C26.125 44.5712 27.8038 46.25 29.875 46.25Z" stroke="#F97316" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M34.875 17.5C34.875 20.25 29.875 31.25 29.875 31.25C29.875 31.25 24.8749 20.25 24.8749 17.5C24.8749 14.75 27.125 12.5 29.875 12.5C32.625 12.5 34.875 14.75 34.875 17.5Z" stroke="#F97316" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_514_1034">
                                        <rect width="60" height="60" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        Deseja excluir essa conta?
                    </div>
                    
                    <div className="h-[20%] flex justify-between items-center gap-4 *:font-bold *:py-1 *:px-10">
                        <button onClick={() => {
                                setConfirmModal(false);
                            }} 
                            className="w-[300px] border-[2px] border-black rounded-[8px] hover:bg-mygray-600 hover:text-white">
                            CANCELAR
                        </button>
                        <button type="button"
                            disabled={disableButton}
                            className="w-[300px] border-[2px] border-black bg-black rounded-[8px] text-white hover:bg-mygray-600">
                            EXCLUIR
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}