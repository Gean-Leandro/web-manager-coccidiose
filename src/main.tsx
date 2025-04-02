import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { Login } from './pages/Login';
import { CadastrosEimeria } from './pages/Eimeria';
import { NovaEimeria } from './pages/NovaEimeria';

const router = createBrowserRouter([
  { path:'/', element: <Login/>},
  { path:'/cadastros-eimerias', element: <CadastrosEimeria/>},
  { path:'/nova-eimeria', element: <NovaEimeria/>}
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
