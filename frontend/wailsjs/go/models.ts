export namespace database {
	
	export class Docente {
	    id?: number;
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
	export class Carga {
	    id?: number;
	    pnf: string;
	    trayecto: number;
	    periodo: string;
	    docenteId: number;
	    turno: string;
	    horario1: string;
	    horario2?: string;
	    aula: number;
	    docente?: Docente;
	
	    static createFrom(source: any = {}) {
	        return new Carga(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.pnf = source["pnf"];
	        this.trayecto = source["trayecto"];
	        this.periodo = source["periodo"];
	        this.docenteId = source["docenteId"];
	        this.turno = source["turno"];
	        this.horario1 = source["horario1"];
	        this.horario2 = source["horario2"];
	        this.aula = source["aula"];
	        this.docente = this.convertValues(source["docente"], Docente);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
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

