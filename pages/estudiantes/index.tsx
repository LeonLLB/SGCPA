import { useRouter } from 'next/router'
import {useEffect, useState, MouseEvent} from 'react'
import { toast } from 'react-toastify'
import PNFSelect from '../../components/form/PNFSelect'
import TrayectoSelect from '../../components/form/TrayectoSelect'
import FormInput from '../../components/ui/FormInput'
import Modal from '../../components/ui/Modal'
import trayectoSwitch from '../../helpers/trayectoSwitch'
import useElementAsyncTransition from '../../hooks/useElementAsyncTransition'
import useForm from '../../hooks/useForm'
import Estudiante from '../../interfaces/Estudiante'
import prisma from "../../prismaClient"

const EstudiantesMain = (props) => {
  const primerListado = props.listado

  const [listado, setListado] = useState<Estudiante[]>([])
  const router = useRouter()
  const [EstudianteId, setEstudianteId] = useState(null)
  const confirmModalState = useElementAsyncTransition(200)

  const [Form, onInputChange, reset] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
    pnf: "",
    trayecto: "",
    estudiantesPorPagina: ""
  })

  useEffect(() => {
    if(primerListado !== null){
      setListado(primerListado)
    }
  }, [])

  const onEstudiantePreDelete = (event:MouseEvent,id:number) => {
		event.preventDefault()
		setEstudianteId(id)
		confirmModalState.Interaction()
	}

	const onEstudianteDelete = () => {
		const toastReference = toast.loading('Eliminando Estudiante...')
    fetch('/api/estudiantes',{
			method:'DELETE',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({id:EstudianteId})
		})
		.then(res=>res.json())
		.then(res=>{
			if(res.isOk){
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
        filterEstudiantes(true)
        reset()
      }
			else{
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
			}
			setEstudianteId(0)			
			confirmModalState.Interaction()
		})
	}

  const filterEstudiantes = (clean: boolean = false) => {
    const URL = (clean === false) ?
    `/api/estudiantes?nombre=${Form.nombre}&apellido=${Form.apellido}&ci=${Form.cedula}&correo=${Form.correo}&tlf=${Form.telefono}&direccion=${Form.direccion}&pnf=${Form.pnf}&tra=${Form.trayecto}` :
    `/api/estudiantes?nombre=&apellido=&ci=&correo=&tlf=&direccion=&pnf=&tra=`;
    const toastReference = toast.loading('Filtrando estudiantes...')
		fetch(URL)
		.then(res=>res.json())
		.then(res=>{
			if(res.isOk){
        setListado(res.data)
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

					<h2>Listado de Estudiantes</h2>
          <span>Opciones de filtrado</span>
          <div className=' grid md:grid-cols-3 grid-cols-2 gap-2'>
            <FormInput 
              value={Form.nombre} 
              onInputChange={onInputChange}
              errors={null}
              name="nombre"
              label="Nombre"
              isCol={true}
              type="text"
            />
            <FormInput 
              value={Form.apellido} 
              onInputChange={onInputChange}
              errors={null}
              name="apellido"
              label="Apellido"
              isCol={true}
              type="text"
            />
            <FormInput 
              value={Form.cedula} 
              onInputChange={onInputChange}
              errors={null}
              name="cedula"
              label="Cedula"
              isCol={true}
              type="text"
            />
            <FormInput 
              value={Form.correo} 
              onInputChange={onInputChange}
              errors={null}
              name="correo"
              label="Correo electronico"
              isCol={true}
              type="email"
            />
            <FormInput 
              value={Form.telefono} 
              onInputChange={onInputChange}
              errors={null}
              name="telefono"
              label="Telefono"
              isCol={true}
              type="text"
            />
            <FormInput 
              value={Form.direccion} 
              onInputChange={onInputChange}
              errors={null}
              name="direccion"
              label="Dirección"
              isCol={true}
              type="text"
            />
            <PNFSelect
              value={Form.pnf}
              onInputChange={onInputChange}
              required={false}
              error={null}
              isCol={true}
              label="PNF"
              pnfList={(props.listadoPNF !== null && props.listadoPNF?.length > 0) ? props.listadoPNF : []}
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
              <button className='btn-info-primary' onClick={()=>{router.push('/estudiantes/registrar')}}>Añadir estudiante</button>
              <button className='btn-info-primary' onClick={()=>{reset();filterEstudiantes(true)}}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={()=>{filterEstudiantes()}}> Filtrar estudiantes </button>
            </div>
          </div>
          <div className='overflow-x-auto xl:w-auto w-11/12 pb-2'>
            <table className="h-full text-center border-collapse border-2 border-gray-500">
              <thead>
                <tr>
                  <th className="td-pnf">Nombre</th>
                  <th className="td-pnf">Apellido</th>
                  <th className="td-pnf">C.I</th>
                  <th className="td-pnf">Correo</th>
                  <th className="td-pnf">Telefono</th>
                  <th className="td-pnf">Dirección</th>
                  <th className="td-pnf">PNF</th>
                  <th className="td-pnf">Trayecto cursante</th>
                  <th className="td-pnf">Opciones</th>
                </tr>
              </thead>
              <tbody>							
                {	(listado !== null && listado.length > 0) && listado.map(estudiante=>
                  <tr>
                    <td className="td-pnf">{estudiante.nombre}</td>
                    <td className="td-pnf">{estudiante.apellido}</td>
                    <td className="td-pnf">{estudiante.cedula}</td>
                    <td className="td-pnf">{estudiante.correo}</td>
                    <td className="td-pnf">{estudiante.telefono}</td>
                    <td className="td-pnf">{estudiante.direccion}</td>
                    <td className="td-pnf">{estudiante.pnf}</td>
                    <td className="td-pnf font-serif">{trayectoSwitch(estudiante.trayecto)}</td>
                    <td className="td-pnf font-semibold">
                      <button onClick={(e)=>{router.push(`/estudiantes/modificar/${estudiante.id}`)}}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                      <button onClick={(e)=>{onEstudiantePreDelete(e,estudiante.id)}}>
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

            <span className="text-red-600 w-96">Esta seguro de querer eliminar este estudiante? Se eliminara tambien de los proyectos en los que haya participado</span>
              
            <div className="flex flex-row space-x-5 w-full justify-end">
              <button onClick={onEstudianteDelete} className="btn-danger-primary">Eliminar</button>
              <button onClick={confirmModalState.Interaction} className="btn-danger-secondary">Cancelar</button>	
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default EstudiantesMain

export const getServerSideProps = async (context) =>{
   
  const listadoEstudiantes = await prisma.estudiante.findMany()
  const listadoPNF = await prisma.pNF.findMany()
   return {
       props: {
        listado:listadoEstudiantes,
        listadoPNF
        }
    }
}