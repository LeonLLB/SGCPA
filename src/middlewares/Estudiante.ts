import { NextApiRequest } from "next";
import prisma from "../prismaClient";


const existeEstudiante = async (req: NextApiRequest) : Promise<boolean> => {

    const result = await prisma.estudiante.count({
        where:{
            id:parseInt(req.query.id as string)
        }
    })

    return (result > 0) 

}

export {
    existeEstudiante
}