import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
	
		return prisma.defensa.update({
			where: {
				id: parseInt(req.query.id as string)
			},
			data: {
				pnf:req.body.pnf,
        trayecto:parseInt(req.body.trayecto),
        periodo: req.body.periodo,
        preDefensa: ( 
            (req.body.diaPreDefensa !== '' && req.body.diaPreDefensa !== 'undefined') &&
            (req.body.mesPreDefensa !== '' && req.body.mesPreDefensa !== 'undefined') &&
            (req.body.yearPreDefensa !== '' && req.body.yearPreDefensa !== 'undefined') 
        ) ? new Date(parseInt(req.body.yearPreDefensa),parseInt(req.body.mesPreDefensa)-1,parseInt(req.body.diaPreDefensa)) : null,
        defensa: ( 
            (req.body.diaDefensa !== '' && req.body.diaDefensa !== 'undefined') &&
            (req.body.mesDefensa !== '' && req.body.mesDefensa !== 'undefined') &&
            (req.body.yearDefensa !== '' && req.body.yearDefensa !== 'undefined') 
        ) ? new Date(parseInt(req.body.yearDefensa),parseInt(req.body.mesDefensa)-1,parseInt(req.body.diaDefensa)) : null,
        aula: (req.body.aula !== '' && req.body.aula !== 'undefined') ? req.body.aula : null
			}
		})
			.then((data) => {					
        return res.status(200).json({ result: 'Presentación modificada con exito', isOk: true, data })
			})
			.catch((e) => {
				let response = {
					result: 'No se pudo modificar la presentación',
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