import Database from "tauri-plugin-sql-api"
import {fs} from '@tauri-apps/api'

const proyectoControllers = {
    async init(){
        let db = await Database.load(process.env.DATABASE_URL)

        const value = await db.execute(await fs.readTextFile('../sql/CreateProyecto.sql'))
        db = undefined
        return value
    },
}
export default proyectoControllers