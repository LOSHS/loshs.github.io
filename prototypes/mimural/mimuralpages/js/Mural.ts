/// <reference path="jquery.d.ts" />
import { Common } from './Common';
import { Publicacion } from './ModelosMural';

export class MuralBusiness {
	constructor () {		
	}
	    
	public SubmitPost = (comentario: string) => {
		debugger;
		var post : Publicacion = {
			Contenido: comentario
		};
		
		Common.makeAPICall(post, 'publicaciones/nueva', 'POST', this.SubmitPostSuccess, null, this.SubmitPostError, null);	
	}
	private SubmitPostSuccess = (data, extraParams) => {
		debugger;
		console.log('yes');
	}
	
	
	private SubmitPostError = (data, extraParams) => {		
		console.log('no');
	}
	
}
$(document).ready(function() {

	 $('#btnProponer').click(function() {    	 	    	
     		var txtPropuesta = $('#txtPropuesta').val();                  		
         	var mural = new MuralBusiness();	
    		mural.SubmitPost(txtPropuesta);
    		$('#txtPropuesta').val('');
    });
});