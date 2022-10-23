export const translateDbError = (errorCode: number) : string => {
    if(errorCode === 19) return 'El registro ya existe'    
    return 'Error desconocido ' + errorCode
}