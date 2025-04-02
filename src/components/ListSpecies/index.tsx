import { Link } from "react-router-dom"

interface ListSpeciesProps{
    list: Array<{
        id:string,
        name:string
    }>
}

export function ListSpecies(listSpeciesProps:ListSpeciesProps) {
    return(
        <div className="bg-mygray-300 p-2 rounded-[8px]">
            <div className="bg-white rounded-[8px] p-2">
                <input className="bg-mygray-300 rounded-l-[8px] pl-2 h-[31px] w-[230px] border-[1px] border-black" type="text" placeholder="Espécie" />
                <button className="bg-mygray-900 text-white font-bold h-[31px] w-[100px] px-4 rounded-r-[8px]">BUSCAR</button>
                <div className="h-[40svh] mt-5 overflow-y-auto w-[100%]">
                    <ul>
                        { listSpeciesProps.list.map((specie) => (
                            <li className="p-2 border-b flex capitalize items-center justify-between">
                            {specie.name}
                            <div className="flex items-center gap-2 *:p-1">
                                <button className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Pencil-1--Streamline-Ultimate" height="24" width="24"><desc>Pencil 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.19 1.81002c-0.3406 -0.33916 -0.7449 -0.60748 -1.1898 -0.78945 -0.4449 -0.181969 -0.9214 -0.273985 -1.402 -0.270731 -0.4806 0.003255 -0.9558 0.101715 -1.3982 0.289691 -0.4423 0.18798 -0.8431 0.46175 -1.179 0.80549L2.521 16.345 0.75 23.25l6.905 -1.771 14.5 -14.49998c0.3437 -0.33593 0.6175 -0.73665 0.8055 -1.17901 0.188 -0.44235 0.2864 -0.91756 0.2897 -1.39819 0.0032 -0.48063 -0.0888 -0.95713 -0.2707 -1.40199 -0.182 -0.44486 -0.4503 -0.84925 -0.7895 -1.18981Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m16.606 2.26001 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.512 4.354 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m2.521 16.345 5.139 5.129" stroke-width="1.5"></path></svg>
                                </button>
                                <button className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Search-Circle--Streamline-Ultimate" height="24" width="24"><desc>Search Circle Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.75 12c0 2.9837 1.18526 5.8452 3.29505 7.955C6.15483 22.0647 9.01631 23.25 12 23.25c2.9837 0 5.8452 -1.1853 7.955 -3.295 2.1097 -2.1098 3.295 -4.9713 3.295 -7.955 0 -2.98369 -1.1853 -5.84517 -3.295 -7.95495C17.8452 1.93526 14.9837 0.75 12 0.75c-2.98369 0 -5.84517 1.18526 -7.95495 3.29505C1.93526 6.15483 0.75 9.01631 0.75 12Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M6.75 11.125c0 1.1603 0.46094 2.2731 1.28141 3.0936 0.82047 0.8205 1.93327 1.2814 3.09359 1.2814 1.1603 0 2.2731 -0.4609 3.0936 -1.2814 0.8205 -0.8205 1.2814 -1.9333 1.2814 -3.0936 0 -1.16032 -0.4609 -2.27312 -1.2814 -3.09359C13.3981 7.21094 12.2853 6.75 11.125 6.75c-1.16032 0 -2.27312 0.46094 -3.09359 1.28141C7.21094 8.85188 6.75 9.96468 6.75 11.125Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.219 14.218 3.031 3.032" stroke-width="1.5"></path></svg>
                                </button>
                            </div>
                        </li>
                        )) }
                    </ul>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <Link to={'/nova-eimeria'} className="border-[1px] flex gap-2 border-black rounded-[8px] py-2 px-4 font-bold hover:bg-white">
                    CADASTRAR 
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 1C13.5 0.447715 13.0523 0 12.5 0C11.9477 0 11.5 0.447715 11.5 1H13.5ZM11.5 22.2789C11.5 22.8312 11.9477 23.2789 12.5 23.2789C13.0523 23.2789 13.5 22.8312 13.5 22.2789H11.5ZM1 10.6395C0.447715 10.6395 0 11.0872 0 11.6395C0 12.1917 0.447715 12.6395 1 12.6395V10.6395ZM24 12.6395C24.5523 12.6395 25 12.1917 25 11.6395C25 11.0872 24.5523 10.6395 24 10.6395V12.6395ZM11.5 1V11.6395H13.5V1H11.5ZM11.5 11.6395V22.2789H13.5V11.6395H11.5ZM12.5 10.6395H1V12.6395H12.5V10.6395ZM1 12.6395H23.2581V10.6395H1V12.6395ZM23.2581 12.6395H23.629V10.6395H23.2581V12.6395ZM23.629 12.6395H24V10.6395H23.629V12.6395Z" fill="black"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}