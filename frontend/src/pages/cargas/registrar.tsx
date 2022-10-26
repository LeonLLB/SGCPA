import cogoToast from "cogo-toast"
import CargaForm from "../../components/form/CargaForm"
import useForm from "../../hooks/useForm"
import useValidate from "../../hooks/useValidate"
import * as CargasController from '../../../wailsjs/go/database/Carga'
import { translateDbError } from "../../helpers/dbError"
import { useNavigate } from "react-router-dom"

export const createHorario = (dia:string,entrada:string,salida:string): string | undefined =>{
    if(dia !== '' && entrada !== '' && salida !== ''){
        return `${dia}T${entrada}-${salida}`
    }
    return undefined
}

const RegistrarCarga = () => {


    const navigate = useNavigate()

    const { Errors, isItValid, validate } = useValidate({
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

    const [Form, onInputChange] = useForm({
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

    const onFormSubmit = (event: any) => {
        event.preventDefault()
        if (isItValid()) {
            const toast = cogoToast.loading('Inscribiendo carga...')
            CargasController.Create({
                periodo: Form.periodo,
                pnf: Form.pnf,
                trayecto: parseInt(Form.trayecto),
                turno: Form.turno,
                aula: parseInt(Form.aula),
                docenteId: parseInt(Form.docenteID),
                horario1:createHorario(Form.dia1, Form.horario1entrada, Form.horario1salida)!,
                horario2:createHorario(Form.dia2, Form.horario2entrada, Form.horario2salida),
            } as any)
            .then(result=>{
                toast.hide!()
				if(result['id']){
					cogoToast.success('Carga registrada con exito!')
                    navigate('/cargas',{replace:true})
					return
				}
				cogoToast.error(translateDbError(result['error']['Code']))
            })       
        } else {
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
        />
    )
}

export default RegistrarCarga