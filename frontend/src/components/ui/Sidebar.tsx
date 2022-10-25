import { MouseEvent } from "react";
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition";
import SidebarGroupItemHeader from "./SidebarGroupItemHeader";
import SidebarItem from "./SidebarItem";
import {useNavigate, useLocation} from 'react-router-dom'

const Sidebar = ({ closing, onClose }: { closing: boolean, onClose: () => void }) => {

	const estudiantesItemState = useElementAsyncTransition(300)
	const docentesItemState = useElementAsyncTransition(300)
	const cargasItemState = useElementAsyncTransition(300)
	const comitesItemState = useElementAsyncTransition(300)
	const presentacionesItemState = useElementAsyncTransition(300)
	const proyectosItemState = useElementAsyncTransition(300)
	const adminItemState = useElementAsyncTransition(300)
	const navigate = useNavigate()
	const location = useLocation()

	const onSidebarClose = (event: MouseEvent) => {
		event.preventDefault();
		onClose()
	}

	const onSidebarItemClick = (link: string) => {
		navigate(link,{replace:true})
		console.log(location.pathname)
		onClose()
	}

	return (
		<div>
			<div onClick={onSidebarClose} className={` modal-background ${closing ? "opacity-0 bg-transparent closing-modal" : "opacity-50 bg-gray-900 opening-modal"}`}></div>

			<div className={`fixed top-8 transition-all duration-300 bg-gray-200 rounded-tr-xl rounded-br-xl z-50 flex flex-col w-52 h-[94vh] sm:h-[95.25vh] ${closing ? "-translate-x-52" : "opening-sidebar-body"}`}>
				<div className="flex flex-col overflow-y-auto p-4 divide-y-2 divide-gray-300">
					<SidebarItem isActive={false} icon="home" title="Principal" onClick={() => { onSidebarItemClick("/") }} />
					<SidebarItem isActive={false} icon="school" title="Estudiantes" onClick={estudiantesItemState.Interaction} />
					{estudiantesItemState.Visible &&
						<SidebarGroupItemHeader closing={estudiantesItemState.Closing}>
							<SidebarItem isActive={false} icon="school" title="Listado" onClick={() => { onSidebarItemClick("/estudiantes") }} />
							<SidebarItem isActive={false} icon="add" title="Añadir" onClick={() => { onSidebarItemClick("/estudiantes/registrar") }} />
						</SidebarGroupItemHeader>
					}
					<SidebarItem isActive={false} icon="person" title="Docentes" onClick={docentesItemState.Interaction} />
					{docentesItemState.Visible &&
						<SidebarGroupItemHeader closing={docentesItemState.Closing}>
							<SidebarItem isActive={false} icon="person" title="Listado" onClick={() => { onSidebarItemClick("/docentes") }} />
							<SidebarItem isActive={false} icon="person_add" title="Añadir" onClick={() => { onSidebarItemClick("/docentes/registrar") }} />
						</SidebarGroupItemHeader>
					}
					<SidebarItem isActive={false} icon="calendar_month" title="Cargas Académicas" onClick={cargasItemState.Interaction} />
					{cargasItemState.Visible &&
						<SidebarGroupItemHeader closing={cargasItemState.Closing}>
							<SidebarItem isActive={false} icon="calendar_month" title="Listado" onClick={() => { onSidebarItemClick("/cargas") }} />
							<SidebarItem isActive={false} icon="add" title="Añadir" onClick={() => { onSidebarItemClick("/cargas/registrar") }} />
							<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
						</SidebarGroupItemHeader>
					}
					<SidebarItem isActive={false} icon="badge" title="Comites Evaluadores" onClick={comitesItemState.Interaction} />
					{comitesItemState.Visible &&
						<SidebarGroupItemHeader closing={comitesItemState.Closing}>
							<SidebarItem isActive={false} icon="badge" title="Listado" onClick={() => { onSidebarItemClick("/comites") }} />
							<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
						</SidebarGroupItemHeader>
					}
					<SidebarItem isActive={false} icon="co_present" title="Presentaciones" onClick={presentacionesItemState.Interaction} />
					{presentacionesItemState.Visible &&
						<SidebarGroupItemHeader closing={presentacionesItemState.Closing}>
							<SidebarItem isActive={false} icon="co_present" title="Listado" onClick={() => { onSidebarItemClick("/presentaciones") }} />
							<SidebarItem isActive={false} icon="add" title="Añadir" onClick={() => { onSidebarItemClick("/presentaciones/registrar") }} />
							<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
						</SidebarGroupItemHeader>
					}
					<SidebarItem isActive={false} icon="book" title="Proyectos" onClick={proyectosItemState.Interaction} />
					{proyectosItemState.Visible &&
						<SidebarGroupItemHeader closing={proyectosItemState.Closing}>
							<SidebarItem isActive={false} icon="book" title="Listado" onClick={() => { onSidebarItemClick("/proyectos") }} />
							<SidebarItem isActive={false} icon="location_on" title="Comunidades abordadas" tiny={true} onClick={() => { onSidebarItemClick("/proyectos") }} />
							<SidebarItem isActive={false} icon="add" title="Añadir" onClick={() => { onSidebarItemClick("/") }} />
							<SidebarItem icon="picture_as_pdf" title="Generar PDF" tiny={true} />
						</SidebarGroupItemHeader>
					}
					<SidebarItem isActive={false} icon="description" title="Formatos" onClick={() => { onSidebarItemClick("/formatos") }} />
					<SidebarItem isActive={false} icon="settings" title="Administrativo" onClick={adminItemState.Interaction} />
					{adminItemState.Visible &&
						<SidebarGroupItemHeader closing={adminItemState.Closing}>
							<SidebarItem isActive={false} icon="school" title="PNF" onClick={() => { onSidebarItemClick("/admin/pnf") }} />
							<SidebarItem icon="backup" title="Respaldo" />
						</SidebarGroupItemHeader>
					}
				</div>
			</div>
		</div>
	)
}

export default Sidebar