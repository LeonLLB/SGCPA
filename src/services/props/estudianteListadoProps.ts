import c from "../../database"

const defProps = async () =>{
    const {estudianteControllers, pnfControllers} = c
    
    const listadoEstudiantes = await estudianteControllers.getAll()
    const listadoPNF = await pnfControllers.getMany()
     return {
         props: {
          listado:listadoEstudiantes.value,
          listadoPNF
          }
      }
}

export default defProps