import {FC, ReactNode} from 'react'

interface SidebarGroupItemHeaderProps {
    closing: boolean,
    children: ReactNode
}

const SidebarGroupItemHeader :FC<SidebarGroupItemHeaderProps> = ({children, closing}) => {
  return (
    <div className={`ml-6 mb-4 px-2 bg-gray-300 transition-all duration-300 ${closing ? "-translate-y-8 opacity-0" : "opening-sidebar-group"}`}>
        {children}
    </div>
  )
}

export default SidebarGroupItemHeader