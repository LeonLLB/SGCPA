import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import PNFSelect from '../../components/form/PNFSelect'
import TrayectoSelect from '../../components/form/TrayectoSelect'
import FormInput from '../../components/ui/FormInput'
import trayectoSwitch from '../../helpers/trayectoSwitch'
import useForm from '../../hooks/useForm'
import Estudiante from '../../interfaces/Estudiante'
import prisma from "../../prismaClient"

const EstudiantesMain = (props) => {
  const primerListado = props.listado

  const [listado, setListado] = useState<Estudiante[]>([])
  const router = useRouter()

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
      <div className="h-[95.25vh] flex flex-row items-center justify-center">
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
          <div className='overflow-x-auto xl:w-auto w-11/12'>
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
                      <button onClick={(e)=>{}}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                      <button onClick={(e)=>{}}>
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