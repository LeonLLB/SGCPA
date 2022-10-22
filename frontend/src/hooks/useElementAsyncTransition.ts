import {useState} from 'react'

export interface ElementAsyncTransition {
    Visible: boolean
    Closing: boolean
    Interaction: () => void
} 

const useElementAsyncTransition = (timeoutClosing:number=200) : ElementAsyncTransition => {

    const [Visible, setVisible] = useState(false);
    const [Closing, setClosing] = useState(false);

    const Interaction = () => {
        if(Visible){
            setClosing(true);
            setTimeout(()=>{
                setVisible(false);
                setClosing(false);
            },timeoutClosing)
        }else{
            setVisible(true);
        }
    }

    return {Visible,Closing,Interaction}

}

export default useElementAsyncTransition