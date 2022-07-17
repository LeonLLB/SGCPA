import { MouseEvent } from "react";
import {useNavigate, useLocation} from 'react-router-dom'
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition";
import SidebarGroupItemHeader from "./SidebarGroupItemHeader";
import SidebarItem from "./SidebarItem";

const Sidebar = ({closing, onClose}:{closing:boolean, onClose: ()=>void}) => {
	
	const estudiantesItemState = useElementAsyncTransition(300)
	const docentesItemState = useElementAsyncTransition(300)
	const cargasItemState = useElementAsyncTransition(300)
	const comitesItemState = useElementAsyncTransition(300)
	const presentacionesItemState = useElementAsyncTransition(300)
	const proyectosItemState = useElementAsyncTransition(300)
	const adminItemState = useElementAsyncTransition(300)

	const navigate = useNavigate()
	const path = useLocation()

	const onSidebarClose = (event:MouseEvent) => {
		event.preventDefault();
		onClose()
	}

	const onSidebarItemClick = (link : string) => {
    navigate(link,{replace:false})
    onClose()
  }
	
  return (
    <div>
			<div onClick={onSidebarClose} className={` modal-background ${closing? "opacity-0 bg-transparent closing-modal":"opacity-50 bg-gray-900 opening-modal"}`}></div>
			
			<div className={`fixed top-15 sm:top-11 transition-all duration-300 bg-gray-200 rounded-tr-xl rounded-br-xl z-50 flex flex-col w-52 h-[94vh] sm:h-[95.25vh] ${closing? "-translate-x-52":"opening-sidebar-body"}`}>
					<div className="flex flex-col overflow-y-auto p-4 divide-y-2 divide-gray-300">
            <SidebarItem isActive={path.pathname === '/'} icon="home" title="Principal" onClick={()=>{onSidebarItemClick("/")}}/>
						<SidebarItem isActive={path.pathname.includes('/estudiantes')} icon="school" title="Estudiantes" onClick={estudiantesItemState.Interaction}/>
						{	estudiantesItemState.Visible &&
							<SidebarGroupItemHeader closing={estudiantesItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/estudiantes'} icon="school" title="Listado" onClick={()=>{onSidebarItemClick("/estudiantes")}}/>
								<SidebarItem isActive={path.pathname === '/estudiantes/registrar'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/estudiantes/registrar")}}/>
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={path.pathname.includes('/docentes')} icon="person" title="Docentes" onClick={docentesItemState.Interaction}/>
						{	docentesItemState.Visible &&
							<SidebarGroupItemHeader closing={docentesItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/docentes'} icon="person" title="Listado" onClick={()=>{onSidebarItemClick("/docentes")}}/>
								<SidebarItem isActive={path.pathname === '/docentes/registrar'} icon="person_add" title="Añadir" onClick={()=>{onSidebarItemClick("/docentes/registrar")}}/>
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={path.pathname.includes('/cargas')} icon="calendar_month" title="Cargas Académicas" onClick={cargasItemState.Interaction}/>
						{	cargasItemState.Visible &&
							<SidebarGroupItemHeader closing={cargasItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/cargas'} icon="calendar_month" title="Listado" onClick={()=>{onSidebarItemClick("/cargas")}}/>
								<SidebarItem isActive={path.pathname === '/cargas/registrar'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/cargas/registrar")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={path.pathname.includes('/comites')} icon="badge" title="Comites Evaluadores" onClick={comitesItemState.Interaction}/>
						{	comitesItemState.Visible &&
							<SidebarGroupItemHeader closing={comitesItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/comites'} icon="badge" title="Listado" onClick={()=>{onSidebarItemClick("/comites")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={path.pathname.includes('/presentaciones')} icon="co_present" title="Presentaciones" onClick={presentacionesItemState.Interaction}/>
						{	presentacionesItemState.Visible &&
							<SidebarGroupItemHeader closing={presentacionesItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/presentaciones'} icon="co_present" title="Listado" onClick={()=>{onSidebarItemClick("/presentaciones")}}/>
								<SidebarItem isActive={path.pathname === '/presentaciones/registrar'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/presentaciones/registrar")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={path.pathname.includes('/proyectos')} icon="book" title="Proyectos" onClick={proyectosItemState.Interaction}/>
						{	proyectosItemState.Visible &&
							<SidebarGroupItemHeader closing={proyectosItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/proyectos'} icon="book" title="Listado" onClick={()=>{onSidebarItemClick("/proyectos")}}/>
								<SidebarItem isActive={path.pathname === '/proyectos/comunidades'} icon="location_on" title="Comunidades abordadas" tiny={true} onClick={()=>{onSidebarItemClick("/proyectos")}}/>
								<SidebarItem isActive={path.pathname === '/proyectos/añadir'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={path.pathname.includes('/formatos')} icon="description" title="Formatos" onClick={()=>{onSidebarItemClick("/formatos")}}/>
						<SidebarItem isActive={path.pathname.includes('/administrativo')} icon="settings" title="Administrativo" onClick={adminItemState.Interaction}/>
            {	adminItemState.Visible &&
							<SidebarGroupItemHeader closing={adminItemState.Closing}>
								<SidebarItem isActive={path.pathname === '/admin/pnf'} icon="school" title="PNF" onClick={()=>{onSidebarItemClick("/admin/pnf")}}/>
								<SidebarItem icon="backup" title="Respaldo"/>
							</SidebarGroupItemHeader>
						}
          </div>
			</div>
    </div>
  )
}

export default Sidebar