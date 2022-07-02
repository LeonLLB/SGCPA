import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import EstudianteForm from '../../../components/form/EstudianteForm'
import useForm from '../../../hooks/useForm'
import useValidate from '../../../hooks/useValidate'
import prisma from '../../../prismaClient'

const EstudianteModificar = (props) => {    
    const router = useRouter()

    if(props.listado !== null && props.estudiante === null && typeof(window) !== "undefined"){
        router.push('/estudiantes')
        toast.info('El estudiante solicitado no existe.')
    }
  
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

    useEffect(() => {
        if(props.estudiante !== null){
            changeForm(props.estudiante)
            forceValidate(props.estudiante,true)
        }    
    }, [])
    
    
    const onFormSubmit = (event) => {
      event.preventDefault()
      if(isItValid()){
        const toastReference = toast.loading('Inscribiendo PNF...')
              fetch(`/api/estudiantes/${router.query.id}`,{
                  method:'PUT',
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
        isModForm={true} 
      />
    )
}

export default EstudianteModificar

export const getServerSideProps: GetServerSideProps = async (context) =>{
    
    const estudianteAModificar = await prisma.estudiante.findUnique({where:{id:parseInt(context.params.id as string)}})

    const listadoDeCarreras = await prisma.pNF.findMany()

	return {
		props: {
			listado:listadoDeCarreras,
            estudiante:estudianteAModificar
		}
	}
}