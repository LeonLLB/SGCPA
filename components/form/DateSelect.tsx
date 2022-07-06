import {ChangeEvent, FC} from 'react'

interface DateName {
    dia:string,
    mes:string,
    year:string
}

interface DateSelectProps {
    onInputChange: (e:ChangeEvent)=>void,
    onBlur?: (e:any)=>void,
    value:DateName,
    className?: string,
    isCol?: boolean,
    label: DateName,
    required:boolean,
    periodo:string,
    name:DateName,
    mainLabel:string
}

const DateSelect:FC<DateSelectProps> = ({mainLabel,periodo,name,label,isCol=false,required,onInputChange,value,className,onBlur}) => {

    let values = {
        dates:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        months:[1,2,3,4,5,6,7,8,9,10,11,12],
        years:[]
    }

    if(periodo !== ''){
        values.years=[periodo,parseInt(periodo)+1]
    }

  return (
    <div className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
        <span>
            {mainLabel}
        </span>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor={name.dia}>{label.dia} </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value.dia} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name={name.dia} id={name.dia}>
                    <option value="" disabled={required}></option>
                    {  values.dates.map((dia,i)=>
                        <option key={i} value={dia}>{dia}</option>
                    )}
                </select>    
            </div>    
        </span>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor={name.mes}>{label.mes} </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value.mes} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name={name.mes} id={name.mes}>
                    <option value="" disabled={required}></option>
                    {  values.months.map((mes,i)=>
                        <option key={i} value={mes}>{mes}</option>
                    )}
                </select>    
            </div>    
        </span>
        <span className={`flex ${isCol?"flex-col":"flex-row"} items-center justify-end space-x-2`}>
            <label htmlFor={name.year}>{label.year} </label>
            <div className="border border-gray-400 p-1 rounded-xl">
                <select onBlur={onBlur} value={value.year} className={` h-full transition-colors duration-200 focus:border-2 focus:bg-gray-200 focus:border-blue-500 outline-none p-2 rounded-lg border-2 border-gray-400 bg-gray-300 focus:outline-none focus:shadow-outline ${className}`} onChange={onInputChange} name={name.year} id={name.year}>
                    <option value="" disabled={required}></option>
                    {  (periodo !== null) && values.years.map((year,i)=>
                        <option key={i} value={year}>{year}</option>
                    )}
                </select>    
            </div>    
        </span>
    </div>
  )
}

export default DateSelect