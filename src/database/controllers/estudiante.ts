import Database from "tauri-plugin-sql-api"
import fs from 'fs'
import Estudiante from "../../interfaces/Estudiante"

const estudianteControllers = {
    async init(){
        const db = await Database.load(process.env.DATABASE_URL)

        const value = await db.execute(fs.readFileSync('../sql/CreateEstudiante.sql').toString())
        return value
    },
    async getAll(){
        const db = await Database.load(process.env.DATABASE_URL)
        const query = `
        
            SELECT * FROM Estudiantes;
        
        `
        const value = await db.select<Estudiante[]>(query)
        return {
            isOk:true,
            result: 'Estudiantes obtenidos con exito!',
            value
        }
    },
    async getUnique(id:number){
        const db = await Database.load(process.env.DATABASE_URL)
        const query = `
        
            SELECT * FROM Estudiantes WHERE id = $1;
        
        `
        const value = await db.select<Estudiante[]>(query,[id])[0]
        return {
            isOk:true,
            result: 'Estudiantes obtenidos con exito!',
            value
        }
    },
    async getMany({nombre,apellido,ci,correo,tlf,direccion,pnf,tra}:{nombre?:string,apellido?:string,ci?:number,correo?:string,tlf?:string,direccion?:string,pnf?:string,tra?:number}){
        const db = await Database.load(process.env.DATABASE_URL)
        const baseQuerySet = []
        const bindValues = []
        let query = "SELECT * FROM Estudiantes"
        if(
            nombre !== null || 
            apellido !== null || 
            ci !== null || 
            correo !== null || 
            tlf !== null || 
            direccion !== null || 
            pnf !== null || 
            tra !== null 
        ){
            query += ' WHERE '
        }
        else{
            return await this.getAll()
        }
        if(nombre !== null){
            bindValues.push(nombre)
            baseQuerySet.push(`nombre = $${bindValues.length}`)
        }
        if(apellido !== null){
            bindValues.push(apellido)
            baseQuerySet.push(`apellido = $${bindValues.length}`)
        }
        if(direccion !== null){
            bindValues.push(direccion)
            baseQuerySet.push(`direccion = $${bindValues.length}`)
        }
        if(ci !== null){
            bindValues.push(ci)
            baseQuerySet.push(`cedula = $${bindValues.length}`)
        }
        if(correo !== null){
            bindValues.push(correo)
            baseQuerySet.push(`correo = $${bindValues.length}`)
        }
        if(tlf !== null){
            bindValues.push(tlf)
            baseQuerySet.push(`telefono = $${bindValues.length}`)
        }
        if(pnf !== null){
            bindValues.push(pnf)
            baseQuerySet.push(`pnf = $${bindValues.length}`)
        }
        if(tra !== null){
            bindValues.push(tra)
            baseQuerySet.push(`trayecto = $${bindValues.length}`)
        }
        query += baseQuerySet.join(' AND ')
        query += ';'
        const value = await db.select<Estudiante[]>(query,bindValues)
        return {
            isOk:true,
            result: 'Estudiantes filtrados con exito!',
            value
        }
    },
    async deleteEstudiante(id:number){
        const db = await Database.load(process.env.DATABASE_URL)
        const query = `
        
            DELETE FROM Estudiantes WHERE id = $1;
        
        `
        const value = await db.execute(query,[id])
        return {
            isOk:true,
            result: 'Estudiante eliminado con exito!',
            value
        }
    },
    async addEstudiante(data: Estudiante){
        const db = await Database.load(process.env.DATABASE_URL)
        const bindValues = [data.nombre,data.apellido,data.cedula,data.correo,data.telefono,data.direccion,data.pnf,data.trayecto]
        const query = `
        
            INSERT INTO Estudiantes (\"nombre\",\"apellido\",\"cedula\",\"correo\",\"telefono\",\"direccion\",\"pnf\",\"trayecto\") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);
        
        `
        const value = await db.execute(query,bindValues)
        return {
            isOk:true,
            result: 'Estudiante inscrito con exito!',
            value
        }
    },
    async updateEstudiante(data: Estudiante){
        const db = await Database.load(process.env.DATABASE_URL)
        const bindValues = [data.nombre,data.apellido,data.cedula,data.correo,data.telefono,data.direccion,data.pnf,data.trayecto,data.id]
        const query = `
        
            UPDATE Estudiantes (\"nombre\",\"apellido\",\"cedula\",\"correo\",\"telefono\",\"direccion\",\"pnf\",\"trayecto\") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) WHERE id = $9;
        
        `
        const value = await db.execute(query,bindValues)
        return {
            isOk:true,
            result: 'Estudiante modificado con exito!',
            value
        }
    }
}
export default estudianteControllers