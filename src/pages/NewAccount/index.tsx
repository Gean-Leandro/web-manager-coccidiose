import { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { Notification } from "../../components/Notification";
import { AccountService, IAccount } from "../../services/accountService";
import { Link, useNavigate } from "react-router-dom";

export function NewAccount() {
    const [showNotification, setShowNotification] = useState<{active:boolean, mensage:string, bgColor:string}>(
        {active:false, mensage:"", bgColor:""}
    );
    const [accountItem, setAccountItem] = useState<IAccount>({uid: '', name: '', email:'', level:''});
    const [level, setLevel] = useState<string>('user');
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [erro, setErro] = useState<{campo: string, mensage: string}>({campo: '', mensage:''});
    const [password, setPassword] = useState<{password: string, confirmPassword: string}>({password:'', confirmPassword:''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(e.target.value);
    };

    useEffect(() => {
        document.title = "Criando nova conta";
    }, []);

    const validateFields = ():boolean => {
        if (accountItem.name !== '' && accountItem.email !== '' && password.password !== '' && password.confirmPassword !== "") {
            const nomeRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/.test(accountItem.name);
            const emailRegex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/.test(accountItem.email);
            
            if (!nomeRegex){
                setErro({campo: 'name', mensage: "Nome inválido"})
                return false;
            }
            
            if (!emailRegex){
                setErro({campo: 'email', mensage: "E-mail inválido"})
                return false;
            }
            
            if (password.password !== password.confirmPassword){
                setErro({campo: 'password', mensage: "Senha está diferente"})
                return false;
            } else if (password.password.length < 8) {
                setErro({campo: 'password', mensage: "Senha precisa de no mínimo 8 caracteres"})
                return false;
            }
            
            setErro({campo: '', mensage: ""})
            return true;
        } else {
            setShowNotification({
                active: true, 
                mensage: "Preencha todos os campos", 
                bgColor: "bg-orange-500"
            });
            return false;
        }
    }

    const navigate = useNavigate();
    
    const addNewAccount = async () => {
        if (validateFields()){
            try {
                await AccountService.new(accountItem.email, password.password, accountItem.name, level);
                navigate('/contas');
                setShowNotification({
                    active: true, 
                    mensage: "Nova conta cadastrada", 
                    bgColor: "bg-green-600"
                });
            } catch (error) {
                setShowNotification({
                    active: true, 
                    mensage: "Error:" + error, 
                    bgColor: "bg-orange-500"
                });
            }
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

        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar/>
            <div className="px-[15svh] overflow-y-auto">
                <div className="rounded-[8px] bg-mygray-300 flex items-center px-8 mt-5 h-[10svh] text-[25px]">
                    NOVA CONTA
                </div>

                <div className="flex items-center justify-start mt-[10%] mb-16">
                    <div className="bg-mygray-200 p-4 rounded-[8px] border-[2px] border-mygray-500">

                        {/* Campo Nome */}
                        <div className="mb-6 w-[100%]">
                            <p>Name:</p> 
                            <input className={`${erro.campo === "name" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px]  rounded-[8px] pl-2 h-[35px] w-[400px]`}
                            type="text" 
                            placeholder="Nome"
                            onChange={(e) => setAccountItem((prev) => ({...prev, name:e.target.value}))}
                            />
                            <p className={`${erro.campo === "name"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                        </div>
                        
                        {/* Campo E-mail */}
                        <div className="mb-6 w-[100%]">
                            <p>E-mail:</p> 
                            <input className={`${erro.campo == "email" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px] rounded-[8px] pl-2 h-[35px] w-[400px]`}
                            type="text" 
                            placeholder="E-mail"
                            onChange={(e) => setAccountItem((prev) => ({...prev, email:e.target.value}))}
                            />
                            <p className={`${erro.campo === "email"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                        </div>

                        {/* Campo Nivel */}
                        <div className="mb-6 w-[100%]">
                            <p>Nível:</p>
                            <div className="h-[45px] bg-mygray-200 flex items-center *:items-center rounded-[8px] px-2 gap-20">
                                <label className="flex gap-2">
                                    <input 
                                        onChange={handleChange}
                                        checked={level === "user"}
                                        type="radio" 
                                        name="category" 
                                        value={'user'}/>
                                    Usuário
                                </label>
                                <label className="flex gap-2">
                                    <input 
                                        onChange={handleChange}
                                        checked={level === "admin"}
                                        type="radio" 
                                        name="category" 
                                        value={'admin'}/>
                                    Administrador
                                </label>
                            </div>
                        </div>

                        {/* Campo senha */}
                        <div className="mb-4 w-[100%]">
                            <p>Senha</p> 
                            <input className={`${erro.campo == "password" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px] rounded-[8px] pl-2 h-[35px] w-[400px]`}
                            type="password" 
                            placeholder="Senha"
                            onChange={(e) => setPassword((prev) => ({...prev, password:e.target.value}))}
                            />
                            <p className={`${erro.campo === "password"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                        </div>

                        {/* Campo confirmar senha */}
                        <div className="w-[100%]">
                            <p>Confirmar senha</p> 
                            <input className={`${erro.campo == "password" ? 'border-red-600': 'border-mygray-500'} bg-white border-[2px] rounded-[8px] pl-2 h-[35px] w-[400px]`}
                            type="password" 
                            placeholder="Confirmar senha"
                            onChange={(e) => setPassword((prev) => ({...prev, confirmPassword:e.target.value}))}
                            />
                            <p className={`${erro.campo === "password"? '' : 'hidden'} text-red-600`}>{erro.mensage}</p>
                        </div>

                    </div>

                </div>
                
                <div className="col-span-6 flex justify-end gap-4 *:font-bold *:py-4 *:px-10">
                    <Link to={'/contas'} className="border-[2px] border-black rounded-[8px] hover:bg-mygray-600 hover:text-white">
                        CANCELAR
                    </Link>
                    <button type="button"
                        onClick={addNewAccount}
                        disabled={disableButton} 
                        className="bg-black rounded-[8px] text-white hover:bg-mygray-600">
                        CADASTRAR
                    </button>
                </div>
            </div>        
        </div>
        </>
    )
}