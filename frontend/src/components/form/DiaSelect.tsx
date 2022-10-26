import { ChangeEvent, FC } from "react"
import FormError from "../../interfaces/formError"


interface DiaSelectProps {
    onInputChange: (e:ChangeEvent<HTMLSelectElement>)=>void,
    onBlur?: (e:any)=>void,
    value:string,
    className?: string,
    error?: FormError | null,
    isCol?: boolean,
    label: string,
    name: string,
    required:boolean
}

const DiaSelect: FC<DiaSelectProps> = ({name,label,isCol=false,error,required,onInputChange,value,className,onBlur}) => {
  
    const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes']
  
    return (
    <>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor={name}>{label} </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name={name} id={name}>
                    <option value="" disabled={required}></option>
                    {   dias.map((dia,i)=>
                        <option key={i} value={dia}>{dia}</option>
                    )}
                </select>    
            </div>    
        </span>
        { error  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!error.required) &&
            <span className='text-red-600 text-sm'>* {label} no puede estar vacío</span>
          }
          { (value !== '' && !error.minLength?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe tener un mínimo de {error.minLength?.value} caracteres</span>
          }
          { (value !== '' && !error.maxLength?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe tener un maximo de {error.maxLength?.value} caracteres </span>
          }
          { (value !== '' && !error.min?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe ser mayor a {error.min?.value} </span>
          }
          { (value !== '' && !error.max?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe ser menor a {error.max?.value} </span>
          }
          { (value !== '' && !error.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe tener entre {error.minMaxWords?.value[0]} y {error.minMaxWords?.value[1]} palabras</span>
          }
          { (value !== '' && !error.regex?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe coincidir con el patron {error.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default DiaSelect