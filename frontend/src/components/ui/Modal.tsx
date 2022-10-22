import {FC,MouseEvent, ReactElement} from 'react'

interface propsModal {
    title:string,
    onClose:()=>void,
    closing:boolean,
    children:ReactElement,
    className?:string
}

const Modal : FC<propsModal> = ({className,title,onClose,closing,children}) => {
  
    const onModalClose = (event:MouseEvent) => {
        event.preventDefault();
        onClose()
    }
  
    return (
    <div className='modal-container'>

        <div onClick={onModalClose} className={` modal-background ${closing? "opacity-0 bg-transparent closing-modal":"opacity-50 bg-gray-900 opening-modal"}`}></div>
        <div className={`modal-body-container rounded-lg ${closing? "opacity-0":"opacity-100 opening-modal-body"} ${className}`}>
            <div className='flex flex-row justify-between items-center border-b-2 border-gray-400 px-4 py-1'>
                <h2 className='text-xl'>{title}</h2>
                <button className='flex justify-center text-red-600 items-center' onClick={onModalClose}>
                    <span className="material-icons text-3xl">close</span>
                </button>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal