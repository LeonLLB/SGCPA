import { useState } from 'react'

const useForm = (FormDefault = {},onChangeCallback:(event:any)=>void = ()=>{}): any[] => {

    const [Form, setForm] = useState(FormDefault)

    const reset = (): void => {
        setForm(FormDefault)
    }

    const changeForm = (newForm: {}): void => {
        setForm(newForm)
    }


    const onInputChange = (event:any): void => {
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