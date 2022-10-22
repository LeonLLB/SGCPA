import Header from "./components/ui/Header"
import Sidebar from "./components/ui/Sidebar"
import { SidebarContext } from "./contexts/SidebarContext"
import useElementAsyncTransition from "./hooks/useElementAsyncTransition"

function App() {
    const sidebarState = useElementAsyncTransition(300)

    return (
      <>
        <div className="flex flex-col scroll-smooth">
          <SidebarContext.Provider value={sidebarState}>
            <Header/>
            { sidebarState.Visible &&
              <Sidebar closing={sidebarState.Closing} onClose={sidebarState.Interaction}/>
            }
          </SidebarContext.Provider>
          <div className='mx-8 scroll-smooth'>
            <p>Hidsadasadsss!</p>
            {/* <Component {...pageProps} />     */}
          </div>
        </div> 
      </>
    )
}

export default App
