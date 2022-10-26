import { ChangeEvent, FC } from "react"
import FormError from "../../interfaces/formError"


interface AulaSelectProps {
    onInputChange: (e:ChangeEvent<HTMLSelectElement>)=>void,
    onBlur?: (e:any)=>void,
    value:string,
    className?: string,
    error: FormError,
    isCol?: boolean,
    label?: string,
    required:boolean,
    withNonNumericAulas?:boolean
}

const AulaSelect: FC<AulaSelectProps> = ({withNonNumericAulas=false,label = "Aula:",isCol=false,error,required,onInputChange,value,className,onBlur}) => {
  
    let aulas:any[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    if(withNonNumericAulas){
        aulas.push('Biblioteca')
        aulas.push('Lab. Informática')
        aulas.push('Lab. Agroalimentaria')
        aulas.push('Lab. Enfermería')
    }
  
    return (
    <>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor="aula">{label} </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name="aula" id="aula">
                    <option value="" disabled={required}></option>
                    {   aulas.map((aula,i)=>
                        <option key={i} value={aula}>{aula}</option>
                    )}
                </select>    
            </div>    
        </span>
        { error  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!error.required) &&
            <span className='text-red-600 text-sm'>* Aula: no puede estar vacío</span>
          }
          { (value !== '' && !error.minLength?.state) &&
            <span className='text-red-600 text-sm'>* Aula: debe tener un mínimo de {error.minLength?.value} caracteres</span>
          }
          { (value !== '' && !error.maxLength?.state) &&
            <span className='text-red-600 text-sm'>* Aula: debe tener un maximo de {error.maxLength?.value} caracteres </span>
          }
          { (value !== '' && !error.min?.state) &&
            <span className='text-red-600 text-sm'>* Aula: debe ser mayor a {error.min?.value} </span>
          }
          { (value !== '' && !error.max?.state) &&
            <span className='text-red-600 text-sm'>* Aula: debe ser menor a {error.max?.value} </span>
          }
          { (value !== '' && !error.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'>* Aula: debe tener entre {error.minMaxWords?.value[0]} y {error.minMaxWords?.value[1]} palabras</span>
          }
          { (value !== '' && !error.regex?.state) &&
            <span className='text-red-600 text-sm'>* Aula: debe coincidir con el patron {error.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default AulaSelect