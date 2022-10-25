import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";
import DocenteForm from "../../components/form/DocenteForm";
import * as DocenteController from '../../../wailsjs/go/database/Docente'
import { translateDbError } from "../../helpers/dbError";

const AddDocente = () => {  

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
  })

  const [Form, onInputChange] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
  },(event)=>{validate(event)})
  
  const onFormSubmit = (event: any) => {
    event.preventDefault()
    if(isItValid()){
      const toast = cogoToast.loading('Inscribiendo Docente...')
      DocenteController.Create({
        ...Form,
        cedula:parseInt(Form.cedula)
      })
      .then((result)=>{
        toast.hide!()
				if(result['id']){
					cogoToast.success('Docente registrado con exito!')
          navigate('/docentes',{replace:true})
					return
				}
				cogoToast.error(translateDbError(result['error']['Code']))
      })			
    }else{
      cogoToast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
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