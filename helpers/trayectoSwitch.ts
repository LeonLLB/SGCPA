
const trayectoSwitch = (trayecto: number) : string => {
    switch(trayecto){
        case 1:
            return 'I'
        case 2:
            return 'II'
        case 3:
            return 'III'
        case 4:
            return 'IV'
        default:
            return 'N/A'
    }
}

export default trayectoSwitch