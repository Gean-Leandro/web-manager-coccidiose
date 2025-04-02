import { useEffect } from "react";
import { Link } from "react-router-dom";
import './Eimeria.css';
import { Sidebar } from "../../components/sidebar";
import { ListSpecies } from "../../components/ListSpecies";



export function CadastrosEimeria(){
    useEffect(() => {
        document.title = "Cadastros de Eimerias "
    });

    const species = [
        {
        id:'1',
        name:'acervulina'
        },
        {
        id:'2',
        name:'maxima'
        },
        {
        id:'3',
        name:'tenella'
        },
        {
        id:'4',
        name:'brunetti'
        },
    ]

    return(
        <>
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar/>
            <div className="px-[15svh] overflow-y-auto">
                <div className="rounded-[8px] bg-mygray-300 flex items-center px-8 mt-5 h-[10svh] text-[25px]">
                    CADASTROS DE EIMERIAS
                </div>

                <div className="flex items-center justify-start mt-[10%]">
                    <ListSpecies list={species}/>
                </div>
            </div>        
        </div>
        </>
    )
}