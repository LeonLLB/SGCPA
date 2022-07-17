interface NumericValidatorInterface {
    state: boolean,
    value: Number
}

interface NumericRangeValidatorInterface {
    state: boolean,
    value: Number[]
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
    minMaxWords?: NumericRangeValidatorInterface
}

