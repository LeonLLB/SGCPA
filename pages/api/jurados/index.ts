import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'PUT'){
        return prisma.jurado.update({
            where: {
                id: parseInt(req.body.id as string)
            },
            data: {
                metodologoID:(req.body.metodologo !== '' && req.body.metodologo !== 'undefined') ? parseInt(req.body.metodologo) : null,
                academicoID:(req.body.academico !== '' && req.body.academico !== 'undefined') ? parseInt(req.body.academico) : null,
                adicionalID:(req.body.adicional !== '' && req.body.adicional !== 'undefined') ? parseInt(req.body.adicional) : null,
            }
        })
            .then((data) => {
                return res.status(200).json({ result: 'Comite modificado o asignado con exito', isOk: true, data })
            })
            .catch((e) => {
                let response = {
                    result: 'No se pudo modificar o asignar el comite',
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
    else if(req.method === 'GET'){
        let consulta = {}

        const ultimaJurado = await prisma.jurado.findFirst({
            orderBy:{
              periodo:'desc'
            },
            select:{
              periodo:true
            }
          })

        if(req.query.periodo !== '' && req.query.periodo !== undefined){
            consulta['periodo'] = {
                contains:req.query.periodo as string
            }
        }else{
            consulta['periodo'] = {
                contains:ultimaJurado.periodo
            }
        }
        if(req.query.pnf !== '' && req.query.pnf !== undefined){
            consulta['pnf'] = {
                contains:req.query.pnf as string
            }
        }
        if(req.query.trayecto !== '' && req.query.trayecto !== undefined){
            consulta['trayecto'] = parseInt(req.query.trayecto as string)
        }
        /* if(req.query.docente !== '' && req.query.docente !== undefined){
            consulta['asesor'] = parseInt(req.query.docente as string)
        } */
        return prisma.jurado.findMany({
            where: consulta,
            include:{
                asesor:true,
                metodologo:true,
                academico:true,
                adicional:true
            }
        })
        .then((data) => {
            return res.status(200).json({isOk:true,data})
        })
        .catch((e) => {
            let response = {
                result: 'No se pudo filtrar a los comites',
                motive: '',
                isOk: false,
                errorCode: e.code
            }
            if (e.code === null || e.code === undefined) {
                console.log(e)
                response.motive = "Error del servidor."
                return res.status(500).json(response)
            }
            else {
                response.motive = "No se pudo filtrar, error desconocido"
            }
            return res.status(400).json(response)
        })
    }
    
}

export default handler