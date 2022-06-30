import FormInput from "../../components/ui/FormInput";
import useForm from "../../hooks/useForm";
import useValidate from "../../hooks/useValidate";

const AddEstudiante = () => {

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
  }

  return (
    <div className="h-[95.25vh] flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
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
            </form>
        </div>
    </div>
  )
}

export default AddEstudiante