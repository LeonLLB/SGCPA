import cargaControllers from "./controllers/cargaAcademica";
import presentacionControllers from "./controllers/defensa";
import docenteControllers from "./controllers/docente";
import estudianteControllers from "./controllers/estudiante";
import juradoControllers from "./controllers/jurado";
import pnfControllers from "./controllers/pnf";
import ponderacionControllers from "./controllers/ponderacion";
import proyectoControllers from "./controllers/proyecto";

const controllers = {
    cargaControllers,
    presentacionControllers,
    docenteControllers,
    estudianteControllers,
    juradoControllers,
    pnfControllers,
    ponderacionControllers,
    proyectoControllers
}

let didInit = false

const initDB = async () => {
    if(!didInit){
        for (const controller of Object.values(controllers)) {
            await controller.init()
        }
    }
}

initDB()

export default controllers