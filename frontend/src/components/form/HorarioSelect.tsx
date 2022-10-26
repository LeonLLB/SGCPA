import { ChangeEvent, FocusEvent } from 'react'
import DiaSelect from './DiaSelect'
import HoraSelect from './HoraSelect'

interface HorarioSelectProps {
  onInputChange: (e:(ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>))=>void
  validate: (e:FocusEvent<HTMLInputElement>)=>void
  num: number
  form: {[x:string]:any}
  required:boolean
  error: {[x:string]:any}
  turno: 'M' | 'T' | ''
}

const HorarioSelect = ({onInputChange,validate,num,form,required,error,turno}:HorarioSelectProps) => {
  return (
    <div className='flex flex-col items-center space-y-2'>
        <DiaSelect
            onInputChange={onInputChange}
            onBlur={validate}
            value={form[(num !== null)?`dia${num}`:'dia']}
            error={(error[(num !== null)?`dia${num}`:'dia'] !== undefined || error[(num !== null)?`dia${num}`:'dia'] !== null) ? error[(num !== null)?`dia${num}`:'dia'] : null}
            label={(num !== null)?`Día ${num}:`:'Día:'}
            name={(num !== null)?`dia${num}`:'dia'}
            required={required}
        />
        <HoraSelect
            onInputChange={onInputChange}
            turno={turno}
            onBlur={validate}
            value={form[(num !== null)?`horario${num}entrada`:'horarioentrada']}
            error={(error[(num !== null)?`horario${num}entrada`:'horarioentrada'] !== undefined || error[(num !== null)?`horario${num}entrada`:'horarioentrada'] !== null) ? error[(num !== null)?`horario${num}entrada`:'horarioentrada'] : null}
            label={(num !== null)?`Entrada ${num}:`:'Entrada:'}
            name={(num !== null)?`horario${num}entrada`:'horarioentrada'}
            required={required}
        />
        <HoraSelect
            onInputChange={onInputChange}
            turno={turno}
            onBlur={validate}
            value={form[(num !== null)?`horario${num}salida`:'horariosalida']}
            error={(error[(num !== null)?`horario${num}salida`:'horariosalida'] !== undefined || error[(num !== null)?`horario${num}salida`:'horariosalida'] !== null) ? error[(num !== null)?`horario${num}salida`:'horariosalida'] : null}
            label={(num !== null)?`Salida ${num}:`:'Salida:'}
            name={(num !== null)?`horario${num}salida`:'horariosalida'}
            required={required}
        />
    </div>
  )
}

export default HorarioSelect