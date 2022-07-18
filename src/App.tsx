import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'material-icons/iconfont/material-icons.css';
import { BrowserRouter } from 'react-router-dom';
import './styles/tailwind.css';
import Header from './components/ui/Header';
import { SidebarContext } from './contexts/SidebarContext';
import useElementAsyncTransition from './hooks/useElementAsyncTransition';
import Sidebar from './components/ui/Sidebar';
import Router from './views/router';

const MyApp = () => {

  const sidebarState = useElementAsyncTransition(300)

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col scroll-smooth">
          <SidebarContext.Provider value={[sidebarState]}>
            <Header/>
            { sidebarState.Visible &&
              <Sidebar closing={sidebarState.Closing} onClose={sidebarState.Interaction}/>
            }
          </SidebarContext.Provider>
          <div className='mx-8 scroll-smooth'>
            <Router />    
          </div>
        </div>
      </BrowserRouter>
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

export default MyApp
