import { Link } from "react-router-dom"

export function Sidebar(){
    return(
        <div className="bg-mygray-800 text-white flex flex-col">
            
            <div className="h-[50svh]">
                <div className="flex justify-center py-[44px]">
                    <img src="./src/assets/chicken_icon.svg" style={{width:86, height:102.53}}/>
                </div>

                <div className="grid grid-cols-1 mt-5 *:font-bold *:text-center 
                *:text-[15px] *:py-3">
                    <Link to='/cadastros-eimerias' className="hover:bg-mygray-700 mx-1 rounded-[3px]">EIMERIAS</Link>
                    <Link to='/glossario' className="hover:bg-mygray-700 mx-1 rounded-[3px]">GLOSSÁRIO</Link>
                    <Link to='/' className="hover:bg-mygray-700 mx-1 rounded-[3px]">NOMES CIENTÍFICOS</Link>
                    <Link to='/' className="hover:bg-mygray-700 mx-1 rounded-[3px]">REFERÊNCIAS</Link>
                    <Link to='/' className="hover:bg-mygray-700 mx-1 rounded-[3px]">PERFIL</Link>
                    <Link to='/' className="hover:bg-mygray-700 mx-1 rounded-[3px]">CONTAS</Link>
                </div>
            </div>
            <div className="h-[50svh] flex items-end justify-center">
                <Link to='/' 
                className="hover:bg-mygray-700 mb-5 mx-2 py-2 rounded-[3px] 
                text-white font-bold text-center border-[1px] w-[100%]">
                    SAIR
                </Link>
            </div>
        </div>
    )
}