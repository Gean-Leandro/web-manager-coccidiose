import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../components/sidebar";
import './NovaEimeria.css';



export function NovaEimeria(){
    useEffect(() => {
        document.title = "Nova Eimeria"
    });
    return(
        <>
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar/>
            <div className="px-[15svh] overflow-y-auto">
                <div className="rounded-[8px] bg-mygray-300 flex items-center px-8 mt-5 h-[10svh] text-[25px]">
                    CADASTRANDO NOVA EIMERIA
                </div>
                <form>
                <div className="grid grid-cols-6 gap-8 items-center justify-start mt-[10%] mb-5">
                    {/* Campo Nome */}
                    <div className="flex items-center col-span-4 gap-3">
                        Nome:
                        <input className="h-[45px] bg-mygray-200 border-mygray-400 border rounded-[8px] px-2" type="text" placeholder="Nome"/>
                    </div>

                    {/* Campo Imagem */}
                    <div className="flex items-center col-span-4 gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Picture-Double-Landscape--Streamline-Ultimate" height="24" width="24"><desc>Picture Double Landscape Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M18.75 5.25v-0.978c0.0015 -0.26409 -0.0491 -0.52588 -0.1488 -0.77042 -0.0998 -0.24454 -0.2467 -0.46704 -0.4324 -0.6548 -0.1857 -0.18776 -0.4066 -0.3371 -0.65 -0.4395 -0.2435 -0.1024 -0.5047 -0.15584 -0.7688 -0.15728H2.75003c-0.26409 0.00144 -0.52531 0.05488 -0.76874 0.15728 -0.24344 0.1024 -0.46432 0.25174 -0.65004 0.4395 -0.18572 0.18776 -0.332633 0.41026 -0.432359 0.6548 -0.099726 0.24454 -0.150309 0.50633 -0.148861 0.77042v9.456c-0.001448 0.2641 0.049135 0.5259 0.148861 0.7704 0.099726 0.2446 0.246639 0.4671 0.432359 0.6548 0.18572 0.1878 0.4066 0.3371 0.65004 0.4395 0.24343 0.1024 0.50465 0.1559 0.76874 0.1573" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m11.339 21.7499 4.439 -6.307c0.1304 -0.1863 0.3015 -0.3404 0.5003 -0.4508 0.1987 -0.1105 0.42 -0.1743 0.6471 -0.1866 0.227 -0.0123 0.4539 0.0271 0.6634 0.1154 0.2096 0.0882 0.3964 0.223 0.5462 0.394l4.938 5.643" stroke-width="1.5"></path><path stroke="#000000" d="M10.875 13.5c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M10.875 13.5c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.25 8.25H7c-0.55228 0 -1 0.44772 -1 1v11.5c0 0.5523 0.44772 1 1 1h15.25c0.5523 0 1 -0.4477 1 -1V9.25c0 -0.55228 -0.4477 -1 -1 -1Z" stroke-width="1.5"></path></svg>
                        Imagem da área de lesão:
                        <button className="h-[45px] bg-mygray-200 border-mygray-400 border 
                        rounded-[8px] font-bold px-8 hover:bg-mygray-400">
                            SELECIONAR
                        </button>
                    </div>

                    {/* Campo Categoria */}
                    <div className="flex items-center col-span-6 gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Move-To-Bottom--Streamline-Ultimate" height="24" width="24"><desc>Move To Bottom Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.75 0.748047h6V6.74805h-6V0.748047Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.75 10.498v-0.74995h1.5" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M2.25 14.248H0.75v-0.75" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M6.75 13.498v0.75h-1.5" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M2.25 23.248H0.75v-1.5" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M6.75 21.748v1.5h-1.5" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M5.25 9.74805h1.5v0.74995" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.75 18.748v-1.5h1.5" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M5.25 17.248h1.5v1.5" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m15 15.748 -3.75 3.75 3.75 3.75" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M11.25 19.5h4.5c1.9891 0 3.8968 -0.7902 5.3033 -2.1967C22.4598 15.8968 23.25 13.9891 23.25 12s-0.7902 -3.89678 -2.1967 -5.3033C19.6468 5.29018 17.7391 4.5 15.75 4.5h-4.5" stroke-width="1.5"></path></svg>
                        Categoria:
                        <div className="h-[45px] bg-mygray-200 border-mygray-400 border flex items-center *:items-center rounded-[8px] px-2 gap-8">
                            <label className="flex gap-2">
                                <input type="radio" name="Principais espécies" value={'Principais espécies'}/>
                                Principais espécies
                            </label>
                            <label className="flex gap-2">
                                <input type="radio" name="Principais espécies" value={'Principais espécies'}/>
                                Principais espécies
                            </label>
                            <label className="flex gap-2">
                                <input type="radio" name="Principais espécies" value={'Principais espécies'}/>
                                Principais espécies
                            </label>
                        </div>
                    </div>

                    {/* Campo Descrição geral */}
                    <div className="grid grid-cols-1 col-span-4 gap-3">
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Task-List-Approve--Streamline-Ultimate" height="24" width="24"><desc>Task List Approve Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M11.25 14.2612h5.25" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M11.25 18.7612h5.25" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M11.25 9.76123h5.25" stroke-width="1.5"></path><path stroke="#000000" d="M8.25 14.6362c-0.20711 0 -0.375 -0.1679 -0.375 -0.375s0.16789 -0.375 0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M8.25 14.6362c0.20711 0 0.375 -0.1679 0.375 -0.375s-0.16789 -0.375 -0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M8.25 19.1362c-0.20711 0 -0.375 -0.1679 -0.375 -0.375s0.16789 -0.375 0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M8.25 19.1362c0.20711 0 0.375 -0.1679 0.375 -0.375s-0.16789 -0.375 -0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M8.25 10.1362c-0.20711 0 -0.375 -0.16787 -0.375 -0.37497 0 -0.20711 0.16789 -0.375 0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M8.25 10.1362c0.20711 0 0.375 -0.16787 0.375 -0.37497 0 -0.20711 -0.16789 -0.375 -0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M15.75 4.5h3.75c0.3978 0 0.7794 0.15804 1.0607 0.43934S21 5.60218 21 6v15.75c0 0.3978 -0.158 0.7794 -0.4393 1.0607s-0.6629 0.4393 -1.0607 0.4393h-15c-0.39782 0 -0.77936 -0.158 -1.06066 -0.4393C3.15804 22.5294 3 22.1478 3 21.75V6c0 -0.39782 0.15804 -0.77936 0.43934 -1.06066C3.72064 4.65804 4.10218 4.5 4.5 4.5h3.75c0 -0.99456 0.39509 -1.94839 1.09835 -2.65165C10.0516 1.14509 11.0054 0.75 12 0.75c0.9946 0 1.9484 0.39509 2.6517 1.09835C15.3549 2.55161 15.75 3.50544 15.75 4.5Z" stroke-width="1.5"></path><path stroke="#000000" d="M12 4.51123c-0.2071 0 -0.375 -0.1679 -0.375 -0.375 0 -0.20711 0.1679 -0.375 0.375 -0.375" stroke-width="1.5"></path><path stroke="#000000" d="M12 4.51123c0.2071 0 0.375 -0.1679 0.375 -0.375 0 -0.20711 -0.1679 -0.375 -0.375 -0.375" stroke-width="1.5"></path></svg>
                            Desrição geral:
                        </div>
                        <div className="bg-mygray-300 p-2 rounded-[8px]">
                            <div className="bg-white rounded-[8px] p-2">
                                <input className="bg-mygray-300 rounded-l-[8px] pl-2 h-[31px] w-[230px] border-[1px] border-black" type="text" placeholder="Espécie" />
                                <button className="bg-mygray-900 text-white font-bold h-[31px] w-[100px] px-4 rounded-r-[8px]">BUSCAR</button>
                                <div className="h-[40svh] mt-5 overflow-y-auto w-[100%]">
                                    <ul>
                                        <li className="p-2 border-b flex capitalize items-center justify-between">
                                            Ola
                                            <div className="flex items-center gap-2 *:p-1">
                                                <button className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Pencil-1--Streamline-Ultimate" height="24" width="24"><desc>Pencil 1 Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M22.19 1.81002c-0.3406 -0.33916 -0.7449 -0.60748 -1.1898 -0.78945 -0.4449 -0.181969 -0.9214 -0.273985 -1.402 -0.270731 -0.4806 0.003255 -0.9558 0.101715 -1.3982 0.289691 -0.4423 0.18798 -0.8431 0.46175 -1.179 0.80549L2.521 16.345 0.75 23.25l6.905 -1.771 14.5 -14.49998c0.3437 -0.33593 0.6175 -0.73665 0.8055 -1.17901 0.188 -0.44235 0.2864 -0.91756 0.2897 -1.39819 0.0032 -0.48063 -0.0888 -0.95713 -0.2707 -1.40199 -0.182 -0.44486 -0.4503 -0.84925 -0.7895 -1.18981Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m16.606 2.26001 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.512 4.354 5.134 5.134" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m2.521 16.345 5.139 5.129" stroke-width="1.5"></path></svg>
                                                </button>
                                                <button className="hover:border-[2px] hover:border-mygray-400 hover:bg-mygray-300 rounded-[8px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Search-Circle--Streamline-Ultimate" height="24" width="24"><desc>Search Circle Streamline Icon: https://streamlinehq.com</desc><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M0.75 12c0 2.9837 1.18526 5.8452 3.29505 7.955C6.15483 22.0647 9.01631 23.25 12 23.25c2.9837 0 5.8452 -1.1853 7.955 -3.295 2.1097 -2.1098 3.295 -4.9713 3.295 -7.955 0 -2.98369 -1.1853 -5.84517 -3.295 -7.95495C17.8452 1.93526 14.9837 0.75 12 0.75c-2.98369 0 -5.84517 1.18526 -7.95495 3.29505C1.93526 6.15483 0.75 9.01631 0.75 12Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M6.75 11.125c0 1.1603 0.46094 2.2731 1.28141 3.0936 0.82047 0.8205 1.93327 1.2814 3.09359 1.2814 1.1603 0 2.2731 -0.4609 3.0936 -1.2814 0.8205 -0.8205 1.2814 -1.9333 1.2814 -3.0936 0 -1.16032 -0.4609 -2.27312 -1.2814 -3.09359C13.3981 7.21094 12.2853 6.75 11.125 6.75c-1.16032 0 -2.27312 0.46094 -3.09359 1.28141C7.21094 8.85188 6.75 9.96468 6.75 11.125Z" stroke-width="1.5"></path><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m14.219 14.218 3.031 3.032" stroke-width="1.5"></path></svg>
                                                </button>
                                            </div>
                                        </li>
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
                    </div>
                </div>
                </form>
            </div>        
        </div>
        </>
    )
}