import { FormEvent, ChangeEvent, FC } from "react"
import Docente from "../../interfaces/Docente"
import PNF from "../../interfaces/PNF"
import FormInput from "../ui/FormInput"
import AulaSelect from "./AulaSelect"
import DateSelect from "./DateSelect"
import PNFSelect from "./PNFSelect"
import TrayectoSelect from "./TrayectoSelect"

interface formProps {
    PNFListado: PNF[],
    DocenteListado: Docente[],
    onFormSubmit: (e:FormEvent)=>void,
    onInputChange: (e:ChangeEvent)=>void,
    validate: (e:any)=>void,
    Form: any,
    Errors: any,
    isModForm?:boolean
}

const PresentacionForm: FC<formProps> = ({ PNFListado, onFormSubmit, onInputChange, validate, Form, Errors, isModForm = false }) => {
    return (
        <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h2>{isModForm ? "Modificar una presentación" : "Inscribir una presentación"}</h2>
                <form onSubmit={onFormSubmit} className="bg-gray-200 p-5 flex flex-col align-middle space-y-2 border-2 border-gray-400 rounded-xl">
                    <FormInput
                        value={Form.periodo}
                        onInputChange={onInputChange}
                        onBlur={validate}
                        errors={(Errors.periodo !== undefined || Errors.periodo !== null) ? Errors.periodo : null}
                        name="periodo"
                        label="Año:"
                        type="text"
                    />
                    <PNFSelect
                        onInputChange={onInputChange}
                        onBlur={validate}
                        required={true}
                        pnfList={PNFListado}
                        value={Form.pnf}
                        error={(Errors.pnf !== undefined || Errors.pnf !== null) ? Errors.pnf : null}
                    />
                    <TrayectoSelect
                        value={Form.trayecto}
                        onInputChange={onInputChange}
                        onBlur={validate}
                        required={true}
                        error={(Errors.trayecto !== undefined || Errors.trayecto !== null) ? Errors.trayecto : null}
                    />
                    <DateSelect
                        value={{
                            dia:Form.diaPreDefensa,
                            mes:Form.mesPreDefensa,
                            year:Form.yearPreDefensa
                        }}
                        mainLabel="Fecha de predefensa"
                        label={{
                            dia:"Día",
                            mes:"Mes",
                            year:"Año"
                        }}
                        name={{
                            dia:"diaPreDefensa",
                            mes:"mesPreDefensa",
                            year:"yearPreDefensa"
                        }}
                        periodo={Form.periodo}
                        onInputChange={onInputChange}
                        onBlur={validate}
                        required={false}
                    />
                    <DateSelect
                        value={{
                            dia:Form.diaDefensa,
                            mes:Form.mesDefensa,
                            year:Form.yearDefensa
                        }}
                        mainLabel="Fecha de defensa"
                        label={{
                            dia:"Día",
                            mes:"Mes",
                            year:"Año"
                        }}
                        name={{
                            dia:"diaDefensa",
                            mes:"mesDefensa",
                            year:"yearDefensa"
                        }}
                        periodo={Form.periodo}
                        onInputChange={onInputChange}
                        onBlur={validate}
                        required={false}
                    />
                    <AulaSelect
                        value={Form.aula}
                        onInputChange={onInputChange}
                        onBlur={validate}
                        required={false}
                        withNonNumericAulas={true}
                        label="Aula de presentación"
                        error={(Errors.aula !== undefined || Errors.aula !== null) ? Errors.aula : null}
                    />
                    <div className="w-full flex flex-row justify-center !mt-7">
                        <button type="submit" className="btn-info-primary">{isModForm ? "Modificar presentación" : "Inscribir presentación"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PresentacionForm