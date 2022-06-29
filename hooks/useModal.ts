import {useState} from 'react'

const useModal = (timeoutClosing:number=200) => {

    const [ModalVisible, setModalVisible] = useState(false);
    const [ModalClosing, setModalClosing] = useState(false);

    const ModalInteraction = () => {
        if(ModalVisible){
            setModalClosing(true);
            setTimeout(()=>{
                setModalVisible(false);
                setModalClosing(false);
            },timeoutClosing)
        }else{
            setModalVisible(true);
        }
    }

    return {ModalVisible,ModalClosing,ModalInteraction}

}

export default useModal