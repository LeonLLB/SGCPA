import Jurado from "../../interfaces/Jurado"
import prisma from "../../prismaClient"
import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/router";
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import FormInput from "../../components/ui/FormInput";
import PNFSelect from "../../components/form/PNFSelect";
import TrayectoSelect from "../../components/form/TrayectoSelect";
import DocentesSelect from "../../components/form/DocenteSelect";
import trayectoSwitch from "../../helpers/trayectoSwitch";
import Modal from "../../components/ui/Modal";

const ComitesEvaluadoresMain = (props) => {
  const primerListado = props.listado

  const [listado, setListado] = useState<Jurado[]>([])
  const router = useRouter()
  const [JuradoId, setJuradoId] = useState(null)
  const confirmModalState = useElementAsyncTransition(200)

  const [Form, onInputChange, reset] = useForm({
    periodo: "",
    pnf: "",
    trayecto: "",
    docenteID: "",
    dia: "",
    JuradosPorPagina: ""
  })

  useEffect(() => {
    if(primerListado !== null){
      setListado(primerListado)
    }
  }, [])

  const onJuradoPreModify = (event:MouseEvent,id:number) => {
		event.preventDefault()
		setJuradoId(id)
		confirmModalState.Interaction()
	}

	const onJuradoModify = () => {
		const toastReference = toast.loading('Modificando comite evaluador...')
    fetch('/api/jurados',{
			method:'PUT',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({id:JuradoId})
		})
		.then(res=>res.json())
		.then(res=>{
			if(res.isOk){
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
        filterJurados(true)
        reset()
      }
			else{
				toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
			}
			setJuradoId(0)			
			confirmModalState.Interaction()
		})
	}

  const filterJurados = (clean: boolean = false) => {
    const URL = (clean === false) ?
    `/api/jurados?periodo=${Form.periodo}&pnf=${Form.pnf}&trayecto=${Form.trayecto}&docente=${Form.docenteID}&dia=${Form.dia}` :
    `/api/jurados?periodo=&pnf=&trayecto=&docente=&dia`;
    const toastReference = toast.loading('Filtrando comites...')
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

					<h2>Listado de comites evaluadores</h2>
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
            
            <div className="flex flex-row justify-evenly col-span-2 md:col-span-3">
              <button className='btn-info-primary' onClick={()=>{reset();filterJurados(true)}}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={()=>{filterJurados()}}> Filtrar comites </button>
            </div>
          </div>
          <div className='overflow-x-auto xl:w-auto w-11/12 pb-2'>
            <table className="h-full text-center border-collapse border-2 border-gray-500">
              <thead>
                <tr>
                  <th className="td-pnf">Año</th>
                  <th className="td-pnf">PNF</th>
                  <th className="td-pnf">Trayecto</th>
                  <th className="td-pnf">Asesor</th>
                  <th className="td-pnf">Metodologo</th>
                  <th className="td-pnf">Académicos</th>
                  <th className="td-pnf">Opciones</th>
                </tr>
              </thead>
              <tbody>							
                {	(listado !== null && listado.length > 0) && listado.map(jurado=>
                  <tr key={jurado.id}>
                    <td className="td-pnf">{jurado.periodo}</td>
                    <td className="td-pnf">{jurado.pnf}</td>
                    <td className="td-pnf font-serif"> {trayectoSwitch(jurado.trayecto)}</td>
                    <td className="td-pnf">{jurado.asesor.nombre} {jurado.asesor.apellido}</td>
                    <td className="td-pnf">
                      { (jurado.metodologo !== null) ?
                          `${jurado.metodologo.nombre} ${jurado.metodologo.apellido}` :
                          "No asignado"
                      }
                    </td>
                    <td className="td-pnf">
                      <ul>
                        <li>
                          { (jurado.academico !== null) ?
                            `${jurado.academico.nombre} ${jurado.academico.apellido}` :
                            "No asignado"
                          }
                        </li>
                        <li>
                          { (jurado.adicional !== null) ?
                            `${jurado.adicional.nombre} ${jurado.adicional.apellido}` :
                            ""
                          }
                        </li>
                      </ul>
                    </td>                    
                    <td className="td-pnf font-semibold">                      
                      <button onClick={(e)=>{onJuradoPreModify(e,jurado.id)}}>
                        <span className="material-icons text-3xl">edit</span>
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
        <Modal title="Modificar comite evaluador" onClose={confirmModalState.Interaction} closing={confirmModalState.Closing}>
          <div className="flex flex-col space-y-2 items-center">
            
            
              
            <div className="flex flex-row space-x-5 w-full justify-end">
              <button onClick={onJuradoModify} className="btn-info-primary">Modificar</button>
              <button onClick={confirmModalState.Interaction} className="btn-info-secondary">Cancelar</button>	
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default ComitesEvaluadoresMain

export const getServerSideProps = async (context) =>{

  const ultimaJurado = await prisma.jurado.findFirst({
    orderBy:{
      periodo:'desc'
    },
    select:{
      periodo:true
    }
  })

  const listadoJurados = await prisma.jurado.findMany({
    include:{
      asesor:true,
      metodologo:true,
      academico:true,
      adicional:true
    },
    where:{
      periodo:ultimaJurado.periodo
    }
  })
  const listadoDocentes = await prisma.docente.findMany()
  const listadoPNF = await prisma.pNF.findMany()

   return {
       props: {
        listado:listadoJurados,
        listadoDocentes,
        listadoPNF
        }
    }
}