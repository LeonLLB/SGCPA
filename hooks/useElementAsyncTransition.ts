import {useState} from 'react'

const useElementAsyncTransition = (timeoutClosing:number=200) => {

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