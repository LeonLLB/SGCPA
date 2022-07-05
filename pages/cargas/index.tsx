import { useRouter } from "next/router"
import { useState, useEffect, MouseEvent } from "react"
import { toast } from "react-toastify"
import DiaSelect from "../../components/form/DiaSelect"
import DocentesSelect from "../../components/form/DocenteSelect"
import PNFSelect from "../../components/form/PNFSelect"
import TrayectoSelect from "../../components/form/TrayectoSelect"
import FormInput from "../../components/ui/FormInput"
import Modal from "../../components/ui/Modal"
import trayectoSwitch from "../../helpers/trayectoSwitch"
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition"
import useForm from "../../hooks/useForm"
import Carga from "../../interfaces/Carga"
import prisma from "../../prismaClient"

const CargasAcademicasMain = (props) => {
  const primerListado = props.listado

  const [listado, setListado] = useState<Carga[]>([])
  const router = useRouter()
  const [CargaId, setCargaId] = useState(null)
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
    if(primerListado !== null){
      setListado(primerListado)
    }
  }, [])

  const onCargaPreDelete = (event:MouseEvent,id:number) => {
		event.preventDefault()
		setCargaId(id)
		confirmModalState.Interaction()
	}

	const onCargaDelete = () => {
		const toastReference = toast.loading('Eliminando carga...')
    fetch('/api/cargas',{
			method:'DELETE',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({id:CargaId})
		})
		.then(res=>res.json())
		.then(res=>{
			if(res.isOk){
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
        filterCargas(true)
        reset()
      }
			else{
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
			}
			setCargaId(0)			
			confirmModalState.Interaction()
		})
	}

  const filterCargas = (clean: boolean = false) => {
    const URL = (clean === false) ?
    `/api/cargas?periodo=${Form.periodo}&pnf=${Form.pnf}&trayecto=${Form.trayecto}&docente=${Form.docenteID}&dia=${Form.dia}` :
    `/api/cargas?periodo=&pnf=&trayecto=&docente=&dia`;
    const toastReference = toast.loading('Filtrando cargas...')
		fetch(URL)
		.then(res=>res.json())
		.then(res=>{
			if(res.isOk){
        setListado(res.data)
        console.log(res.data)
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:'Operación culminada',type:'info',isLoading:false,autoClose:4000})
			}
			else{
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
			}
		})
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
              pnfList={(props.listadoPNF !== null && props.listadoPNF?.length > 0) ? props.listadoPNF : []}
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
              docenteList={(props.listadoDocentes !== null && props.listadoDocentes?.length > 0) ? props.listadoDocentes : []}
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
              <button className='btn-info-primary' onClick={()=>{router.push('/cargas/registrar')}}>Añadir carga</button>
              <button className='btn-info-primary' onClick={()=>{reset();filterCargas(true)}}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={()=>{filterCargas()}}> Filtrar cargas </button>
            </div>
          </div>
          <div className='overflow-x-auto xl:w-auto w-11/12 pb-2'>
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
                    <td className="td-pnf">{carga.docente.nombre} {carga.docente.apellido}</td>
                    <td className="td-pnf">
                      <ul className="list-disc px-4">
                        <li>
                          {carga.horario1.split('T')[0]} {carga.horario1.split('T')[1].split('-')[0]} - {carga.horario1.split('T')[1].split('-')[1]}
                        </li>
                        { carga.horario2 !== null &&
                          <li>
                            {carga.horario2.split('T')[0]} {carga.horario2.split('T')[1].split('-')[0]} - {carga.horario2.split('T')[1].split('-')[1]}
                          </li>
                        }
                      </ul>
                    </td>
                    <td className="td-pnf font-semibold">
                      <button onClick={(e)=>{router.push(`/cargas/modificar/${carga.id}`)}}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                      <button onClick={(e)=>{onCargaPreDelete(e,carga.id)}}>
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

export const getServerSideProps = async (context) =>{

  const ultimaCarga = await prisma.cargaAcademica.findFirst({
    orderBy:{
      periodo:'desc'
    },
    select:{
      periodo:true
    }
  })

  const listadoCargas = await prisma.cargaAcademica.findMany({
    include:{
      docente:true
    },
    where:{
      periodo:ultimaCarga.periodo
    }
  })
  const listadoDocentes = await prisma.docente.findMany()
  const listadoPNF = await prisma.pNF.findMany()
   return {
       props: {
        listado:listadoCargas,
        listadoDocentes,
        listadoPNF
        }
    }
}