import c from '../../database'

const defProps = async (id:number) =>{
    
    const estudianteAModificar = await c.estudianteControllers.getUnique(id)

    const listadoDeCarreras = await c.pnfControllers.getMany()

	return {
		props: {
			listado:listadoDeCarreras,
            estudiante:estudianteAModificar
		}
	}
}

export default defProps