export namespace database {
	
	export class Docente {
	    id: number;
	    nombre: string;
	    apellido: string;
	    cedula: number;
	    correo: string;
	    telefono: string;
	    direccion: string;
	    activo: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Docente(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.nombre = source["nombre"];
	        this.apellido = source["apellido"];
	        this.cedula = source["cedula"];
	        this.correo = source["correo"];
	        this.telefono = source["telefono"];
	        this.direccion = source["direccion"];
	        this.activo = source["activo"];
	    }
	}
	export class PNF {
	    id?: number;
	    nombre: string;
	    codigo: string;
	
	    static createFrom(source: any = {}) {
	        return new PNF(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.nombre = source["nombre"];
	        this.codigo = source["codigo"];
	    }
	}

}

