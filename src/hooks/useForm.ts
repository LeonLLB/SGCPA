import { ChangeEvent, useState } from 'react'

interface TargetType {
    name: string,
    value: any
}

const useForm = (FormDefault = {},onChangeCallback:(event)=>void = ()=>{}): any[] => {

    const [Form, setForm] = useState(FormDefault)

    const reset = (): void => {
        setForm(FormDefault)
    }

    const changeForm = (newForm: {}): void => {
        setForm(newForm)
    }


    const onInputChange = (event): void => {
        const {target} = event
        setForm({
            ...Form,
            [target.name]:target.value
        })
        onChangeCallback(event)
    }

    return [Form, onInputChange, reset, changeForm]
}

export default useForm