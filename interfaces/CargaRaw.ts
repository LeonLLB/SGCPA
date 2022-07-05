interface CargaRaw {
    id:number,
    pnf: string,
    trayecto: number,
    periodo: string,
    docenteID: number
    turno: string,
    horario1: string,
    horario2?: string,
    aula: number
}

export default CargaRaw