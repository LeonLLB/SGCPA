import { ChangeEvent, FC, FormEvent } from 'react'
import PNF from '../../interfaces/PNF'
import FormInput from '../ui/FormInput'
import PNFSelect from './PNFSelect'
import TrayectoSelect from './TrayectoSelect'

interface formProps {
  onFormSubmit: (e:FormEvent)=>void,
  onInputChange: (e:ChangeEvent)=>void,
  validate: (e:any)=>void,
  Form: any,
  Errors: any,
  listado: PNF[],
  isModForm?:boolean
}

const EstudianteForm: FC<formProps> = ({onFormSubmit,onInputChange,validate,Form,Errors,listado,isModForm=false}) => {
    return (
        <div className="h-[90vh] flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h2>{isModForm? "Modificar un estudiante" : "Inscribir un estudiante"}</h2>
                <form onSubmit={onFormSubmit} className="bg-gray-200 p-5 space-y-2 border-2 border-gray-400 rounded-xl">
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
                  <TrayectoSelect
                    value={Form.trayecto}
                    onInputChange={onInputChange}
                    onBlur={validate}
                    required={true}
                    error={(Errors.trayecto !== undefined || Errors.trayecto !== null) ? Errors.trayecto : null}
                  />
                  <PNFSelect
                    value={Form.pnf}
                    onInputChange={onInputChange}
                    onBlur={validate}
                    required={true}
                    error={(Errors.pnf !== undefined || Errors.pnf !== null) ? Errors.pnf : null}
                    pnfList={(listado !== null && listado?.length > 0) ? listado : []}
                  />
                  <div className="w-full flex flex-row justify-center !mt-7">
                    <button type="submit" className="btn-info-primary">{isModForm? "Modificar estudiante" : "Inscribir estudiante"}</button>
                  </div>
                </form>
            </div>
        </div>
      )
}

export default EstudianteForm