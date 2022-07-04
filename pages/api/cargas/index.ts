import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return prisma.cargaAcademica.create({
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
                return res.status(200).json({ result: 'Carga inscrita con exito', isOk: true, data })
            })
            .catch((e) => {
                let response = {
                    result: 'No se pudo inscribir la carga',
                    motive: '',
                    isOk: false,
                    errorCode: e.code
                }
                if (e.code === null || e.code === undefined) {
                    response.motive = "Error del servidor."
                    return res.status(500).json(response)
                }
                else {
                    response.motive = "No se pudo inscribir, error desconocido"
                }
                return res.status(400).json(response)
            })
    }
    else if (req.method === 'GET') {
        
            return res.status(400).json({isOk:false, result: 'non implemented'})
        
    }
    else if(req.method === 'DELETE'){
        return prisma.cargaAcademica.delete({
            where: {id:parseInt(req.body.id)}
        })
        .then((result)=>{
            return res.status(200).json({result:'Carga eliminada correctamente!',isOk:true,resultado:result})
        })
        .catch(e=>{
            if(e.code === "P2025"){
                return res.status(404).json({result:'El elemento no existe',isOk:false,code:"P2025"})                
            }else{
                console.log(e)
                return res.status(400).json({result:'Falla desconocida',isOk:false,code:e.code})
            }
        })
    }
}

export default handler