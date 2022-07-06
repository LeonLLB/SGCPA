import { MouseEvent } from "react";
import { useRouter } from 'next/router'
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition";
import SidebarGroupItemHeader from "./SidebarGroupItemHeader";
import SidebarItem from "./SidebarItem";

const Sidebar = ({closing, onClose}) => {
	
	const estudiantesItemState = useElementAsyncTransition(300)
	const docentesItemState = useElementAsyncTransition(300)
	const cargasItemState = useElementAsyncTransition(300)
	const comitesItemState = useElementAsyncTransition(300)
	const presentacionesItemState = useElementAsyncTransition(300)
	const proyectosItemState = useElementAsyncTransition(300)
	const adminItemState = useElementAsyncTransition(300)

  const router = useRouter()

	const onSidebarClose = (event:MouseEvent) => {
		event.preventDefault();
		onClose()
	}

	const onSidebarItemClick = (link : string) => {
    router.push(link)
    onClose()
  }
	
  return (
    <div>
			<div onClick={onSidebarClose} className={` modal-background ${closing? "opacity-0 bg-transparent closing-modal":"opacity-50 bg-gray-900 opening-modal"}`}></div>
			
			<div className={`fixed top-15 sm:top-11 transition-all duration-300 bg-gray-200 rounded-tr-xl rounded-br-xl z-50 flex flex-col w-52 h-[94vh] sm:h-[95.25vh] ${closing? "-translate-x-52":"opening-sidebar-body"}`}>
					<div className="flex flex-col overflow-y-auto p-4 divide-y-2 divide-gray-300">
            <SidebarItem isActive={router.asPath === '/'} icon="home" title="Principal" onClick={()=>{onSidebarItemClick("/")}}/>
						<SidebarItem isActive={router.asPath.includes('/estudiantes')} icon="school" title="Estudiantes" onClick={estudiantesItemState.Interaction}/>
						{	estudiantesItemState.Visible &&
							<SidebarGroupItemHeader closing={estudiantesItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/estudiantes'} icon="school" title="Listado" onClick={()=>{onSidebarItemClick("/estudiantes")}}/>
								<SidebarItem isActive={router.asPath === '/estudiantes/registrar'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/estudiantes/registrar")}}/>
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={router.asPath.includes('/docentes')} icon="person" title="Docentes" onClick={docentesItemState.Interaction}/>
						{	docentesItemState.Visible &&
							<SidebarGroupItemHeader closing={docentesItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/docentes'} icon="person" title="Listado" onClick={()=>{onSidebarItemClick("/docentes")}}/>
								<SidebarItem isActive={router.asPath === '/docentes/registrar'} icon="person_add" title="Añadir" onClick={()=>{onSidebarItemClick("/docentes/registrar")}}/>
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={router.asPath.includes('/cargas')} icon="calendar_month" title="Cargas Académicas" onClick={cargasItemState.Interaction}/>
						{	cargasItemState.Visible &&
							<SidebarGroupItemHeader closing={cargasItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/cargas'} icon="calendar_month" title="Listado" onClick={()=>{onSidebarItemClick("/cargas")}}/>
								<SidebarItem isActive={router.asPath === '/cargas/registrar'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/cargas/registrar")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={router.asPath.includes('/comites')} icon="badge" title="Comites Evaluadores" onClick={comitesItemState.Interaction}/>
						{	comitesItemState.Visible &&
							<SidebarGroupItemHeader closing={comitesItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/comites'} icon="badge" title="Listado" onClick={()=>{onSidebarItemClick("/comites")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={router.asPath.includes('/presentaciones')} icon="co_present" title="Presentaciones" onClick={presentacionesItemState.Interaction}/>
						{	presentacionesItemState.Visible &&
							<SidebarGroupItemHeader closing={presentacionesItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/presentaciones'} icon="co_present" title="Listado" onClick={()=>{onSidebarItemClick("/presentaciones")}}/>
								<SidebarItem isActive={router.asPath === '/presentaciones/registrar'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/presentaciones/registrar")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={router.asPath.includes('/proyectos')} icon="book" title="Proyectos" onClick={proyectosItemState.Interaction}/>
						{	proyectosItemState.Visible &&
							<SidebarGroupItemHeader closing={proyectosItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/proyectos'} icon="book" title="Listado" onClick={()=>{onSidebarItemClick("/proyectos")}}/>
								<SidebarItem isActive={router.asPath === '/proyectos/comunidades'} icon="location_on" title="Comunidades abordadas" tiny={true} onClick={()=>{onSidebarItemClick("/proyectos")}}/>
								<SidebarItem isActive={router.asPath === '/proyectos/añadir'} icon="add" title="Añadir" onClick={()=>{onSidebarItemClick("/")}}/>
								<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
							</SidebarGroupItemHeader>
						}
						<SidebarItem isActive={router.asPath.includes('/formatos')} icon="description" title="Formatos" onClick={()=>{onSidebarItemClick("/formatos")}}/>
						<SidebarItem isActive={router.asPath.includes('/administrativo')} icon="settings" title="Administrativo" onClick={adminItemState.Interaction}/>
            {	adminItemState.Visible &&
							<SidebarGroupItemHeader closing={adminItemState.Closing}>
								<SidebarItem isActive={router.asPath === '/admin/pnf'} icon="school" title="PNF" onClick={()=>{onSidebarItemClick("/admin/pnf")}}/>
								<SidebarItem icon="backup" title="Respaldo"/>
							</SidebarGroupItemHeader>
						}
          </div>
			</div>
    </div>
  )
}

export default Sidebar