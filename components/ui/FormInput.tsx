import {ChangeEvent,FocusEvent, FC, HTMLInputTypeAttribute} from 'react'

interface FormInputProps {
    value: string,
    onInputChange: (event:ChangeEvent)=>void,
    onBlur: (event)=>void,
    classNameContainer?:string,
    classNameLabel?:string,
    classNameInput?:string,
    errors: any[],
    name: string,
    label: string,
    type: HTMLInputTypeAttribute,
}

const FormInput: FC<FormInputProps> = ({value,onInputChange,onBlur,classNameContainer,name,classNameInput,classNameLabel,errors,label,type}) => {
  return (
    <div className={`${classNameContainer}  flex flex-row justify-end items-center space-x-4`}>
        <label className={`${classNameLabel} `} htmlFor={name}>{label}</label>
        <div className='border border-gray-400 rounded-xl p-1'>
          <input type={type} onChange={onInputChange} onBlur={onBlur} name={name} id={name} className={`${classNameInput} transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300`} value={value}/>
        </div>
    </div>
  )
}

export default FormInput