import Head from 'next/head'

import 'material-icons/iconfont/material-icons.css';
import '../styles/tailwind.css';
import Header from '../components/ui/Header';
import { SidebarContext } from '../contexts/SidebarContext';
import useElementAsyncTransition from '../hooks/useElementAsyncTransition';
import Sidebar from '../components/ui/Sidebar';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function MyApp({ Component, pageProps }) {

  const sidebarState = useElementAsyncTransition(300)

  return (
    <>
      <div className="flex flex-col scroll-smooth"> 
        <Head>
          <title>Sistema de Gestión y Control de Proyectos Académicos - SGCPA UTDFT Bcas</title>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <SidebarContext.Provider value={[sidebarState]}>
          <Header/>
          { sidebarState.Visible &&
            <Sidebar closing={sidebarState.Closing} onClose={sidebarState.Interaction}/>
          }
        </SidebarContext.Provider>
        <div className='mx-8 scroll-smooth'>
          <Component {...pageProps} />    
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />    
    </>
  )
}