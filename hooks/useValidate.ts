import {useState} from 'react'

interface NumericValidatorInterface {
    state: boolean,
    value: Number
}

export interface FormDataInterface {
    required: boolean,
    min?: NumericValidatorInterface,
    max?: NumericValidatorInterface,
    minLength?: NumericValidatorInterface,
    maxLength?: NumericValidatorInterface,
    regex?:{
        state:boolean,
        exp:RegExp,
        example:any
    },
    mustMatch?:{
        state:boolean,
        comparable:any,
        comparableLabel:string
    },
    minMaxWords?: {
        state:boolean,
        value:number[]
    }
}

const useValidate = (FormData: any) => {
    const [Errors, setErrors] = useState<any>({})
    const ErrorSyncState = {
        value:{},
        setValue(state){
            this.value = state
        },
        reset(){
            this.value = {}
        }
    }

    const forceValidate = (formValues,isModForm:boolean=true) =>{
        Object.entries(formValues).forEach(([name,value])=>{
            validate({target:{name,value}},false,( isModForm ? (Object.values(formValues).length) + 1 : (Object.values(formValues).length) ))
        })
    }
    
    const validate = ({target:{name,value}},single:boolean=true,formLength:number=1) => {
        let i = 0
        Object.entries<FormDataInterface>(FormData).forEach(([Name,Value]: [String, FormDataInterface]) => {
            i += 1
            if(name === Name){
                // Ejecutar validaciones

                // ES REQUERIDO, PERO ESTA VACIO
                if(Value.required && value === ''){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            required:false
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            required:true
                        }
                    })
                }

                // TIENE UN VALOR MINIMO, PERO ESTA DEBAJO DE EL
                if(Value.min && value < Value.min){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            min:{
                                state:false,
                                value:Value.min
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            min:{
                                state:true,
                                value:Value.min
                            }
                        }
                    })
                }

                // TIENE UN VALOR MAXIMO, PERO ES MAYOR DE EL
                if(Value.max && value > Value.max){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            max:{
                                state:false,
                                value:Value.max
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            max:{
                                state:true,
                                value:Value.max
                            }
                        }
                    })
                }

                // EN CASO SEA DE QUE LA LONGITUD SEA MENOR A LA INDICADA
                if(Value.minLength && value.length < Value.minLength){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            minLength:{
                                state:false,
                                value:Value.minLength
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            minLength:{
                                state:true,
                                value:Value.minLength
                            }
                        }
                    })
                }

                // EN CASO SU VALOR A COMPARAR NO SEA IGUAL AL VALOR ACTUAL
                if(Value.mustMatch && value !== Value.mustMatch.comparable){
                    
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            mustMatch:{
                                state:false,
                                comparable:Value.mustMatch.comparable,
                                comparableLabel:Value.mustMatch.comparableLabel
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            mustMatch:{
                                state:true,
                                comparable:Value.mustMatch?.comparable,
                                comparableLabel:Value.mustMatch?.comparableLabel
                            }
                        }
                    })
                }

                // EN CASO SEA DE QUE LA LONGITUD SEA MAYOR A LA INDICADA
                if(Value.maxLength && value.length > Value.maxLength){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            maxLength:{
                                state:false,
                                value:Value.maxLength
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            maxLength:{
                                state:true,
                                value:Value.maxLength
                            }
                        }
                    })
                }

                // EN CASO DE NO CUMPLIR SU EXPRESION REGULAR
                if(Value.regex && Value.regex.exp.test(value) === false){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            regex:{
                                state:false,
                                exp:Value.regex.exp,
                                example:Value.regex.example,
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            regex:{
                                state:true,
                                exp:Value.regex?.exp,
                                example:Value.regex?.example,
                            }
                        }
                    })
                }

                //EN CASO DE NO CUMPLIR EL RANGO DE PALABRAS MAXIMA Y MINIMA
                if(Value.minMaxWords && (value.split(' ').length < Value.minMaxWords[0] || value.split(' ').length > Value.minMaxWords[1])){
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            minMaxWords:{
                                state:false,
                                value:Value.minMaxWords
                            }
                        }
                    })
                }
                else{
                    ErrorSyncState.setValue({
                        ...ErrorSyncState.value,
                        [name]:{
                            ...ErrorSyncState.value[name],
                            minMaxWords:{
                                state:true,
                                value:Value.minMaxWords
                            }
                        }
                    })
                }

                setErrors({
                    ...Errors,
                    ...ErrorSyncState.value
                })
                if(
                    single === false && i === formLength ||
                    single
                ){
                    ErrorSyncState.reset()
                }
                return
            }
            else if(FormData[name] === undefined && name !== 'id'){
                throw new Error('UNREGISTERED FIELD '+name)
            }
        })
    }

    const isItValid = () => {

        if(Object.values(Errors).length !== Object.values(FormData).length){
            return false
        }

        let isValid = false
        
        Object.values(Errors).some((Error: FormDataInterface) => {
            if(
                Error.required &&
                Error.min?.state &&
                Error.max?.state &&
                Error.minLength?.state &&
                Error.maxLength?.state &&
                Error.regex?.state &&
                Error.minMaxWords?.state 
            ){
                isValid = true
            }
            else{
                isValid = false
                return true
            }
        })
        return isValid
    }

    return {Errors,isItValid, validate,forceValidate}
}

export default useValidate