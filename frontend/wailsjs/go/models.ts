export namespace database {
	
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

