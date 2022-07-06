import Docente from "./Docente"

interface Jurado {
    id:number,
    pnf: string,
    trayecto: number,
    periodo: string,
    asesor: Docente,
    metodologo?: Docente,
    academico?: Docente,
    adicional?: Docente
}

export default Jurado
