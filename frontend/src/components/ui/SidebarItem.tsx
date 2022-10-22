import { FC, MouseEvent } from "react";

interface sidebarItemProps {
    icon: string,
    title: string,
    onClick?: ()=>void
    tiny?: boolean
    isActive?: boolean
}

const SidebarItem: FC<sidebarItemProps> = ({icon, title, onClick = () => {},tiny,isActive=false}) => {
  
  const onItemClick = (event:MouseEvent) => {
    event.preventDefault()
    onClick()
  }
  
  return (
    <span onClick={onItemClick} className={`flex cursor-pointer py-4 flex-row items-center text-right justify-between ${isActive?"text-blue-400":""}`}>
        <span className="material-icons">{icon}</span>
        <span className={(title.length < 12 && tiny === false ?"text-lg": (tiny ? 'text-sm' : '') )}>{title}</span>
    </span>
  )
}

export default SidebarItem