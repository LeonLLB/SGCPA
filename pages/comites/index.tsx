import Jurado from "../../interfaces/Jurado"
import prisma from "../../prismaClient"
import { useState, useEffect, MouseEvent } from "react";
import useElementAsyncTransition from "../../hooks/useElementAsyncTransition";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import FormInput from "../../components/ui/FormInput";
import PNFSelect from "../../components/form/PNFSelect";
import TrayectoSelect from "../../components/form/TrayectoSelect";
import DocentesSelect from "../../components/form/DocenteSelect";
import trayectoSwitch from "../../helpers/trayectoSwitch";
import Modal from "../../components/ui/Modal";

const ComitesEvaluadoresMain = (props) => {
  const primerListado = props.listado

  const [listado, setListado] = useState<Jurado[]>([])
  const [JuradoId, setJuradoId] = useState(null)
  const confirmModalState = useElementAsyncTransition(200)

  const [FilterForm, onInputChange, reset] = useForm({
    periodo: "",
    pnf: "",
    trayecto: "",
    docenteID: "",
    JuradosPorPagina: ""
  })

  const [UpdateForm, onUpdateInputChange,resetUpdate,changeForm] = useForm({
    metodologo: "",
    academico: "",
    adicional: ""
  })

  useEffect(() => {
    if (primerListado !== null) {
      setListado(primerListado)
    }
  }, [])

  const onJuradoPreModify = (event: MouseEvent, id: number) => {
    event.preventDefault()
    setJuradoId(id)
    const juradoAModificar = listado.find(jurado => jurado.id === id)
    changeForm({
      metodologo: (juradoAModificar.metodologo === null) ? "" : `${juradoAModificar.metodologo.id}`,
      academico: (juradoAModificar.academico === null) ? "" : `${juradoAModificar.academico.id}`,
      adicional: (juradoAModificar.adicional === null) ? "" : `${juradoAModificar.adicional.id}`
    })
    confirmModalState.Interaction()
  }

  const onJuradoModify = () => {
    const toastReference = toast.loading('Modificando comite evaluador...')
    fetch('/api/jurados', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:JuradoId,...UpdateForm})
    })
      .then(res => res.json())
      .then(res => {
        if (res.isOk) {
          toast.update(toastReference, { closeButton: true, closeOnClick: true, render: res.result, type: 'success', isLoading: false, autoClose: 4000 })
          filterJurados(true)
          reset()
        }
        else {
          toast.update(toastReference, { closeButton: true, closeOnClick: true, render: res.result, type: 'error', isLoading: false, autoClose: 4000 })
        }
        setJuradoId(0)
        confirmModalState.Interaction()
      })
  }

  const filterJurados = (clean: boolean = false) => {
    const URL = (clean === false) ?
      `/api/jurados?periodo=${FilterForm.periodo}&pnf=${FilterForm.pnf}&trayecto=${FilterForm.trayecto}&docente=${FilterForm.docenteID}` :
      `/api/jurados?periodo=&pnf=&trayecto=&docente=`;
    const toastReference = toast.loading('Filtrando comites...')
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        if (res.isOk) {
          setListado(res.data)
          console.log(res.data)
          toast.update(toastReference, { closeButton: true, closeOnClick: true, render: 'Operación culminada', type: 'info', isLoading: false, autoClose: 4000 })
        }
        else {
          toast.update(toastReference, { closeButton: true, closeOnClick: true, render: res.result, type: 'error', isLoading: false, autoClose: 4000 })
        }
      })
  }

  return (
    <>
      <div className="mt-5 flex flex-row items-center justify-center">
        <div className="w-full flex flex-col items-center space-y-4 justify-center">

          <h2>Listado de comites evaluadores</h2>
          <span>Opciones de filtrado</span>
          <div className=' grid md:grid-cols-3 grid-cols-2 gap-2'>
            <FormInput
              value={FilterForm.periodo}
              onInputChange={onInputChange}
              errors={null}
              name="periodo"
              label="Año"
              isCol={true}
              type="text"
            />
            <PNFSelect
              value={FilterForm.pnf}
              onInputChange={onInputChange}
              error={null}
              isCol={true}
              label="PNF"
              pnfList={(props.listadoPNF !== null && props.listadoPNF?.length > 0) ? props.listadoPNF : []}
              required={false}
            />
            <TrayectoSelect
              value={FilterForm.trayecto}
              onInputChange={onInputChange}
              required={false}
              isCol={true}
              label="Trayecto"
              error={null}
            />
            <DocentesSelect
              value={FilterForm.docenteID}
              onInputChange={onInputChange}
              error={null}
              isCol={true}
              docenteList={(props.listadoDocentes !== null && props.listadoDocentes?.length > 0) ? props.listadoDocentes : []}
              required={false}
            />

            <div className="flex flex-row justify-evenly col-span-2 md:col-span-3">
              <button className='btn-info-primary' onClick={() => { reset(); filterJurados(true) }}>Limpiar filtros</button>
              <button className='btn-info-primary' onClick={() => { filterJurados() }}> Filtrar comites </button>
            </div>
          </div>
          <div className='overflow-x-auto xl:w-auto w-11/12 pb-2'>
            <table className="h-full text-center border-collapse border-2 border-gray-500">
              <thead>
                <tr>
                  <th className="td-pnf">Año</th>
                  <th className="td-pnf">PNF</th>
                  <th className="td-pnf">Trayecto</th>
                  <th className="td-pnf">Asesor</th>
                  <th className="td-pnf">Metodologo</th>
                  <th className="td-pnf">Académicos</th>
                  <th className="td-pnf">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {(listado !== null && listado.length > 0) && listado.map(jurado =>
                  <tr key={jurado.id}>
                    <td className="td-pnf">{jurado.periodo}</td>
                    <td className="td-pnf">{jurado.pnf}</td>
                    <td className="td-pnf font-serif"> {trayectoSwitch(jurado.trayecto)}</td>
                    <td className="td-pnf">{jurado.asesor.nombre} {jurado.asesor.apellido}</td>
                    <td className="td-pnf">
                      {(jurado.metodologo !== null) ?
                        `${jurado.metodologo.nombre} ${jurado.metodologo.apellido}` :
                        "No asignado"
                      }
                    </td>
                    <td className="td-pnf">
                      <ul>
                        <li>
                          {(jurado.academico !== null) ?
                            `${jurado.academico.nombre} ${jurado.academico.apellido}` :
                            "No asignado"
                          }
                        </li>
                        <li>
                          {(jurado.adicional !== null) ?
                            `${jurado.adicional.nombre} ${jurado.adicional.apellido}` :
                            ""
                          }
                        </li>
                      </ul>
                    </td>
                    <td className="td-pnf font-semibold">
                      <button onClick={(e) => { onJuradoPreModify(e, jurado.id) }}>
                        <span className="material-icons text-3xl">edit</span>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {confirmModalState.Visible &&
        <Modal title="Modificar comite evaluador" onClose={confirmModalState.Interaction} closing={confirmModalState.Closing}>
          <div className="flex flex-col space-y-2 items-center">

            <DocentesSelect
              value={UpdateForm.metodologo}
              onInputChange={onUpdateInputChange}
              error={null}
              isCol={true}
              label="Metodologo"
              name="metodologo"
              docenteList={(props.listadoDocentes !== null && props.listadoDocentes?.length > 0) ? props.listadoDocentes : []}
              required={false}
            />

            <DocentesSelect
              value={UpdateForm.academico}
              onInputChange={onUpdateInputChange}
              error={null}
              isCol={true}
              label="Académico"
              name="academico"
              docenteList={(props.listadoDocentes !== null && props.listadoDocentes?.length > 0) ? props.listadoDocentes : []}
              required={false}
            />

            <DocentesSelect
              value={UpdateForm.adicional}
              onInputChange={onUpdateInputChange}
              error={null}
              isCol={true}
              label="Jurado adicional"
              name="adicional"
              docenteList={(props.listadoDocentes !== null && props.listadoDocentes?.length > 0) ? props.listadoDocentes : []}
              required={false}
            />

            <div className="flex flex-row space-x-5 w-full justify-end">
              <button onClick={onJuradoModify} className="btn-info-primary">Modificar</button>
              <button onClick={()=>{setJuradoId(0);resetUpdate();confirmModalState.Interaction()}} className="btn-info-secondary">Cancelar</button>
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default ComitesEvaluadoresMain

export const getServerSideProps = async (context) => {

  const ultimaJurado = await prisma.jurado.findFirst({
    orderBy: {
      periodo: 'desc'
    },
    select: {
      periodo: true
    }
  })

  const listadoJurados = await prisma.jurado.findMany({
    include: {
      asesor: true,
      metodologo: true,
      academico: true,
      adicional: true
    },
    where: {
      periodo: ultimaJurado.periodo
    }
  })
  const listadoDocentes = await prisma.docente.findMany()
  const listadoPNF = await prisma.pNF.findMany()

  return {
    props: {
      listado: listadoJurados,
      listadoDocentes,
      listadoPNF
    }
  }
}