import Head from 'next/head'

import 'material-icons/iconfont/material-icons.css';
import '../styles/tailwind.css';
import Header from '../components/ui/Header';
import { SidebarContext } from '../contexts/SidebarContext';
import useElementAsyncTransition from '../hooks/useElementAsyncTransition';
import Sidebar from '../components/ui/Sidebar';

export default function MyApp({ Component, pageProps }) {

  const sidebarState = useElementAsyncTransition(300)

  return (
      <div className="flex flex-col scroll-smooth"> 
        <Head>
          <title>Sistema de Gestión y Control de Proyectos Académicos - SGCPA UTDFT Bcas</title>
          {/* <link rel="shortcut icon" href="/LLB logo.svg" type="image/x-icon" /> */}
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
  )
}