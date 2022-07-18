import Database from "tauri-plugin-sql-api"
import fs from 'fs'

const presentacionControllers = {
    async init(){
        let db = await Database.load(process.env.DATABASE_URL)

        const value = await db.execute(fs.readFileSync('../sql/CreateDefensa.sql').toString())
        db = undefined
        return value
    },
}
export default presentacionControllers