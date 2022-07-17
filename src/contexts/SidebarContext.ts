import { createContext } from "react"

const SidebarContext = createContext<[{Visible:boolean, Closing:boolean, Interaction: ()=>void}]>([{Visible:false,Closing:false,Interaction:()=>{}}])

export {
    SidebarContext
}