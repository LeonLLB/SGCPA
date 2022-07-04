import { ChangeEvent, FC } from "react"
import FormError from "../../interfaces/formError"
import Docente from "../../interfaces/Docente"

interface DocentesSelectProps {
    onInputChange: (e:ChangeEvent)=>void,
    onBlur?: (e:any)=>void,
    docenteList: Docente[],
    value:string,
    className?: string,
    error: FormError,
    isCol?: boolean,
    label?: string,
    required:boolean
}

const DocentesSelect: FC<DocentesSelectProps> = ({label = "Docente:",isCol = false,error,docenteList,required,onInputChange,value,className,onBlur}) => {
  
    return (
    <>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor="docenteID">{label}</label>
            
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name="docenteID" id="docenteID">
                    <option value="" disabled={required}></option>
                    {   docenteList.map(docente=>
                        <option key={docente.id} value={docente.id}>{docente.nombre} {docente.apellido}</option>
                    )}
                </select>
            </div>
            
        </span>
        { error  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!error.required) &&
            <span className='text-red-600 text-sm'>* Docente: no puede estar vacío</span>
          }
          { (value !== '' && !error.minLength?.state) &&
            <span className='text-red-600 text-sm'>* Docente: debe tener un mínimo de {error.minLength?.value} caracteres</span>
          }
          { (value !== '' && !error.maxLength?.state) &&
            <span className='text-red-600 text-sm'>* Docente: debe tener un maximo de {error.maxLength?.value} caracteres </span>
          }
          { (value !== '' && !error.min?.state) &&
            <span className='text-red-600 text-sm'>* Docente: debe ser mayor a {error.min?.value} </span>
          }
          { (value !== '' && !error.max?.state) &&
            <span className='text-red-600 text-sm'>* Docente: debe ser menor a {error.max?.value} </span>
          }
          { (value !== '' && !error.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'>* Docente: debe tener entre {error.minMaxWords?.value[0]} y {error.minMaxWords?.value[1]} palabras</span>
          }
          { (value !== '' && !error.regex?.state) &&
            <span className='text-red-600 text-sm'>* Docente: debe coincidir con el patron {error.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default DocentesSelect