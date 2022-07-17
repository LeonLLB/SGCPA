import { NextApiRequest } from "next";
import prisma from "../prismaClient";


const existeDocente = async (req: NextApiRequest) : Promise<boolean> => {

    const result = await prisma.docente.count({
        where:{
            id:parseInt(req.query.id as string)
        }
    })

    return (result > 0) 

}

export {
    existeDocente
}