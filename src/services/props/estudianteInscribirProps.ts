import pnfControllers from "../../database/controllers/pnf"

export default async () =>{

	const listadoDeCarreras = await pnfControllers.getMany()

	return {
		props: {
			listado:listadoDeCarreras
		}
	}
}