import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import EstudianteForm from '../../components/form/EstudianteForm'
import estudianteControllers from '../../database/controllers/estudiante'
import useForm from '../../hooks/useForm'
import useValidate from '../../hooks/useValidate'
import PNF from '../../interfaces/PNF'
import defaultProps from '../../services/props/estudianteModificarProps'

const EstudianteModificar = () => {

    const [Listado, setListado] = useState<PNF[]>([])
  
    const navigate = useNavigate()
    const params = useParams()
  
    const {Errors,isItValid, validate,forceValidate} = useValidate({
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
  
    const [Form, onInputChange,,changeForm] = useForm({
      nombre: "",
      apellido: "",
      cedula: "",
      correo: "",
      telefono: "",
      direccion: "",
      pnf: "",
      trayecto: ""
    },(event)=>{validate(event)})

    const initPage = async () => {
        const defProps = await defaultProps(parseInt(params.id))
        if(defProps.props.estudiante !== null){
            setListado(defProps.props.listado)
            changeForm(defProps.props.estudiante)
            forceValidate(defProps.props.estudiante,true)
        }else{
            navigate('/estudiantes')
            toast.info('No existe ese estudiante')
        }
    }

    useEffect(() => {
        initPage()
    })
    
    
    const onFormSubmit = (event) => {
      event.preventDefault()
      if(isItValid()){
        const toastReference = toast.loading('Inscribiendo PNF...')
              estudianteControllers.updateEstudiante(Form)
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
        isModForm={true} 
      />
    )
}

export default EstudianteModificar

