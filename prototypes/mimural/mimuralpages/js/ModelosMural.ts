/// <reference path="knockout.d.ts" />

export class Publicacion {
	//with decorators, we could make data validation even simpler
	Contenido: string;
	Indice: number;
	Publicador: string;
	Rol: string;
	EsPost: boolean;
	Titulo: string;
	Actividades: Array<any>;
	Resultados: string;
	Prioridad: number;
}	
