import { useContext, MouseEvent } from "react"
import { SidebarContext } from "../../contexts/SidebarContext"


const Header = () => {

    const {Interaction} = useContext(SidebarContext)[0]

    const toggleSidebar = (event: MouseEvent) => {
        event.preventDefault()

        Interaction()
    }

  return (
    <header className="z-50 bg-blue-500 flex flex-row w-full">
        <button onClick={toggleSidebar}>
            <span className="material-icons text-4xl">menu</span>
        </button>
        <div className="flex flex-row w-full items-center justify-center">
            <h1 className="text-lg sm:text-xl text-center md:text-2xl">Sistema de Gestión y Control de Proyectos Académicos SGCPA</h1>
        </div>
    </header>
  )
}

export default Header