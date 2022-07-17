import { ChangeEvent, FC } from "react"
import FormError from "../../interfaces/formError"


interface HoraSelectProps {
    onInputChange: (e:ChangeEvent)=>void,
    onBlur?: (e:any)=>void,
    value:string,
    className?: string,
    error: FormError,
    isCol?: boolean,
    label: string,
    turno: 'M' | 'T',
    required:boolean,
    name:string
}

const HoraSelect: FC<HoraSelectProps> = ({name,turno,label,isCol=false,error,required,onInputChange,value,className,onBlur}) => {
  
    const horario = {
        M:[
            '07:00',
            '07:50',
            '08:40',
            '09:30',
            '10:20',
            '11:10',
            '12:00',
        ],
        T:[
            '12:30',
            '01:20',
            '02:10',
            '03:00',
            '03:50',
            '04:40',
            '05:30', 
        ],
    }
  
    return (
    <>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor={name}>{label} </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name={name} id={name}>
                    <option value="" disabled={required}></option>
                    {  (turno !== '' && turno !== null) && horario[turno].map((hora,i)=>
                        <option key={i} value={hora}>{hora}</option>
                    )}
                </select>    
            </div>    
        </span>
        { error  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!error.required) &&
            <span className='text-red-600 text-sm'><>* {label} no puede estar vacío</></span>
          }
          { (value !== '' && !error.minLength?.state) &&
            <span className='text-red-600 text-sm'><>* {label} debe tener un mínimo de {error.minLength?.value} caracteres</></span>
          }
          { (value !== '' && !error.maxLength?.state) &&
            <span className='text-red-600 text-sm'><>* {label} debe tener un maximo de {error.maxLength?.value} caracteres </></span>
          }
          { (value !== '' && !error.min?.state) &&
            <span className='text-red-600 text-sm'><>* {label} debe ser mayor a {error.min?.value} </></span>
          }
          { (value !== '' && !error.max?.state) &&
            <span className='text-red-600 text-sm'><>* {label} debe ser menor a {error.max?.value} </></span>
          }
          { (value !== '' && !error.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'><>* {label} debe tener entre {error.minMaxWords?.value[0]} y {error.minMaxWords?.value[1]} palabras</></span>
          }
          { (value !== '' && !error.regex?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe coincidir con el patron {error.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default HoraSelect