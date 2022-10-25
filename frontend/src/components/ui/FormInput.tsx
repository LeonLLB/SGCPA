import {ChangeEvent,FocusEvent, FC, HTMLInputTypeAttribute} from 'react'
import FormError from '../../interfaces/formError'

interface FormInputProps {
    value: string,
    onInputChange: (event:ChangeEvent<HTMLInputElement>)=>void,
    onBlur?: (event:FocusEvent<HTMLInputElement>)=>void,
    classNameContainer?:string,
    classNameLabel?:string,
    classNameInput?:string,
    errors: FormError | null,
    name: string,
    label: string,
    isCol?:boolean,
    type: HTMLInputTypeAttribute,
}

const FormInput: FC<FormInputProps> = ({isCol = false,value,onInputChange,onBlur,classNameContainer,name,classNameInput,classNameLabel,errors,label,type}) => {
  return (
    <>
      <div className={`${classNameContainer}  flex ${isCol?"flex-col":"flex-row"} justify-end items-center space-x-4`}>
          <label className={`${classNameLabel} `} htmlFor={name}>{label}</label>
          <div className='border border-gray-400 rounded-xl p-1'>
            <input type={type} onChange={onInputChange} onBlur={onBlur} name={name} id={name} className={`${classNameInput} transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300`} value={value}/>
          </div>
      </div>
      { errors  && 
        <div className='flex flex-col items-end space-y-2'>
          { (!errors.required) &&
            <span className='text-red-600 text-sm'>* {label} no puede estar vacío</span>
          }
          { (value !== '' && !errors.minLength?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe tener un mínimo de {errors.minLength?.value} caracteres</span>
          }
          { (value !== '' && !errors.maxLength?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe tener un maximo de {errors.maxLength?.value} caracteres </span>
          }
          { (value !== '' && !errors.min?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe ser mayor a {errors.min?.value} </span>
          }
          { (value !== '' && !errors.max?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe ser menor a {errors.max?.value} </span>
          }
          { (value !== '' && !errors.minMaxWords?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe tener entre {errors.minMaxWords?.value[0]} y {errors.minMaxWords?.value[1]} palabras</span>
          }
          { (value !== '' && !errors.regex?.state) &&
            <span className='text-red-600 text-sm'>* {label} debe coincidir con el patron {errors.regex?.example}</span>
          }
        </div>
      }  
    </>
  )
}

export default FormInput