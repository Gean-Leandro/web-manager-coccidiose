import { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Notification } from '../../components/Notification';
import { AccountService } from '../../services/accountService';

export function Login() {
  useEffect(() => {
    document.title = "Gerenciador Mobile"
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sendEmail, setSendEmail] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);
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

  const forgotpassword = async () => {
    try {
      await AccountService.redefinientPassword(sendEmail);
      setSendEmail('');
      setForgotPasswordModal(false);
    } catch (error) {

    }
  }

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
                <button type='button' onClick={() => setForgotPasswordModal(true)} className='hover:text-mygray-600' >Esqueci a senha</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {forgotPasswordModal && (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[8px] w-[25%]">
              <div className="flex justify-between h-[10%] mb-3">
                  <div className="font-bold h-[24px] justify-center text-[18px] pl-8 flex items-center w-[90%]">
                      ESQUECI A SENHA
                  </div>
                  <button type="button" onClick={() => {
                          setForgotPasswordModal(false);
                          setSendEmail('');
                      }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 2.5L12 12M21.5 21.5L12 12M12 12L2.5 21.5L21.5 2.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </button>
              </div>

              <div className="text-center mt-10 mb-10">
                  Digite o E-mail da sua conta e clique em “Enviar” para receber um E-mail para redefinir a senha
                  <input className='mt-6 h-[45px] w-[100%] bg-mygray-200 border-[2px] border-mygray-500 rounded-[8px] px-2' 
                    type="email" onChange={(e) => setSendEmail(e.target.value)}
                    placeholder='E-mail'/>
              </div>


              
              <div className="h-[20%] flex justify-between items-center gap-4 *:font-bold *:py-1 *:px-10">
                  <button onClick={() => setForgotPasswordModal(false)} 
                      className="w-[300px] border-[2px] border-black rounded-[8px] hover:bg-mygray-600 hover:text-white">
                      CANCELAR
                  </button>
                  <button type="button" 
                      onClick={forgotpassword} 
                      className="w-[300px] border-[2px] border-black bg-black rounded-[8px] text-white hover:bg-mygray-600">
                      ENVIAR
                  </button>
              </div>
          </div>
      </div>
    )}
    </>
  )
}
