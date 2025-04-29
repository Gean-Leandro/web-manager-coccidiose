import { useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export function Login() {
  useEffect(() => {
    document.title = "Gerenciador Mobile"
  });

  return (
    <>
    <div className='bg-mygray-800'>

      <div className="flex justify-center items-center h-[100svh]">
        <div>
          <div className='flex justify-center'>
            <img src='/src/assets/chicken_icon.svg'/>
          </div>
          
          <div className='bg-mygray-900 text-white text-center py-5 px-12 rounded-[25px] mt-[31px]'>
            <p className='tracking-[0.65svh] pl-[0.7svh]'>Gerenciador WEB</p>
            <p className='font-bold uppercase'>Coccidiose Aviária APP</p>

            <div className='flex flex-col space-y-4 mt-[43px] *:h-[41px] *:rounded-[8px] *:w-[290px]'>
              <input className='pl-2 bg-mygray-200 text-black' type="text" name="E-MAIL" id="email" placeholder='E-mail'/>
              <input className='pl-2 bg-mygray-200 text-black' type="password" name="E-MAIL" id="senha" placeholder='Senha'/>
              <Link 
              to={'/cadastros-eimerias'} 
              className='flex font-bold bg-white text-black hover:bg-mygray-800 hover:text-white items-center justify-center'>
                ENTRAR
              </Link>

              <div className='flex justify-between *:underline'>
                <Link to={'/'} className='hover:text-mygray-600' >Criar conta</Link>
                <Link to={'/'} className='hover:text-mygray-600' >Esqueci a senha</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
