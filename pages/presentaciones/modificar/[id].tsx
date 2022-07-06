import { useRouter } from "next/router"
import { useEffect } from "react"
import { toast } from "react-toastify"
import PresentacionForm from "../../../components/form/PresentacionForm"
import useForm from "../../../hooks/useForm"
import useValidate from "../../../hooks/useValidate"
import prisma from "../../../prismaClient"


const PresentacionModificar = (props) => {

    const router = useRouter()

  if (props.isReady !== null && props.presentacion === null && typeof (window) !== "undefined") {
    router.push('/presentaciones')
    toast.info('La presentación solicitada no existe.')
  }

  const { Errors, isItValid, validate, forceValidate } = useValidate({
    periodo: {
        required: true,
        minLength: 4,
        maxLength: 4,
        regex: {
            exp: RegExp("[0-9]"),
            example: "de valores númericos"
        }
    },
    pnf: {
        required: true,
        minLength: 1
    },
    trayecto: {
        required: true,
        minLength: 1
    },
    diaPreDefensa: {
        required: false
    },
    mesPreDefensa: {
        required: false
    },
    yearPreDefensa: {
        required: false
    },
    diaDefensa: {
        required: false
    },
    mesDefensa: {
        required: false
    },
    yearDefensa: {
        required: false
    },
    aula:{
        required:false
    }
  })

  const [Form, onInputChange, , changeForm] = useForm({
    periodo: "",
    pnf: "",
    trayecto: "",
    diaPreDefensa: "",
    mesPreDefensa: "",
    yearPreDefensa: "",
    diaDefensa: "",
    mesDefensa: "",
    yearDefensa: "",
    aula:''
  }, (event) => { validate(event) })

  useEffect(() => {
    if (props.presentacion !== null) {
        const presentacion = JSON.parse(props.presentacion)
      changeForm({
        id: presentacion.id,
        periodo: presentacion.periodo,
        pnf: presentacion.pnf,
        trayecto: presentacion.trayecto,
        diaPreDefensa: (presentacion.preDefensa !== null)?parseInt(presentacion.preDefensa.split('T')[0].split('-')[2]):"",
        mesPreDefensa: (presentacion.preDefensa !== null)?parseInt(presentacion.preDefensa.split('T')[0].split('-')[1]): '',
        yearPreDefensa: (presentacion.preDefensa !== null)?parseInt(presentacion.preDefensa.split('T')[0].split('-')[0]):"",
        diaDefensa:  (presentacion.defensa !== null)?parseInt(presentacion.defensa.split('T')[0].split('-')[2]):"",
        mesDefensa:  (presentacion.defensa !== null)?parseInt(presentacion.defensa.split('T')[0].split('-')[1]): '',
        yearDefensa:  (presentacion.defensa !== null)?parseInt(presentacion.defensa.split('T')[0].split('-')[0]): "",
        aula:(presentacion.aula !== null)?presentacion.aula:""
      })
      forceValidate({
        id: presentacion.id,
        periodo: presentacion.periodo,
        pnf: presentacion.pnf,
        trayecto: presentacion.trayecto,
        diaPreDefensa: (presentacion.preDefensa !== null)?presentacion.preDefensa.split('T')[0].split('-')[2]:"",
        mesPreDefensa: (presentacion.preDefensa !== null)?presentacion.preDefensa.split('T')[0].split('-')[1]: '',
        yearPreDefensa: (presentacion.preDefensa !== null)?presentacion.preDefensa.split('T')[0].split('-')[0]:"",
        diaDefensa:  (presentacion.defensa !== null)?presentacion.defensa.split('T')[0].split('-')[2]:"",
        mesDefensa:  (presentacion.defensa !== null)?presentacion.defensa.split('T')[0].split('-')[1]: '',
        yearDefensa:  (presentacion.defensa !== null)?presentacion.defensa.split('T')[0].split('-')[0]: "",
        aula:(presentacion.aula !== null)?presentacion.aula:""
      }, true)
    }
  }, [])

  const onFormSubmit = (event) => {
    event.preventDefault()
    if(isItValid()){
      const toastReference = toast.loading('Modificando presentación...')
            fetch(`/api/presentaciones/${router.query.id}`,{
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
                  router.push('/presentaciones')
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
    <PresentacionForm
        PNFListado={props.listadoPNF}
        onFormSubmit={onFormSubmit}
        onInputChange={onInputChange}
        validate={validate}
        isModForm={true}
        Form={Form}
        Errors={Errors} 
    />
  )
}

export default PresentacionModificar

export const getServerSideProps = async (context) => {

    const listadoDeCarreras = await prisma.pNF.findMany()
    const presentacionAModificar = await prisma.defensa.findUnique({ where: { id: parseInt(context.params.id) } })
  
    return {
      props: {
        listadoPNF: listadoDeCarreras,
        presentacion:(presentacionAModificar !== null) ? JSON.stringify(presentacionAModificar) : null,
        isReady:true
      }
    }
  }