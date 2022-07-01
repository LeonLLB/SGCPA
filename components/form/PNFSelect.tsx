import { ChangeEvent, FC } from "react"
import PNF from "../../interfaces/PNF"

interface PNFSelectProps {
    onInputChange: (e:ChangeEvent)=>void,
    onBlur: (e:any)=>void,
    pnfList: PNF[],
    value:string,
    className?: string,
    required:boolean
}

const PNFSelect: FC<PNFSelectProps> = ({pnfList,required,onInputChange,value,className,onBlur}) => {
  
    return (
    <span className="flex flex-row items-center justify-end space-x-2">
        <label htmlFor="pnf">Programa Nacional de Formación: </label>
        
        <div className="border border-gray-400 p-1 rounded-xl">
            <select onBlur={onBlur} value={value} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name="pnf" id="pnf">
                <option value="" disabled={required}></option>
                {   pnfList.map(pnf=>
                    <option key={pnf.id} value={pnf.nombre}>{pnf.nombre}</option>
                )}
            </select>
        </div>
        
    </span>
  )
}

export default PNFSelect