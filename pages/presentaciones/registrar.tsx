import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import PresentacionForm from '../../components/form/PresentacionForm'
import useForm from '../../hooks/useForm'
import useValidate from '../../hooks/useValidate'
import prisma from '../../prismaClient'

const RegistrarPresentacion = (props) => {
    const router = useRouter()

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

    const [Form, onInputChange] = useForm({
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

    const onFormSubmit = (event) => {
        event.preventDefault()
        if (isItValid()) {
            const toastReference = toast.loading('Inscribiendo fechas de presentación...')
            fetch('/api/presentaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Form)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.isOk) {
                        toast.update(toastReference, { closeButton: true, closeOnClick: true, render: res.result, type: 'success', isLoading: false, autoClose: 4000 })
                        router.push('/presentaciones')
                    }
                    else {
                        toast.update(toastReference, { closeButton: true, closeOnClick: true, render: res.motive, type: 'error', isLoading: false, autoClose: 4000 })
                    }
                })
        } else {
            toast.error('El formulario no es valido, esta vació o faltan valores requeridos.')
        }
    }

    if (props.listadoPNF === null) {
        toast.loading('Obteniendo listado de Programas...')
    }

    else if (props.listadoPNF !== null && props.listadPNF?.length === 0) {
        toast.info('No existen carreras, no es posible inscribir las fechas de presentación.')
        router.push('/')
    }

    if (props.listadoDocentes === null) {
        toast.loading('Obteniendo listado de docentes...')
    }

    else if (props.listadoDocentes !== null && props.listadoDocentes?.length === 0) {
        toast.info('No existen docentes inscritos, no es posible inscribir las fechas de presentación.')
        router.push('/')
    }

  return (
    <PresentacionForm
        PNFListado={props.listadoPNF}
        onFormSubmit={onFormSubmit}
        onInputChange={onInputChange}
        validate={validate}
        Form={Form}
        Errors={Errors} 
    />
  )
}

export default RegistrarPresentacion

export const getServerSideProps = async (context) => {

    const listadoDeCarreras = await prisma.pNF.findMany()

    return {
        props: {
            listadoPNF: listadoDeCarreras
        }
    }
}