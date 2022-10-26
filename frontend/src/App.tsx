import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/ui/Header"
import Sidebar from "./components/ui/Sidebar"
import { SidebarContext } from "./contexts/SidebarContext"
import useElementAsyncTransition from "./hooks/useElementAsyncTransition"
import * as p from "./pages"

function App() {
    const sidebarState = useElementAsyncTransition(300)

    return (
      <>
        <BrowserRouter>
        <div className="flex flex-col scroll-smooth">
          <SidebarContext.Provider value={sidebarState}>
            <Header/>
            { sidebarState.Visible &&
              <Sidebar closing={sidebarState.Closing} onClose={sidebarState.Interaction}/>
            }
          </SidebarContext.Provider>
          <div className='mx-8 scroll-smooth'>
              <Routes>
                <Route path="/" element={<p.MainPage/>}/>
                <Route path="/admin/pnf" element={<p.PNFPage/>}/>
                <Route path="/docentes">
                  <Route index element={<p.DocentesMain/>}/>                
                  <Route path="registrar" element={<p.AddDocente/>}/>
                  <Route path="modificar/:docenteId" element={<p.DocenteModificar/>}/>                
                </Route>
                <Route path="/cargas">
                  <Route index element={<p.CargasAcademicasMain/>}/>                
                  <Route path="registrar" element={<p.RegistrarCarga/>}/>
                  <Route path="modificar/:cargaId" element={<p.ModificarCarga/>}/>                
                </Route>
              </Routes>
          </div>
        </div> 
        </BrowserRouter>
      </>
    )
}

export default App
