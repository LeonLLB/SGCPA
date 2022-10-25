import {useEffect, useState, MouseEvent} from 'react'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import FormInput from '../../components/ui/FormInput'
import Modal from '../../components/ui/Modal'
import useElementAsyncTransition from '../../hooks/useElementAsyncTransition'
import useForm from '../../hooks/useForm'
import Docente from '../../interfaces/Docente'
// import prisma from "../../prismaClient"

const DocentesMain = () => {
  // const primerListado = props.listado

  const [listado, setListado] = useState<Docente[]>([])
  const navigate = useNavigate()
  const [DocenteId, setDocenteId] = useState(null)
  const confirmModalState = useElementAsyncTransition(200)

  const [Form, onInputChange, reset] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
    docentesPorPagina: ""
  })

  // useEffect(() => {
  //   if(primerListado !== null){
  //     setListado(primerListado)
  //   }
  // }, [])

  const onDocentePreDelete = (event:MouseEvent,id:number) => {
		event.preventDefault()
		// setDocenteId(id)
		confirmModalState.Interaction()
	}

	const onDocenteDelete = () => {
		// const toastReference = toast.loading('Eliminando docente...')
    // fetch('/api/docentes',{
		// 	method:'DELETE',
		// 	headers:{
		// 		'Content-Type':'application/json'
		// 	},
		// 	body:JSON.stringify({id:DocenteId})
		// })
		// .then(res=>res.json())
		// .then(res=>{
		// 	if(res.isOk){
		// 		toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
    //     filterDocentes(true)
    //     reset()
    //   }
		// 	else{
		// 		toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
		// 	}
		// 	setDocenteId(0)			
		// 	confirmModalState.Interaction()
		// })
	}

  const filterDocentes = (clean: boolean = false) => {
    // const URL = (clean === false) ?
    // `/api/docentes?nombre=${Form.nombre}&apellido=${Form.apellido}&ci=${Form.cedula}&correo=${Form.correo}&tlf=${Form.telefono}&direccion=${Form.direccion}` :
    // `/api/docentes?nombre=&apellido=&ci=&correo=&tlf=&direccion=`;
    // const toastReference = toast.loading('Filtrando docentes...')
		// fetch(URL)
		// .then(res=>res.json())
		// .then(res=>{
		// 	if(res.isOk){
    //     setListado(res.data)
		// 		toast.update(toastReference,{closeButton:true,closeOnClick:true,render:'Operación culminada',type:'info',isLoading:false,autoClose:4000})
		// 	}
		// 	else{
		// 		toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
		// 	}
		// })
  }

  return (
    <>
      <div className="mt-5 flex flex-row items-center justify-center">
				<div className="w-full flex flex-col items-center space-y-4 justify-center">

					<h2>Listado de Docentes</h2>
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
            <div className="flex flex-row justify-evenly col-span-2 md:col-span-3">
              <button className='btn-info-primary' onClick={()=>{navigate('/docentes/registrar',{replace:true})}}>Añadir docente</button>
              <button className='btn-info-primary' onClick={()=>{reset();filterDocentes(true)}}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={()=>{filterDocentes()}}> Filtrar docentes </button>
            </div>
          </div>
          <div className='overflow-x-auto pb-2'>
            <table className="h-full text-center border-collapse border-2 border-gray-500">
              <thead>
                <tr>
                  <th className="td-pnf">Nombre</th>
                  <th className="td-pnf">Apellido</th>
                  <th className="td-pnf">C.I</th>
                  <th className="td-pnf">Correo</th>
                  <th className="td-pnf">Telefono</th>
                  <th className="td-pnf">Dirección</th>
                  <th className="td-pnf">Opciones</th>
                </tr>
              </thead>              
              <tbody>							
                {/* {	(listado !== null && listado.length > 0) && listado.map(docente=> */}
                {false && listado.map(docente=>
                  <tr key={docente.id}>
                    <td className="td-pnf">{docente.nombre}</td>
                    <td className="td-pnf">{docente.apellido}</td>
                    <td className="td-pnf">{docente.cedula}</td>
                    <td className="td-pnf">{docente.correo}</td>
                    <td className="td-pnf">{docente.telefono}</td>
                    <td className="td-pnf">{docente.direccion}</td>
                    <td className="td-pnf font-semibold">
                      <button onClick={(e)=>{/* router.push(`/docentes/modificar/${docente.id}`) */}}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                      <button onClick={(e)=>{onDocentePreDelete(e,docente.id)}}>
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

            <span className="text-red-600 w-96">Esta seguro de querer eliminar este docente? Se eliminara tambien de los proyectos, jurados y cargas en los que haya participado</span>
              
            <div className="flex flex-row space-x-5 w-full justify-end">
              <button onClick={onDocenteDelete} className="btn-danger-primary">Eliminar</button>
              <button onClick={confirmModalState.Interaction} className="btn-danger-secondary">Cancelar</button>	
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default DocentesMain
