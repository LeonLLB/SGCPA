import { createContext } from "react"
import { ElementAsyncTransition } from "../hooks/useElementAsyncTransition"

const SidebarContext = createContext<ElementAsyncTransition>({} as any)

export {
    SidebarContext
}