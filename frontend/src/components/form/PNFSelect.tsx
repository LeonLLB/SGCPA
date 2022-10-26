import { ChangeEvent, FC, useEffect, useState } from "react"
import FormError from "../../interfaces/formError"
import * as PNFController from '../../../wailsjs/go/database/PNF'
import { database } from "../../../wailsjs/go/models"

interface PNFSelectProps {
    onInputChange: (e:ChangeEvent<HTMLSelectElement>)=>void,
    onBlur?: (e:any)=>void,
    value:string,
    className?: string,
    error: FormError | null,
    isCol?: boolean,
    label?: string,
    required:boolean
}

const PNFSelect: FC<PNFSelectProps> = ({label = "Programa Nacional de Formación:",isCol = false,error,required,onInputChange,value,className,onBlur}) => {
    const [pnfList, setPnfList] = useState<database.PNF[]>([])

    useEffect(() => {
      PNFController.GetAll().then((pnfs)=>setPnfList(pnfs))    
    }, [])    

    return (
    <>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor="pnf">{label}</label>
            
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name="pnf" id="pnf">
                    <option value="" disabled={required}></option>
                    {   pnfList.map(pnf=>
                        <option key={pnf.id} value={pnf.nombre}>{pnf.nombre}</option>
                    )}
                </select>
            </div>
            
        </span>
        { error  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!error.required) &&
            <span className='text-red-600 text-sm'>* PNF: no puede estar vacío</span>
          }
          { (value !== '' && !error.minLength?.state) &&
            <span className='text-red-600 text-sm'>* PNF: debe tener un mínimo de {error.minLength?.value} caracteres</span>
          }
          { (value !== '' && !error.maxLength?.state) &&
            <span className='text-red-600 text-sm'>* PNF: debe tener un maximo de {error.maxLength?.value} caracteres </span>
          }
          { (value !== '' && !error.min?.state) &&
            <span className='text-red-600 text-sm'>* PNF: debe ser mayor a {error.min?.value} </span>
          }
          { (value !== '' && !error.max?.state) &&
            <span className='text-red-600 text-sm'>* PNF: debe ser menor a {error.max?.value} </span>
          }
          { (value !== '' && !error.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'>* PNF: debe tener entre {error.minMaxWords?.value[0]} y {error.minMaxWords?.value[1]} palabras</span>
          }
          { (value !== '' && !error.regex?.state) &&
            <span className='text-red-600 text-sm'>* PNF: debe coincidir con el patron {error.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default PNFSelect