import { ChangeEvent, FocusEvent } from 'react'
import FormInput from '../ui/FormInput'

interface DocenteFormProps {
  onFormSubmit: (e: any) => void
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  validate: (e: FocusEvent<HTMLInputElement>) => void
  Form: {[x:string]:any}
  Errors: {[x:string]:any}
  isModForm?:boolean
}

const DocenteForm = ({onFormSubmit,onInputChange,validate,Form,Errors,isModForm=false}:DocenteFormProps) => {
    return (
        <div className="h-[90vh] max-h-[89vh] overflow-y-auto flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h2>{isModForm? "Modificar un docente" : "Inscribir un docente"}</h2>
                <form autoComplete='off' onSubmit={onFormSubmit} className=" bg-gray-200 p-5 space-y-2 border-2 border-gray-400 rounded-xl">
                  <FormInput 
                    value={Form.nombre} 
                    onInputChange={onInputChange}
                    onBlur={validate}
                    errors={(Errors.nombre !== undefined || Errors.nombre !== null) ? Errors.nombre : null}
                    name="nombre"
                    label="Nombre:"
                    type="text"
                  />
                  <FormInput 
                    value={Form.apellido} 
                    onInputChange={onInputChange}
                    onBlur={validate}
                    errors={(Errors.apellido !== undefined || Errors.apellido !== null) ? Errors.apellido : null}
                    name="apellido"
                    label="Apellido:"
                    type="text"
                  />
                  <FormInput 
                    value={Form.cedula} 
                    onInputChange={onInputChange}
                    onBlur={validate}
                    errors={(Errors.cedula !== undefined || Errors.cedula !== null) ? Errors.cedula : null}
                    name="cedula"
                    label="Cedula:"
                    type="text"
                  />
                  <FormInput 
                    value={Form.correo} 
                    onInputChange={onInputChange}
                    onBlur={validate}
                    errors={(Errors.correo !== undefined || Errors.correo !== null) ? Errors.correo : null}
                    name="correo"
                    label="Correo electronico:"
                    type="email"
                  />
                  <FormInput 
                    value={Form.direccion} 
                    onInputChange={onInputChange}
                    onBlur={validate}
                    errors={(Errors.direccion !== undefined || Errors.direccion !== null) ? Errors.direccion : null}
                    name="direccion"
                    label="Dirección:"
                    type="text"
                  />
                  <FormInput 
                    value={Form.telefono} 
                    onInputChange={onInputChange}
                    onBlur={validate}
                    errors={(Errors.telefono !== undefined || Errors.telefono !== null) ? Errors.telefono : null}
                    name="telefono"
                    label="Telefono:"
                    type="text"
                  />
                  <div className="w-full flex flex-row justify-center !mt-7">
                    <button type="submit" className="btn-info-primary">{isModForm? "Modificar docente" : "Inscribir docente"}</button>
                  </div>
                </form>
            </div>
        </div>
      )
}

export default DocenteForm