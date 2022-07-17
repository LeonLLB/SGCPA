import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return prisma.estudiante.create({
            data: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                cedula: parseInt(req.body.cedula),
                correo: req.body.correo,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                pnf: req.body.pnf,
                trayecto: parseInt(req.body.trayecto)
            }
        })
            .then((data) => {
                return res.status(200).json({ result: 'Estudiante inscrito con exito', isOk: true, data })
            })
            .catch((e) => {
                let response = {
                    result: 'No se pudo inscribir al estudiante',
                    motive: '',
                    isOk: false,
                    errorCode: e.code
                }
                if (e.code === 'P2002') {
                    response.motive = 'Ya existe ese estudiante'
                }
                else if (e.code === null || e.code === undefined) {
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
        let consulta = {}
        if(req.query.nombre !== ''){
            consulta['nombre'] = {
                contains:req.query.nombre as string
            }
        }
        if(req.query.apellido !== ''){
            consulta['apellido'] = {
                contains:req.query.apellido as string
            }
        }
        if(req.query.correo !== ''){
            consulta['correo'] = {
                contains:req.query.correo as string
            }
        }
        if(req.query.tlf !== ''){
            consulta['telefono'] = {
                contains:req.query.tlf as string
            }
        }
        if(req.query.direccion !== ''){
            consulta['direccion'] = {
                contains:req.query.direccion as string
            }
        }
        if(req.query.pnf !== ''){
            consulta['pnf'] = req.query.pnf as string
        }
        if(req.query.ci !== ''){
            consulta['cedula'] = parseInt(req.query.ci as string)
        }
        if(req.query.tra !== ''){
            consulta['trayecto'] = parseInt(req.query.tra as string)
        }
        return prisma.estudiante.findMany({
            where: consulta
        })
        .then((data) => {
            return res.status(200).json({isOk:true,data})
        })
        .catch((e) => {
            let response = {
                result: 'No se pudo filtrar a los estudiantes',
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
        return prisma.estudiante.delete({
            where: {id:parseInt(req.body.id)}
        })
        .then((result)=>{
            return res.status(200).json({result:'Estudiante Eliminado correctamente!',isOk:true,resultado:result})
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