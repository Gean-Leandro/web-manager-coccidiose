import { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Notification } from '../../components/Notification';

export function Login() {
  useEffect(() => {
    document.title = "Gerenciador Mobile"
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showNotification, setShowNotification] = useState<{active:boolean, mensage:string, bgColor:string}>(
    {active:false, mensage:"", bgColor:""}
  );

  const handleLogin = async () => {
    try {
      if (email !== "" && senha !== ""){
        await signInWithEmailAndPassword(auth, email, senha);
        navigate('/cadastros-eimerias');

      } else {
        setShowNotification({
          active: true, 
          mensage: "Preencha todos os campos", 
          bgColor: "bg-orange-500"
        })
      } 
    } catch (error) {
      setShowNotification({
        active: true, 
        mensage: "E-mail ou senha invalido", 
        bgColor: "bg-orange-500"
      })
    }
  };

  return (
    <>
    {showNotification.active && (
      <Notification
      message={showNotification.mensage}
      bgColor={showNotification.bgColor}
      onClose={() => setShowNotification({active: false, mensage:"", bgColor:""})}
      />
    )}

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
              <input className='pl-2 bg-mygray-200 text-black' 
                type="text" 
                onChange={(e) => setEmail(e.target.value)}
                name="email" id="email" placeholder='E-mail'/>
              <input className='pl-2 bg-mygray-200 text-black' 
                type="password" 
                onChange={(e) => setSenha(e.target.value)}
                name="password" id="senha" placeholder='Senha'/>

              
              <button 
                type='button'
                onClick={handleLogin}
                className='flex font-bold bg-white text-black hover:bg-mygray-800 hover:text-white items-center justify-center'>
                ENTRAR
              </button>

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
