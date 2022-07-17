import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return prisma.defensa.create({
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
            return res.status(200).json({ result: 'Presentación asignada con exito', isOk: true, data })
        })
        .catch((e) => {
            let response = {
                result: 'No se pudo asignar la presentación',
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
    else if(req.method === 'GET'){
        let consulta = {}

        const ultimaCarga = await prisma.cargaAcademica.findFirst({
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
                contains:ultimaCarga.periodo
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
        return prisma.defensa.findMany({
            where: consulta,
            orderBy:[
              {pnf:'desc'},
              {trayecto:'asc'}
            ],
            
        })
        .then((data) => {
            return res.status(200).json({isOk:true,data})
        })
        .catch((e) => {
            let response = {
                result: 'No se pudo filtrar las presentaciones',
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
    else if(req.method === 'DELETE'){
        return prisma.defensa.delete({
            where: {id:parseInt(req.body.id)}
        })
        .then((result)=>{
            return res.status(200).json({result:'Presentación eliminada correctamente!',isOk:true,resultado:result})
            
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