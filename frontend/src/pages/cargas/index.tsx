import { useState, useEffect, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import DiaSelect from "../../components/form/DiaSelect"
import DocentesSelect from "../../components/form/DocenteSelect"
import PNFSelect from "../../components/form/PNFSelect"
import TrayectoSelect from "../../components/form/TrayectoSelect"
import FormInput from "../../components/ui/FormInput"
import Modal from "../../components/ui/Modal"
import trayectoSwitch from "../../helpers/trayectoSwitch"
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition"
import useForm from "../../hooks/useForm"
import { database } from "../../../wailsjs/go/models"
import * as CargaController from "../../../wailsjs/go/database/Carga"
import cogoToast from "cogo-toast"
import { translateDbError } from "../../helpers/dbError"

const CargasAcademicasMain = () => {
  const navigate = useNavigate()

  const [listado, setListado] = useState<database.Carga[]>([])
  const [CargaId, setCargaId] = useState<number | null>(null)
  const confirmModalState = useElementAsyncTransition(200)

  const [Form, onInputChange, reset] = useForm({
    periodo: "",
    pnf: "",
    trayecto: "",
    docenteID: "",
    dia: "",
    CargasPorPagina: ""
  })

  useEffect(() => {
    filterCargas(true)
  }, [])

  const onCargaPreDelete = (event:MouseEvent,id:number) => {
		event.preventDefault()
		setCargaId(id)
		confirmModalState.Interaction()
	}

	const onCargaDelete = () => {
		const toast = cogoToast.loading('Eliminando carga...')
    CargaController.Delete(CargaId!)
    .then(result=>{
      toast.hide!()
        setCargaId(0)
        confirmModalState.Interaction()
        if (result['ok']) {
          reset()
          cogoToast.success('Carga eliminada con exito!')
          filterCargas(true)
          return
        }
        cogoToast.error(translateDbError(result['error']['Code']))
    })
	}

  const filterCargas = (clean: boolean = false) => {
    if(clean){
      CargaController.GetAll().then(setListado)
      return
    }
    //TODO Filtrado
    CargaController.GetAll().then(setListado)    
  }

  return (
    <>
      <div className="mt-5 flex flex-row items-center justify-center">
				<div className="w-full flex flex-col items-center space-y-4 justify-center">

					<h2>Listado de Cargas</h2>
          <span>Opciones de filtrado</span>
          <div className=' grid md:grid-cols-3 grid-cols-2 gap-2'>
            <FormInput 
              value={Form.periodo} 
              onInputChange={onInputChange}
              errors={null}
              name="periodo"
              label="Año"
              isCol={true}
              type="text"
            />
            <PNFSelect
              value={Form.pnf} 
              onInputChange={onInputChange}
              error={null}
              isCol={true}
              label="PNF"
              required={false}
            />
            <TrayectoSelect
              value={Form.trayecto}
              onInputChange={onInputChange}
              required={false}
              isCol={true}
              label="Trayecto"
              error={null}
            />
            <DocentesSelect
              value={Form.docenteID} 
              onInputChange={onInputChange}
              error={null}
              isCol={true}
              required={false}
            />            
            <DiaSelect
              onInputChange={onInputChange}
              value={Form.dia}
              error={null}
              label="Día"
              name="dia"
              required={false}
            />
            <div className="flex flex-row justify-evenly col-span-2 md:col-span-3">
              <button className='btn-info-primary' onClick={()=>{navigate('/cargas/registrar',{replace:true})}}>Añadir carga</button>
              <button className='btn-info-primary' onClick={()=>{reset();filterCargas(true)}}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={()=>{filterCargas()}}> Filtrar cargas </button>
            </div>
          </div>
          <div className='overflow-x-auto pb-2'>
            <table className="h-full text-center border-collapse border-2 border-gray-500">
              <thead>
                <tr>
                  <th className="td-pnf">Año</th>
                  <th className="td-pnf">PNF</th>
                  <th className="td-pnf">Trayecto</th>
                  <th className="td-pnf">Docente</th>
                  <th className="td-pnf">Horario</th>
                  <th className="td-pnf">Opciones</th>
                </tr>
              </thead>
              <tbody>							
                {	(listado !== null && listado.length > 0) && listado.map(carga=>
                  <tr key={carga.id}>
                    <td className="td-pnf">{carga.periodo}</td>
                    <td className="td-pnf">{carga.pnf}</td>
                    <td className="td-pnf font-serif"> {trayectoSwitch(carga.trayecto)}</td>
                    <td className="td-pnf">{carga.docente!.nombre} {carga.docente!.apellido}</td>
                    <td className="td-pnf">
                      <ul className="list-disc px-4">
                        <li>
                          {carga.horario1.split('T')[0]} {carga.horario1.split('T')[1].split('-')[0]} - {carga.horario1.split('T')[1].split('-')[1]}
                        </li>
                        { carga.horario2 &&
                          <li>
                            {carga.horario2!.split('T')[0]} {carga.horario2!.split('T')[1].split('-')[0]} - {carga.horario2!.split('T')[1].split('-')[1]}
                          </li>
                        }
                      </ul>
                    </td>
                    <td className="td-pnf font-semibold">
                      <button onClick={()=>{navigate(`/cargas/modificar/${carga.id}`,{replace:true})}}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                      <button onClick={(e)=>{onCargaPreDelete(e,carga.id!)}}>
                        <span className="material-icons text-3xl">delete</span>
                      </button>
                    </td>
                  </tr>	
                )}
              </tbody>
            </table>
          </div>
				</div>
			</div>
      { confirmModalState.Visible &&
        <Modal title="Confirmar eliminación" onClose={confirmModalState.Interaction} closing={confirmModalState.Closing}>
          <div className="flex flex-col space-y-2 items-center">
            
            <span className="material-icons text-6xl text-red-600">warning</span>

            <span className="text-red-600 w-96">Esta seguro de querer eliminar esta? Una vez eliminada no podra ser recuperada!</span>
              
            <div className="flex flex-row space-x-5 w-full justify-end">
              <button onClick={onCargaDelete} className="btn-danger-primary">Eliminar</button>
              <button onClick={confirmModalState.Interaction} className="btn-danger-secondary">Cancelar</button>	
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default CargasAcademicasMain
