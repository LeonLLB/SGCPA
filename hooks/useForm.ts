import { useState } from 'react'

interface TargetType {
    name: string,
    value: any
}

const useForm = (FormDefault = {}): any[] => {

    const [Form, setForm] = useState(FormDefault)

    const reset = (): void => {
        setForm(FormDefault)
    }

    const changeForm = (newForm: {}): void => {
        setForm(newForm)
    }


    const onInputChange = ({target}: {target: TargetType}): void => {
        setForm({
            ...Form,
            [target.name]:target.value
        })
    }

    return [Form, onInputChange, reset, changeForm]
}

export default useForm