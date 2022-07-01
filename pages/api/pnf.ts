import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        return prisma.pNF.create({
            data:{
                nombre:req.body.pnf,
                codigo:req.body.codigo
            }
        })
        .then((data)=>{
            return res.status(200).json({result:'PNF inscrito con exito',isOk:true,data})
        })
        .catch((e)=>{
            let response = {
                result:'PNF fallo al ser inscrito',
                motive:'',
                isOk:false,
                errorCode:e.code
            }
            if(e.code === 'P2002'){
                response.motive = 'Ya existe ese PNF con el mismo ' + e.meta.target[0]
            }
            else{
                response.motive = "desconocido"
            }
            return res.status(400).json(response)
        })
    }
    else if(req.method === 'DELETE'){
        return prisma.pNF.delete({
            where: {id:parseInt(req.body.id)}
        })
        .then((result)=>{
            return res.status(200).json({result:'PNF Eliminado correctamente!',isOk:true,resultado:result})
        })
        .catch(e=>{
            if(e.code === "P2025"){
                return res.status(404).json({result:'El elemento no existe',isOk:false,code:"P2025"})                
            }else{
                return res.status(400).json({result:'Falla desconocida',isOk:false,code:e.code})
            }
        })
       
    }
}

export default handler