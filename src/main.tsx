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
import PrivateRoute from './components/PivateRoute';
import { Profile } from './pages/Profile';

const router = createBrowserRouter([
  { path:'/', element: <Login/>},
  { path:'/cadastros-eimerias', element: <PrivateRoute><CadastrosEimeria/></PrivateRoute>},
  { path:'/nova-eimeria', element: <PrivateRoute><NewEimeria/></PrivateRoute>},
  { path:'/visualizar-eimeria', element: <PrivateRoute><ViewEimeria/></PrivateRoute>},
  { path:'/atualizar-eimeria', element: <PrivateRoute><UpdateEimeria/></PrivateRoute>},
  { path:'/glossario', element: <PrivateRoute><Glossary/></PrivateRoute>},
  { path:'/referencias', element: <PrivateRoute><References/></PrivateRoute>},
  { path:'/nomes-cientificos', element: <PrivateRoute><ScientificNames/></PrivateRoute>},
  { path:'/contas', element: <PrivateRoute><Accounts/></PrivateRoute>},
  { path:'/nova-conta', element: <PrivateRoute><NewAccount/></PrivateRoute>},
  { path:'/perfil', element: <PrivateRoute><Profile/></PrivateRoute>}
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
