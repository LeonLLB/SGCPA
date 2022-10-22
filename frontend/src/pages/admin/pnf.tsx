import { ChangeEvent, MouseEvent, useState } from "react";
import FormInput from "../../components/ui/FormInput"
import Modal from "../../components/ui/Modal"
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition"
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";

const PNFMain = () => {

	const modalState = useElementAsyncTransition(200)
	const confirmModalState = useElementAsyncTransition(200)
	const [PNFID, setPNFID] = useState(0)

	const {Errors,isItValid, validate} = useValidate({
		pnf: {
			required:true,
		},
		codigo: {
			required:true,
			maxLength:3
		}
	  })

	const [Form, onInputChange,,changeForm] = useForm({
    	pnf: "",
		codigo:"",
  	},(e)=>{validate(e)})

	const onFormSubmit = (event: MouseEvent) => {
		event.preventDefault()
		if(isItValid()){
			
			return
		}
	}

	const onPNFChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		changeForm({
			pnf:event.target.value,
			codigo:event.target.value.split('').map((item,i)=>{if(i>2)return;else return item}).join('')
		})
	}

	const onPNFPreDelete = (event:MouseEvent,id:number) => {
		event.preventDefault()
		setPNFID(id)
		confirmModalState.Interaction()
	}

	const onPNFDelete = () => {
		
	}

	return (
		<>
			<div className="h-[95.25vh] flex flex-row items-center justify-center">
				<div className="flex flex-col items-center space-y-4 justify-center">

					<h2>Listado de Programas Nacionales de Formación</h2>
					<table className="w-full h-full text-center border-collapse border-2 border-gray-500">
						<thead>
							<tr>
								<th className="td-pnf">PNF</th>
								<th className="td-pnf">Proyectos inscritos</th>
								<th className="td-pnf">Código</th>
								<th className="td-pnf">Eliminar</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan={4} className="td-pnf"><button onClick={modalState.Interaction} className="px-4 py-2 bg-blue-400 duration-300 border-2 border-blue-500 transition-colors hover:bg-blue-600 hover:border-blue-400 rounded-lg">Añadir PNF</button></td>
							</tr>
							{/* {	(props.listado !== null && props.listado.length > 0) && props.listado.map(PNF=>
								<tr>
									<td className="td-pnf font-semibold">{PNF.nombre}</td>
									<td className="td-pnf font-semibold">0</td>
									<td className="td-pnf font-semibold">{PNF.codigo}</td>
									<td className="td-pnf font-semibold">
										<button onClick={(e)=>onPNFPreDelete(e,PNF.id)}>
											<span className="material-icons text-3xl">delete</span>
										</button>
									</td>
								</tr>	
							)} */}
						</tbody>
					</table>
				</div>
			</div>
			{	modalState.Visible &&
				<Modal title="Añadir PNF" onClose={modalState.Interaction} closing={modalState.Closing}>
					<div className="flex flex-col space-y-2">
						<form className="flex flex-col space-y-2">
							<FormInput
								value={Form.pnf}
								onInputChange={onPNFChange}
								onBlur={validate}
								errors={(Errors.pnf !== undefined || Errors.pnf !== null) ? Errors.pnf : null}
								name="pnf"
								label="PNF:"
								type="text"
							/>
							<FormInput
								value={Form.codigo}
								onInputChange={onInputChange}
								onBlur={validate}
								errors={(Errors.codigo !== undefined || Errors.codigo !== null) ? Errors.codigo : null}
								name="codigo"
								label="Código del PNF:"
								type="text"
							/>
						</form>
						<div className="flex flex-row space-x-5 w-full justify-end">
							<button onClick={onFormSubmit} className="btn-info-primary">Añadir</button>
							<button onClick={modalState.Interaction} className="btn-info-secondary">Cancelar</button>	
						</div>
					</div>
				</Modal>
				
			}
			{	confirmModalState.Visible &&
				<Modal title="Confirmar eliminación" onClose={confirmModalState.Interaction} closing={confirmModalState.Closing}>
					<div className="flex flex-col space-y-2 items-center">
						
						<span className="material-icons text-6xl text-red-600">warning</span>

						<span className="text-red-600 w-96">Esta seguro de querer eliminar esta carrera? Todos los proyectos relacionados con la misma permaneceran dentro de la base de datos.</span>
							
						<div className="flex flex-row space-x-5 w-full justify-end">
							<button onClick={onPNFDelete} className="btn-danger-primary">Eliminar</button>
							<button onClick={confirmModalState.Interaction} className="btn-danger-secondary">Cancelar</button>	
						</div>
					</div>
				</Modal>
				
			}
		</>
	)
}

export default PNFMain
