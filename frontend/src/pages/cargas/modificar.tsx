// import { useRouter } from "next/router"
import cogoToast from "cogo-toast"
import { useEffect } from "react"
// import { toast } from "react-toastify"
import CargaForm from "../../components/form/CargaForm"
import useForm from "../../hooks/useForm"
import useValidate from "../../hooks/useValidate"
// import prisma from "../../../prismaClient"


const ModificarCarga = () => {
  // const router = useRouter()

  // if (props.isReady !== null && props.docente === null && typeof (window) !== "undefined") {
  //   router.push('/cargas')
  //   toast.info('La carga solicitada no existe.')
  // }

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
    turno: {
      required: true,
      minLength: 1
    },
    trayecto: {
      required: true,
      minLength: 1
    },
    dia1: {
      required: true,
      minLength: 1
    },
    horario1entrada: {
      required: true,
      minLength: 1
    },
    horario1salida: {
      required: true,
      minLength: 1
    },
    dia2: {
      required: false
    },
    horario2entrada: {
      required: false
    },
    horario2salida: {
      required: false
    },
    aula: {
      required: true,
      minLength: 1,
      regex: {
        exp: RegExp("[0-9]"),
        example: "de valores númericos"
      }
    },
    docenteID: {
      required: true,
      minLength: 1,
      regex: {
        exp: RegExp("[0-9]"),
        example: "de valores númericos"
      }
    },
  })

  const [Form, onInputChange, , changeForm] = useForm({
    periodo: "",
    pnf: "",
    trayecto: "",
    turno: "",
    aula: "",
    docenteID: "",
    dia1: "",
    horario1entrada: "",
    horario1salida: "",
    dia2: "",
    horario2entrada: "",
    horario2salida: "",
  }, (event) => { validate(event) })

  useEffect(() => {
    // if (props.carga !== null) {
    //   changeForm({
    //     id: props.carga.id,
    //     periodo: props.carga.periodo,
    //     pnf: props.carga.pnf,
    //     trayecto: props.carga.trayecto,
    //     turno: props.carga.turno,
    //     aula: props.carga.aula,
    //     docenteID: props.carga.docenteID,
    //     dia1: props.carga.horario1.split('T')[0],
    //     horario1entrada: props.carga.horario1.split('T')[1].split('-')[0],
    //     horario1salida: props.carga.horario1.split('T')[1].split('-')[1],
    //     dia2: (props.carga.horario2 !== null) ? props.carga.horario2.split('T')[0] : '',
    //     horario2entrada: (props.carga.horario2 !== null) ? props.carga.horario2.split('T')[1].split('-')[0] : '',
    //     horario2salida: (props.carga.horario2 !== null) ? props.carga.horario2.split('T')[1].split('-')[1] : '',
    //   })
    //   forceValidate({
    //     id: props.carga.id,
    //     periodo: props.carga.periodo,
    //     pnf: props.carga.pnf,
    //     trayecto: props.carga.trayecto,
    //     turno: props.carga.turno,
    //     aula: props.carga.aula,
    //     docenteID: props.carga.docenteID,
    //     dia1: props.carga.horario1.split('T')[0],
    //     horario1entrada: props.carga.horario1.split('T')[1].split('-')[0],
    //     horario1salida: props.carga.horario1.split('T')[1].split('-')[1],
    //     dia2: (props.carga.horario2 !== null) ? props.carga.horario2.split('T')[0] : '',
    //     horario2entrada: (props.carga.horario2 !== null) ? props.carga.horario2.split('T')[1].split('-')[0] : '',
    //     horario2salida: (props.carga.horario2 !== null) ? props.carga.horario2.split('T')[1].split('-')[1] : '',
    //   }, true)
    // }
  }, [])

  const onFormSubmit = (event: any) => {
    event.preventDefault()
    if(isItValid()){
      // const toastReference = toast.loading('Modificando carga...')
      //       fetch(`/api/cargas/${router.query.id}`,{
      //           method:'PUT',
      //           headers:{
      //               'Content-Type':'application/json'
      //           },
      //           body:JSON.stringify(Form)
      //       })
      //       .then(res=>res.json())
      //       .then(res=>{
      //           if(res.isOk){
      //               toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.result,type:'success',isLoading:false,autoClose:4000})
      //             router.push('/cargas')
      //           }
      //           else{
      //               toast.update(toastReference,{closeButton:true,closeOnClick:true,render:res.motive,type:'error',isLoading:false,autoClose:4000})
      //           }
      //       })
    }else{
      cogoToast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
    }
  }


  return (
    <CargaForm
        onFormSubmit={onFormSubmit}
        onInputChange={onInputChange}
        validate={validate}
        Form={Form}
        Errors={Errors}
        isModForm={true}
    />
)
}

export default ModificarCarga