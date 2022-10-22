interface NumericValidatorInterface {
    state: boolean,
    value: number[]
}

export default interface FormError {
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
    minMaxWords?: NumericValidatorInterface
}

