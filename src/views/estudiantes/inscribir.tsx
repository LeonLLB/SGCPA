import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import defaultProps from '../../services/props/estudianteInscribirProps'
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";
import EstudianteForm from "../../components/form/EstudianteForm";
import PNF from "../../interfaces/PNF";
import estudianteControllers from "../../database/controllers/estudiante";

const AddEstudiante = () => {

    const [Listado, setListado] = useState<PNF[]>([])
  
  const navigate = useNavigate()
  
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
      required:false,
      regex:{
        exp:RegExp("@(gmail|hotmail|yahoo|outlook|icloud).com$"),
        example:"xxx@xxx.com"
      }
    },
    telefono: {
      required:false,
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
      const toastReference = toast.loading('Inscribiendo Estudiante...')
			estudianteControllers.addEstudiante(Form)
			.then(res=>{
				if(res.isOk){
					toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
                    navigate('/estudiantes')
				}
				else{
					toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'error',isLoading:false,autoClose:4000})
				}
			})
    }else{
      toast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
    }
  }

  const initPage = async () => {
    const defProps = await defaultProps()
    setListado(defProps.props.listado)
  }

  useEffect(() => {
      initPage()
  }, [])
  

  if(Listado === null){
    toast.loading('Obteniendo listado de Programas...')
  }

  else if(Listado !== null && Listado?.length === 0){
    toast.info('No existen carreras, no es posible inscribir a un estudiante.')
    navigate('/')
  }

  return (
    <EstudianteForm
      onFormSubmit={onFormSubmit}
      onInputChange={onInputChange}
      validate={validate}
      Form={Form}
      Errors={Errors}
      listado={Listado}    
    />
  )
}

export default AddEstudiante