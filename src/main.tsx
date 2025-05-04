import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { Login } from './pages/Login';
import { CadastrosEimeria } from './pages/Eimeria';
import { NewEimeria } from './pages/NewEimeria';
import { ViewEimeria } from './pages/ViewEimeria';
import { UpdateEimeria } from './pages/UpdateEimeria';
import { Glossary } from './pages/Glossary';
import { References } from './pages/References';
import { ScientificNames } from './pages/ScientificNames';
import { Accounts } from './pages/Accounts';
import { NewAccount } from './pages/NewAccount';

const router = createBrowserRouter([
  { path:'/', element: <Login/>},
  { path:'/cadastros-eimerias', element: <CadastrosEimeria/>},
  { path:'/nova-eimeria', element: <NewEimeria/>},
  { path:'/visualizar-eimeria', element: <ViewEimeria/>},
  { path:'/atualizar-eimeria', element: <UpdateEimeria/>},
  { path:'/glossario', element: <Glossary/>},
  { path:'/referencias', element: <References/>},
  { path:'/nomes-cientificos', element: <ScientificNames/>},
  { path:'/contas', element: <Accounts/>},
  { path:'/nova-conta', element: <NewAccount/>}
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
