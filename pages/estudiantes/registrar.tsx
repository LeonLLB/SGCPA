import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PNFSelect from "../../components/form/PNFSelect";
import TrayectoSelect from "../../components/form/TrayectoSelect";
import FormInput from "../../components/ui/FormInput";
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";

const AddEstudiante = (props) => {

  const [Form, onInputChange] = useForm({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: "",
    pnf: "",
    trayecto: ""
  })

  const router = useRouter()

  const {Errors,isItValid, validate} = useValidate({
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
      required:true
    },
    trayecto: {
      required:true
    }
  })

  const onFormSubmit = (event) => {
    event.preventDefault()
    if(isItValid()){
      console.log(Form)
    }else{
      toast.error('El formulario no es valido.')
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
    <div className="h-[90vh] flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
            <h2>Inscribir un estudiante</h2>
            <form onSubmit={onFormSubmit} className="bg-gray-200 p-5 space-y-2 border-2 border-gray-400 rounded-xl">
              <FormInput 
                value={Form.nombre} 
                onInputChange={onInputChange}
                onBlur={validate}
                errors={[]}
                name="nombre"
                label="Nombre:"
                type="text"
              />
              <FormInput 
                value={Form.apellido} 
                onInputChange={onInputChange}
                onBlur={validate}
                errors={[]}
                name="apellido"
                label="Apellido:"
                type="text"
              />
              <FormInput 
                value={Form.cedula} 
                onInputChange={onInputChange}
                onBlur={validate}
                errors={[]}
                name="cedula"
                label="Cedula:"
                type="text"
              />
              <FormInput 
                value={Form.correo} 
                onInputChange={onInputChange}
                onBlur={validate}
                errors={[]}
                name="correo"
                label="Correo electronico:"
                type="email"
              />
              <FormInput 
                value={Form.direccion} 
                onInputChange={onInputChange}
                onBlur={validate}
                errors={[]}
                name="direccion"
                label="Dirección:"
                type="text"
              />
              <FormInput 
                value={Form.telefono} 
                onInputChange={onInputChange}
                onBlur={validate}
                errors={[]}
                name="telefono"
                label="Telefono:"
                type="text"
              />
              <TrayectoSelect
                value={Form.trayecto}
                onInputChange={onInputChange}
                onBlur={validate}
                required={true}
              />
              <PNFSelect
                value={Form.pnf}
                onInputChange={onInputChange}
                onBlur={validate}
                required={true}
                pnfList={(props.listado !== null && props.listado?.length > 0) ? props.listado : []}
              />
              <div className="w-full flex flex-row justify-center !mt-7">
                <button type="submit" className="btn-info-primary">Inscribir estudiante</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export const getServerSideProps = async (context) =>{
   
  const prisma = new PrismaClient()

	const listadoDeCarreras = await prisma.pNF.findMany()

	return {
		props: {
			listado:listadoDeCarreras
		}
	}
}

export default AddEstudiante