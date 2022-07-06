import { NextApiRequest, NextApiResponse } from "next";
import { existeCarga } from "../../../middlewares/Carga";
import prisma from "../../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'PUT') {
		if((await existeCarga(req)) === false){
			let response = {
				result: 'No existe la carga',
				isOk: false,
			}
			return res.status(404).json(response)
		}
		return prisma.cargaAcademica.update({
			where: {
				id: parseInt(req.query.id as string)
			},
			data: {
				pnf: req.body.pnf,
                trayecto: parseInt(req.body.trayecto as string),
                periodo: req.body.periodo,
                docenteID: parseInt(req.body.docenteID as string),
                turno: req.body.turno,
                horario1: `${req.body.dia1}T${req.body.horario1entrada}-${req.body.horario1salida}`,
                horario2: (req.body.dia2 !== '' && req.body.horario2entrada !== '' && req.body.horario2salida !== '' ) ? `${req.body.dia2}T${req.body.horario2entrada}-${req.body.horario2salida}` : null,
                aula: parseInt(req.body.aula as string)
			}
		})
			.then((data) => {
				console.log(data)
				return res.status(200).json({ result: 'Carga modificada con exito', isOk: true, data })
			})
			.catch((e) => {
				let response = {
					result: 'No se pudo modificar la carga',
					motive: '',
					isOk: false,
					errorCode: e.code
				}
				if (e.code === null || e.code === undefined) {
					response.motive = "Error del servidor."
					return res.status(500).json(response)
				}
				else {
					response.motive = "No se pudo modificar, error desconocido"
				}
				return res.status(400).json(response)
			})
	}
}

export default handler