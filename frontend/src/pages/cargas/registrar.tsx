import { useRouter } from "next/router"
import { toast } from "react-toastify"
import CargaForm from "../../components/form/CargaForm"
import useForm from "../../hooks/useForm"
import useValidate from "../../hooks/useValidate"
import prisma from "../../prismaClient"


const RegistrarCarga = (props) => {
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

    const onFormSubmit = (event) => {
        event.preventDefault()
        if (isItValid()) {
            const toastReference = toast.loading('Inscribiendo carga...')
            fetch('/api/cargas', {
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
                        router.push('/cargas')
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
        toast.info('No existen carreras, no es posible inscribir la carga.')
        router.push('/')
    }

    if (props.listadoDocentes === null) {
        toast.loading('Obteniendo listado de docentes...')
    }

    else if (props.listadoDocentes !== null && props.listadoDocentes?.length === 0) {
        toast.info('No existen docentes inscritos, no es posible inscribir a un docente.')
        router.push('/')
    }

    return (
        <CargaForm
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
            validate={validate}
            Form={Form}
            Errors={Errors}
            PNFListado={props.listadoPNF}
            DocenteListado={props.listadoDocentes}
        />
    )
}

export const getServerSideProps = async (context) => {

    const listadoDeCarreras = await prisma.pNF.findMany()
    const listadoDeProfesores = await prisma.docente.findMany({ select: { nombre: true, apellido: true, id: true }, where: { activo: true } })

    return {
        props: {
            listadoPNF: listadoDeCarreras,
            listadoDocentes: listadoDeProfesores
        }
    }
}

export default RegistrarCarga