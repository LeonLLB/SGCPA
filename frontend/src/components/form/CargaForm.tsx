import { ChangeEvent, FocusEvent } from "react"
import FormInput from "../ui/FormInput"
import AulaSelect from "./AulaSelect"
import DocenteSelect from "./DocenteSelect"
import HorarioSelect from "./HorarioSelect"
import PNFSelect from "./PNFSelect"
import TrayectoSelect from "./TrayectoSelect"
import TurnoSelect from "./TurnoSelect"

interface CargaFormProps {
    onFormSubmit: (e:any)=>void
    onInputChange: (e: (ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>)) => void
    validate: (e: (FocusEvent<HTMLInputElement>|FocusEvent<HTMLSelectElement>)) => void
    Form: {[x:string]:any}
    Errors: {[x:string]:any}
    isModForm? : boolean
}

const CargaForm = ({ onFormSubmit, onInputChange, validate, Form, Errors, isModForm = false }:CargaFormProps) => {
    return (
        <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h2>{isModForm ? "Modificar una carga" : "Inscribir una carga"}</h2>
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
                        value={Form.pnf}
                        error={(Errors.pnf !== undefined || Errors.pnf !== null) ? Errors.pnf : null}
                    />
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <TrayectoSelect
                                value={Form.trayecto}
                                onInputChange={onInputChange}
                                onBlur={validate}
                                required={true}
                                error={(Errors.trayecto !== undefined || Errors.trayecto !== null) ? Errors.trayecto : null}
                            />
                        </div>
                        <div className="flex flex-col">
                            <TurnoSelect
                                value={Form.turno}
                                onInputChange={onInputChange}
                                onBlur={validate}
                                required={true}
                                error={(Errors.turno !== undefined || Errors.turno !== null) ? Errors.turno : null}
                            />
                        </div>
                        <div className="flex flex-col">
                            <AulaSelect
                                value={Form.aula}
                                onInputChange={onInputChange}
                                onBlur={validate}
                                required={true}
                                error={(Errors.aula !== undefined || Errors.aula !== null) ? Errors.aula : null}
                            />
                        </div>
                    </div>
                    <DocenteSelect
                        onInputChange={onInputChange}
                        onBlur={validate}
                        required={true}
                        value={Form.docenteID}
                        error={(Errors.docenteID !== undefined || Errors.docenteID !== null) ? Errors.docenteID : null}
                    />
                    <div className="flex flex-row justify-between">
                        <HorarioSelect
                            onInputChange={onInputChange}
                            validate={validate}
                            num={1}
                            form={Form}
                            required={true}
                            error={Errors}
                            turno={Form.turno}
                        />
                        <HorarioSelect
                            onInputChange={onInputChange}
                            validate={validate}
                            num={2}
                            form={Form}
                            required={false}
                            error={Errors}
                            turno={Form.turno}
                        />
                    </div>
                    <div className="w-full flex flex-row justify-center !mt-7">
                        <button type="submit" className="btn-info-primary">{isModForm ? "Modificar carga" : "Inscribir carga"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CargaForm