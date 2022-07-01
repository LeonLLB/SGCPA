import { ChangeEvent, FC } from "react"
import FormError from "../../interfaces/formError"


interface TrayectoSelectProps {
    onInputChange: (e:ChangeEvent)=>void,
    onBlur: (e:any)=>void,
    value:string,
    className?: string,
    error: FormError,
    required:boolean
}

const TrayectoSelect: FC<TrayectoSelectProps> = ({error,required,onInputChange,value,className,onBlur}) => {
  
    const trayectos = ['I','II','III','IV']
  
    return (
    <>
        <span className="flex flex-row items-center justify-end space-x-2">
            <label htmlFor="trayecto">Trayecto: </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value} className={` font-serif h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name="trayecto" id="trayecto">
                    <option value="" disabled={required}></option>
                    {   trayectos.map((trayecto,i)=>
                        <option key={i} value={i+1}>{trayecto}</option>
                    )}
                </select>    
            </div>    
        </span>
        { error  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!error.required) &&
            <span className='text-red-600 text-sm'>* Trayecto: no puede estar vacío</span>
          }
          { (value !== '' && !error.minLength?.state) &&
            <span className='text-red-600 text-sm'>* Trayecto: debe tener un mínimo de {error.minLength?.value} caracteres</span>
          }
          { (value !== '' && !error.maxLength?.state) &&
            <span className='text-red-600 text-sm'>* Trayecto: debe tener un maximo de {error.maxLength?.value} caracteres </span>
          }
          { (value !== '' && !error.min?.state) &&
            <span className='text-red-600 text-sm'>* Trayecto: debe ser mayor a {error.min?.value} </span>
          }
          { (value !== '' && !error.max?.state) &&
            <span className='text-red-600 text-sm'>* Trayecto: debe ser menor a {error.max?.value} </span>
          }
          { (value !== '' && !error.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'>* Trayecto: debe tener entre {error.minMaxWords?.value[0]} y {error.minMaxWords?.value[1]} palabras</span>
          }
          { (value !== '' && !error.regex?.state) &&
            <span className='text-red-600 text-sm'>* Trayecto: debe coincidir con el patron {error.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default TrayectoSelect