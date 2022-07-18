import Database from "tauri-plugin-sql-api"
import {fs} from '@tauri-apps/api'
import PNF from "../../interfaces/PNF"

const pnfControllers = {
    async init(){
        let db = await Database.load(process.env.DATABASE_URL)

        const value = await db.execute(await fs.readTextFile('../sql/CreatePNF.sql'))
        db = undefined
        return value
    },
    async getMany(){
        let db = await Database.load(process.env.DATABASE_URL)
        const query = `
        
            SELECT * FROM PNF
        
        `
        const value = await db.select<PNF[]>(``)
        return value
    },
    async add(data: PNF){
        const db = await Database.load(process.env.DATABASE_URL)
        const bindValues = [data.nombre,data.codigo]
        const query = `
        
            INSERT INTO PNF (\"nombre\",\"codigo\") VALUES ($1,$2);
        
        `
        const value = await db.execute(query,bindValues)
        return {
            isOk:true,
            result: 'PNF inscrito con exito!',
            value
        }
    },
    async delete(id:number){
        const db = await Database.load(process.env.DATABASE_URL)
        const query = `
        
            DELETE FROM PNF WHERE id = $1;
        
        `
        const value = await db.execute(query,[id])
        return {
            isOk:true,
            result: 'PNF eliminado con exito!',
            value
        }
    },
}
export default pnfControllers