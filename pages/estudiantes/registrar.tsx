import { useRouter } from "next/router";
import { toast } from "react-toastify";
import prisma from "../../prismaClient";
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";
import EstudianteForm from "../../components/form/EstudianteForm";

const AddEstudiante = (props) => {

  
  const router = useRouter()
  
  const {Errors,isItValid, validate} = useValidate({
    nombre: {
      required:true,
    },
    apellido: {
      required:true,
    },
    cedula: {
      required:true,
      maxLength:9,
      regex:{
        exp:RegExp("[0-9]"),
        example:"de valores númericos"
      }
    },
    correo: {
      required:true,
      regex:{
        exp:RegExp("@(gmail|hotmail|yahoo|outlook|icloud).com$"),
        example:"xxx@xxx.com"
      }
    },
    telefono: {
      required:true,
      regex:{
        exp:RegExp("04(14|24|12|16|26)[0-9]{7}$"),
        example:"04xxyyyzzzz"
      },
      maxLength:11
    },
    direccion: {
      required:true
    },
    pnf: {
      required:true,
      minLength:1
    },
    trayecto: {
      required:true,
      minLength:1
    }
  })

  const [Form, onInputChange] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
    pnf: "",
    trayecto: ""
  },(event)=>{validate(event)})
  
  const onFormSubmit = (event) => {
    event.preventDefault()
    if(isItValid()){
      const toastReference = toast.loading('Inscribiendo PNF...')
			fetch('/api/estudiantes',{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify(Form)
			})
			.then(res=>res.json())
			.then(res=>{
				if(res.isOk){
					toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
          router.push('/estudiantes')
				}
				else{
					toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.motive,type:'error',isLoading:false,autoClose:4000})
				}
			})
    }else{
      toast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
    }
  }

  if(props.listado === null){
    toast.loading('Obteniendo listado de Programas...')
  }

  else if(props.listado !== null && props.listado?.length === 0){
    toast.info('No existen carreras, no es posible inscribir a un estudiante.')
    router.push('/')
  }

  return (
    <EstudianteForm
      onFormSubmit={onFormSubmit}
      onInputChange={onInputChange}
      validate={validate}
      Form={Form}
      Errors={Errors}
      listado={props.listado}    
    />
  )
}

export const getServerSideProps = async (context) =>{

	const listadoDeCarreras = await prisma.pNF.findMany()

	return {
		props: {
			listado:listadoDeCarreras
		}
	}
}

export default AddEstudiante