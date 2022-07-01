import { ChangeEvent, FC } from "react"


interface TrayectoSelectProps {
    onInputChange: (e:ChangeEvent)=>void,
    onBlur: (e:any)=>void,
    value:string,
    className?: string,
    required:boolean
}

const TrayectoSelect: FC<TrayectoSelectProps> = ({required,onInputChange,value,className,onBlur}) => {
  
    const trayectos = ['I','II','III','IV']
  
    return (
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
  )
}

export default TrayectoSelect