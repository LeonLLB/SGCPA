import pnfControllers from "../../database/controllers/pnf"


const defProps = async (context) =>{

	const listadoDeCarreras = await pnfControllers.getMany()

	return {
		props: {
			listado:listadoDeCarreras
		}
	}
}

export default defProps