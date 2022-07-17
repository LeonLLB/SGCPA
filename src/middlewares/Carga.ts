import { NextApiRequest } from "next";
import prisma from "../prismaClient";


const existeCarga = async (req: NextApiRequest) : Promise<boolean> => {

    const result = await prisma.cargaAcademica.count({
        where:{
            id:parseInt(req.query.id as string)
        }
    })

    return (result > 0) 

}

export {
    existeCarga
}