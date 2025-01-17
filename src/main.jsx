
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { ToastContainer } from 'react-toastify';


import './index.css'
import './main.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-tippy/dist/tippy.css';

createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer />
    <RouterProvider router={router}/>
  </>
)
