import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   if(req.method === 'POST'){
      return prisma.estudiante.create({
         data:{
            nombre: req.body.nombre ,
            apellido: req.body.apellido ,
            cedula: parseInt(req.body.cedula),
            correo: req.body.correo ,
            telefono: req.body.telefono ,
            direccion: req.body.direccion ,
            pnf: req.body.pnf ,
            trayecto: parseInt(req.body.trayecto) 
         }
     })
     .then((data)=>{
         return res.status(200).json({result:'Estudiante inscrito con exito',isOk:true,data})
     })
     .catch((e)=>{
         let response = {
             result:'No se pudo inscribir al estudiante',
             motive:'',
             isOk:false,
             errorCode:e.code
         }
         if(e.code === 'P2002'){
             response.motive = 'Ya existe ese estudiante'
         }
         else if(e.code === null || e.code === undefined){
            response.motive = "Error del servidor."
            return res.status(500).json(response)
         }
         else{
             response.motive = "No se pudo inscribir, error desconocido"
         }
         return res.status(400).json(response)
     })
   }
}

export default handler