import { useRouter } from "next/router"
import { useEffect, useState, MouseEvent } from "react"
import { toast } from "react-toastify"
import PNFSelect from "../../components/form/PNFSelect"
import TrayectoSelect from "../../components/form/TrayectoSelect"
import FormInput from "../../components/ui/FormInput"
import Modal from "../../components/ui/Modal"
import trayectoSwitch from "../../helpers/trayectoSwitch"
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition"
import useForm from "../../hooks/useForm"
import Presentacion from "../../interfaces/Presentacion"
import prisma from "../../prismaClient"

const PresentacionesMain = (props) => {
  const primerListado = props.listado
  const [listado, setListado] = useState<Presentacion[]>([])
  const router = useRouter()
  const [PresentacionId, setPresentacionId] = useState(null)
  const confirmModalState = useElementAsyncTransition(200)

  const [Form, onInputChange, reset] = useForm({
    periodo: "",
    pnf: "",
    trayecto: "",
    PresentacionesPorPagina: ""
  })

  useEffect(() => {
    if(primerListado !== null){
      setListado(primerListado)
    }
  }, [])

  const onPresentacionesPreDelete = (event:MouseEvent,id:number) => {
		event.preventDefault()
		setPresentacionId(id)
		confirmModalState.Interaction()
	}

	const onPresentacionesDelete = () => {
		const toastReference = toast.loading('Eliminando carga...')
    fetch('/api/cargas',{
			method:'DELETE',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({id:PresentacionId})
		})
		.then(res=>res.json())
		.then(res=>{
			if(res.isOk){
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
        filterPresentaciones(true)
        reset()
      }
			else{
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
			}
			setPresentacionId(0)			
			confirmModalState.Interaction()
		})
	}

  const filterPresentaciones = (clean: boolean = false) => {
    const URL = (clean === false) ?
    `/api/presentaciones?periodo=${Form.periodo}&pnf=${Form.pnf}&trayecto=${Form.trayecto}` :
    `/api/presentaciones?periodo=&pnf=&trayecto=`;
    const toastReference = toast.loading('Filtrando presentaciones...')
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

					<h2>Listado de Presentacioness</h2>
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
            <div className="flex flex-row justify-evenly col-span-2 md:col-span-3">
              <button className='btn-info-primary' onClick={()=>{router.push('/presentaciones/registrar')}}>Añadir presentación</button>
              <button className='btn-info-primary' onClick={()=>{reset();filterPresentaciones(true)}}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={()=>{filterPresentaciones()}}> Filtrar presentaciones </button>
            </div>
          </div>
          <div className='overflow-x-auto xl:w-auto w-11/12 pb-2'>
            <table className="h-full text-center border-collapse border-2 border-gray-500">
              <thead>
                <tr>
                  <th className="td-pnf">Año</th>
                  <th className="td-pnf">PNF</th>
                  <th className="td-pnf">Trayecto</th>
                  <th className="td-pnf">Fecha de predefensa</th>
                  <th className="td-pnf">Fecha de defensa</th>
                  <th className="td-pnf">Aula de presentación</th>
                  <th className="td-pnf">Opciones</th>
                </tr>
              </thead>
              <tbody>							
                {	(listado !== null && listado.length > 0) && listado.map(presentacion=>
                  <tr key={presentacion.id}>
                    <td className="td-pnf">{presentacion.periodo}</td>
                    <td className="td-pnf">{presentacion.pnf}</td>
                    <td className="td-pnf font-serif"> {trayectoSwitch(presentacion.trayecto)}</td>
                    <td className="td-pnf">
                      { presentacion.preDefensa !== null ?
                        `${presentacion.preDefensa.split('T')[0].split('-')[2]}/${presentacion.preDefensa.split('T')[0].split('-')[1]}/${presentacion.preDefensa.split('T')[0].split('-')[0]}` :
                        'No asignado'
                      }
                    </td>                    
                    <td className="td-pnf">
                      { presentacion.defensa !== null ?
                        `${presentacion.defensa.split('T')[0].split('-')[2]}/${presentacion.defensa.split('T')[0].split('-')[1]}/${presentacion.defensa.split('T')[0].split('-')[0]}` :
                        'No asignado'
                      }
                    </td>
                    <td className="td-pnf">{presentacion.aula ?? 'No asignado'}</td>               
                    <td className="td-pnf font-semibold">
                      <button onClick={(e)=>{router.push(`/presentaciones/modificar/${presentacion.id}`)}}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                      <button onClick={(e)=>{onPresentacionesPreDelete(e,presentacion.id)}}>
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

            <span className="text-red-600 w-96">Esta seguro de querer eliminar esta presentación? Una vez eliminada no podra ser recuperada!</span>
              
            <div className="flex flex-row space-x-5 w-full justify-end">
              <button onClick={onPresentacionesDelete} className="btn-danger-primary">Eliminar</button>
              <button onClick={confirmModalState.Interaction} className="btn-danger-secondary">Cancelar</button>	
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default PresentacionesMain

export const getServerSideProps = async (context) =>{

  const ultimaCarga = await prisma.cargaAcademica.findFirst({
    orderBy:{
      periodo:'desc'
    },
    select:{
      periodo:true
    }
  })

  const listadoPresentaciones = await prisma.defensa.findMany({
    orderBy:[
      {pnf:'desc'},
      {trayecto:'asc'}
    ],
    where:{
      periodo:ultimaCarga.periodo
    }
  })
  const listadoPNF = await prisma.pNF.findMany()
   return {
       props: {
        listado:listadoPresentaciones,
        listadoPNF
        }
    }
}