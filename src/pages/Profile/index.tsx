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
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [login, setLogin] = useState<IAccount>({uid:'', name:'', email: '', level:''});
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<{oldPassword: string, password:string, confirmPassword:string}>({oldPassword: '', password:'', confirmPassword:''});
    const [editName, setEditName] = useState<boolean>(false);
    const [editPassword, setEditPassword] = useState<boolean>(false);
    const [erro, setErro] = useState<{campo: string, mensage: string}>({campo: '', mensage:''});

    useEffect(() => {
        document.title = "Perfil";
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const query = await AccountService.getAccount(uid);
                setLogin(query);
            } 
        })
        return () => {
            unsubscribe();
        };
    }, []);

    const validateFields = ():boolean => {

        if (editName) {

            if (name !== '') {
                const nomeRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/.test(name);
                
                if (!nomeRegex){
                    setErro({campo: 'name', mensage: "Nome inválido"})
                    return false;
                }
                
                setErro({campo: '', mensage: ""})
                return true;
            }
        } 

        if(editPassword) {
            if (password.password !== '' && password.confirmPassword !== "") {
                
                if (password.password !== password.confirmPassword){
                    setErro({campo: 'password', mensage: "Senha está diferente"})
                    return false;
                } else if (password.password.length < 8) {
                    setErro({campo: 'password', mensage: "Senha precisa de no mínimo 8 caracteres"})
                    return false;
                }
                
                setErro({campo: '', mensage: ""})
                return true;
            }
        }
        
        setShowNotification({
            active: true, 
            mensage: "Preencha todos os campos", 
            bgColor: "bg-orange-500"
        });
        return false;
    }

    const updateAccount = async () => {
        setDisableButton(true);
        if (validateFields()) {
            try {
                if(editName) {
                    setLogin((prev) => ({...prev, name: name}));
                    await AccountService.updateAccount(login);
                }
                if(editPassword) {
                    await AccountService.updatePasswordAccount(password.oldPassword, password.password);
                }

                const query = await AccountService.getAccount(login.uid);
                setLogin(query);
                setEditName(false);
                setEditPassword(false);
                setShowNotification({
                    active: true, 
                    mensage: "Dados atualizados", 
                    bgColor: "bg-green-600"
                });

            } catch (error) {
                setShowNotification({
                    active: true, 
                    mensage: "" + error, 
                    bgColor: "bg-orange-500"
                });
            }
        }
        setDisableButton(false);
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
                            
                            <div className="flex gap-4">
                                <p className={`${editName && 'hidden'} flex items-center h-[45px] w-[403px] bg-mygray-200 border-[2px] border-mygray-500 rounded-[8px] px-2`}>
                                    {login.name}
                                </p>
                                <input type="text" 
                                    className={`${!editName && 'hidden'} h-[45px] w-[403px] bg-mygray-200 border-[2px] border-mygray-500 rounded-[8px] px-2`}
                                    placeholder="Novo nome"
                                    onChange={(e) => setName(e.target.value)}/>
                                
                                <button type="button" onClick={() => setEditName(true)}
                                    className={`${editName && 'hidden'} hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px] p-2 border-[2px] border-white`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Pencil-1--Streamline-Ultimate" height="24" width="24"><desc>Pencil 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.19 1.81002c-0.3406 -0.33916 -0.7449 -0.60748 -1.1898 -0.78945 -0.4449 -0.181969 -0.9214 -0.273985 -1.402 -0.270731 -0.4806 0.003255 -0.9558 0.101715 -1.3982 0.289691 -0.4423 0.18798 -0.8431 0.46175 -1.179 0.80549L2.521 16.345 0.75 23.25l6.905 -1.771 14.5 -14.49998c0.3437 -0.33593 0.6175 -0.73665 0.8055 -1.17901 0.188 -0.44235 0.2864 -0.91756 0.2897 -1.39819 0.0032 -0.48063 -0.0888 -0.95713 -0.2707 -1.40199 -0.182 -0.44486 -0.4503 -0.84925 -0.7895 -1.18981Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m16.606 2.26001 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.512 4.354 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m2.521 16.345 5.139 5.129" stroke-width="1.5"></path></svg>
                                </button>
                            </div>
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

                            <div className={`${!editPassword && 'hidden'} bg-mygray-200 p-4 rounded-[8px] border-[2px] border-mygray-500 w-[420px]`}>
                                {/* Campo senha */}
                                <div className="mb-4 w-[100%]">
                                    <p>Senha antiga:</p> 
                                    <input className={`${erro.campo == "password" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px] rounded-[8px] pl-2 h-[45px] w-[100%]`}
                                    type="password" 
                                    placeholder="Senha"
                                    onChange={(e) => setPassword((prev) => ({...prev, oldPassword:e.target.value}))}
                                    />
                                    <p className={`${erro.campo === "password"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                                </div>

                                <div className="mb-4 w-[100%]">
                                    <p>Nova Senha:</p> 
                                    <input className={`${erro.campo == "password" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px] rounded-[8px] pl-2 h-[45px] w-[100%]`}
                                    type="password" 
                                    placeholder="Senha"
                                    onChange={(e) => setPassword((prev) => ({...prev, password:e.target.value}))}
                                    />
                                    <p className={`${erro.campo === "password"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                                </div>
                                {/* Campo confirmar senha */}
                                <div className="w-[100%]">
                                    <p>Confirmar senha:</p> 
                                    <input className={`${erro.campo == "password" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px] rounded-[8px] pl-2 h-[45px] w-[100%]`}
                                    type="password" 
                                    placeholder="Confirmar senha"
                                    onChange={(e) => setPassword((prev) => ({...prev, confirmPassword:e.target.value}))}
                                    />
                                    <p className={`${erro.campo === "password"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setEditPassword(true)} 
                                className={`${editPassword && 'hidden'} hover:bg-mygray-400 bg-mygray-900 text-white font-bold h-[50px] w-[250px] rounded-[8px]`} 
                                type="button">ALTERAR SENHA</button>
                        </div>
                    </div>
                </div>

                <div className={`${!editName && !editPassword && 'hidden'} my-12 col-span-6 flex justify-end gap-4 *:font-bold *:py-4 *:px-10`}>
                        <button type="button"
                            onClick={() => {
                                setEditName(false);
                                setEditPassword(false);
                            }} 
                            className="border-[2px] border-black rounded-[8px] hover:bg-mygray-600 hover:text-white">
                            CANCELAR
                        </button>
                        <button onClick={updateAccount} 
                        disabled={disableButton}
                            type="button" 
                            className="bg-black rounded-[8px] text-white hover:bg-mygray-600">
                            CADASTRAR
                        </button>
                </div>
            </div>        
        </div>
        </>
    )
}