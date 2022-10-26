import cogoToast from "cogo-toast"
import { useEffect } from "react"
import CargaForm from "../../components/form/CargaForm"
import useForm from "../../hooks/useForm"
import useValidate from "../../hooks/useValidate"
import * as CargaController from '../../../wailsjs/go/database/Carga'
import { useNavigate, useParams } from "react-router-dom"
import { createHorario } from "./registrar"
import { translateDbError } from "../../helpers/dbError"

const ModificarCarga = () => {

  const { cargaId } = useParams()
  const navigate = useNavigate()
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
    if (!cargaId) { navigate('/cargas'); return }
    CargaController.GetOne(parseInt(cargaId)).then(carga => {
      if (!carga.id) { navigate('/cargas'); return }
      const formattedCarga = {
        periodo: carga.periodo,
        pnf: carga.pnf,
        trayecto: carga.trayecto,
        turno: carga.turno,
        aula: carga.aula,
        docenteID: carga.docenteId,
        dia1: carga.horario1.split('T')[0],
        horario1entrada: carga.horario1.split('T')[1].split('-')[0],
        horario1salida: carga.horario1.split('T')[1].split('-')[1],
        dia2: (carga.horario2) ? carga.horario2!.split('T')[0] : '',
        horario2entrada: (carga.horario2) ? carga.horario2!.split('T')[1].split('-')[0] : '',
        horario2salida: (carga.horario2) ? carga.horario2!.split('T')[1].split('-')[1] : '',
      }
      changeForm(formattedCarga)
      forceValidate(formattedCarga)
    })
  }, [])

  const onFormSubmit = (event: any) => {
    event.preventDefault()
    if (isItValid()) {
      const toast = cogoToast.loading('Modificando carga...')
      CargaController.Update(parseInt(cargaId!), {
        periodo: Form.periodo,
        pnf: Form.pnf,
        trayecto: parseInt(Form.trayecto),
        turno: Form.turno,
        aula: parseInt(Form.aula),
        docenteId: parseInt(Form.docenteID),
        horario1: createHorario(Form.dia1, Form.horario1entrada, Form.horario1salida)!,
        horario2: createHorario(Form.dia2, Form.horario2entrada, Form.horario2salida),
      } as any)
        .then(result => {
          toast.hide!()
          if (result['id']) {
            cogoToast.success('Carga modificada con exito!')
            navigate('/cargas', { replace: true })
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
      isModForm={true}
    />
  )
}

export default ModificarCarga