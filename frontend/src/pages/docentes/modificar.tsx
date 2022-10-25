// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { toast } from 'react-toastify'
import DocenteForm from '../../components/form/DocenteForm'
import useForm from '../../hooks/useForm'
import useValidate from '../../hooks/useValidate'
// import prisma from '../../../prismaClient'

const DocenteModificar = () => {    
  
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
      }
    })
  
    const [Form, onInputChange,,changeForm] = useForm({
      nombre: "",
      apellido: "",
      cedula: "",
      correo: "",
      telefono: "",
      direccion: ""
    },(event)=>{validate(event)})

    useEffect(() => {
       /*  if(props.docente !== null){
            changeForm(props.docente)
            forceValidate(props.docente,true)
        }   */  
    }, [])
    
    
    const onFormSubmit = (event: any) => {
      event.preventDefault()
      if(isItValid()){
        /* const toastReference = toast.loading('Modificando docente...')
              fetch(`/api/docentes/${router.query.id}`,{
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
                    router.push('/docentes')
                  }
                  else{
                      toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.motive,type:'error',isLoading:false,autoClose:4000})
                  }
              })
      }else{
        toast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
      } */
    }}

    return (
      <DocenteForm
        onFormSubmit={onFormSubmit}
        onInputChange={onInputChange}
        validate={validate}
        Form={Form}
        Errors={Errors}
        isModForm={true} 
      />
    )
}

export default DocenteModificar
