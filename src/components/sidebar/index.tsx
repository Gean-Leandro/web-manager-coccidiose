import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../../../firebaseConfig';

export function Sidebar(){
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/')
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
      };

    return(
        <div className="bg-mygray-800 text-white flex flex-col">
            <div className="h-[80%]">
                <div className="flex justify-center py-[44px]">
                    <img src="./src/assets/chicken_icon.svg" style={{width:86, height:102.53}}/>
                </div>

                <div className="grid grid-cols-1 mt-5 *:font-bold *:text-center *:text-[15px] *:py-3">
                    <Link to='/cadastros-eimerias' className="hover:bg-mygray-700 mx-1 rounded-[3px]">EIMERIAS</Link>
                    <Link to='/glossario' className="hover:bg-mygray-700 mx-1 rounded-[3px]">GLOSSÁRIO</Link>
                    <Link to='/nomes-cientificos' className="hover:bg-mygray-700 mx-1 rounded-[3px]">NOMES CIENTÍFICOS</Link>
                    <Link to='/referencias' className="hover:bg-mygray-700 mx-1 rounded-[3px]">REFERÊNCIAS</Link>
                    <Link to='/' className="hover:bg-mygray-700 mx-1 rounded-[3px]">PERFIL</Link>
                    <Link to='/contas' className="hover:bg-mygray-700 mx-1 rounded-[3px]">CONTAS</Link>
                </div>
            </div>
            <div className="h-[20%] flex items-end justify-center">
                <button type="button"
                    onClick={handleLogout} 
                    className="hover:bg-mygray-700 mb-5 mx-2 py-2 rounded-[3px] text-white font-bold text-center w-[100%]">
                    SAIR
                </button>
            </div>
        </div>
    )
}