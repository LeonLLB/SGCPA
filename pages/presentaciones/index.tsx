import prisma from "../../prismaClient"

const PresentacionesMain = () => {
  return (
    <div>PresentacionesMain</div>
  )
}

export default PresentacionesMain

export const getServerSideProps = async (context) =>{

  const ultimaCarga = await prisma.cargaAcademica.findFirst({
    orderBy:{
      periodo:'desc'
    },
    select:{
      periodo:true
    }
  })

  const listadoCargas = await prisma.cargaAcademica.findMany({
    include:{
      docente:true
    },
    orderBy:[
      {pnf:'desc'},
      {trayecto:'asc'}
    ],
    where:{
      periodo:ultimaCarga.periodo
    }
  })
  const listadoDocentes = await prisma.docente.findMany()
  const listadoPNF = await prisma.pNF.findMany()
   return {
       props: {
        listado:listadoCargas,
        listadoDocentes,
        listadoPNF
        }
    }
}