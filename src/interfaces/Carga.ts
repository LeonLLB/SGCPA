import Docente from "./Docente"

interface Carga {
    id:number,
    pnf: string,
    trayecto: number,
    periodo: string,
    docente: Docente,
    turno: string,
    horario1: string,
    horario2?: string,
    aula: number
}

export default Carga
