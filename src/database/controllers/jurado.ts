import Database from "tauri-plugin-sql-api"
import {fs} from '@tauri-apps/api'

const juradoControllers = {
    async init(){
        let db = await Database.load(process.env.DATABASE_URL)

        const value = await db.execute(await fs.readTextFile('../sql/CreateJurado.sql'))
        db = undefined
        return value
    },
}
export default juradoControllers