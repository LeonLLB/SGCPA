import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";
import DocenteForm from "../../components/form/DocenteForm";

const AddDocente = () => {
  
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
  })

  const [Form, onInputChange] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
  },(event)=>{validate(event)})
  
  const onFormSubmit = (event) => {
    event.preventDefault()
    if(isItValid()){
      const toastReference = toast.loading('Inscribiendo Docente...')
			fetch('/api/docentes',{
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
          router.push('/docentes')
				}
				else{
					toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.motive,type:'error',isLoading:false,autoClose:4000})
				}
			})
    }else{
      toast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
    }
  }

  return (
    <DocenteForm
      onFormSubmit={onFormSubmit}
      onInputChange={onInputChange}
      validate={validate}
      Form={Form}
      Errors={Errors}  
    />
  )
}

export default AddDocente