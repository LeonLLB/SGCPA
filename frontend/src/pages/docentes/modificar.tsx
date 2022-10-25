import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import DocenteForm from '../../components/form/DocenteForm'
import useForm from '../../hooks/useForm'
import useValidate from '../../hooks/useValidate'
import * as DocenteController from '../../../wailsjs/go/database/Docente'
import { database } from '../../../wailsjs/go/models'
import cogoToast from 'cogo-toast'
import { translateDbError } from '../../helpers/dbError'

const DocenteModificar = () => {

  const { docenteId } = useParams()
  const navigate = useNavigate()
  const { Errors, isItValid, validate, forceValidate } = useValidate({
    nombre: {
      required: true,
    },
    apellido: {
      required: true,
    },
    cedula: {
      required: true,
      maxLength: 9,
      regex: {
        exp: RegExp("[0-9]"),
        example: "de valores númericos"
      }
    },
    correo: {
      required: false,
      regex: {
        exp: RegExp("@(gmail|hotmail|yahoo|outlook|icloud).com$"),
        example: "xxx@xxx.com"
      }
    },
    telefono: {
      required: false,
      regex: {
        exp: RegExp("04(14|24|12|16|26)[0-9]{7}$"),
        example: "04xxyyyzzzz"
      },
      maxLength: 11
    },
    direccion: {
      required: true
    }
  })

  const [Form, onInputChange, , changeForm] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: ""
  }, (event) => { validate(event) })

  useEffect(() => {
    if (!docenteId) {
      navigate('/docentes', { replace: true })
      return
    }
    DocenteController.GetOne(parseInt(docenteId))
      .then((docente) => {
        if (!docente) {
          navigate('/docentes', { replace: true })
          return
        }
        const prepDocente = {
          nombre: docente.nombre,
          apellido: docente.apellido,
          cedula: docente.cedula,
          correo: docente.correo,
          telefono: docente.telefono,
          direccion: docente.direccion
        }
        changeForm(prepDocente)
        forceValidate(prepDocente)
      })
  }, [])


  const onFormSubmit = (event: any) => {
    event.preventDefault()
    if (isItValid()) {
      const toast = cogoToast.loading('Modificando docente...')
      DocenteController.Update(parseInt(docenteId!), {...Form,cedula:parseInt(Form.cedula)})
        .then((result) => {
          toast.hide!()
          if (result['id']) {
            cogoToast.success('Docente actualizado con exito!')
            navigate('/docentes', { replace: true })
            return
          }
          cogoToast.error(translateDbError(result['error']['Code']))
        })
    } else {
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
      isModForm={true}
    />
  )
}

export default DocenteModificar
