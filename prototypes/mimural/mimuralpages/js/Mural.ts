/// <reference path="jquery.d.ts" />
/// <reference path="alertify.d.ts" />
/// <reference path="alertify.d.ts" />
import { Common } from './Common';
import { Publicacion } from './ModelosMural';

export class MuralBusiness {
	
	private feedPosts: Array<Publicacion>;
	
	constructor () {		
	}
	    
	public SubmitPost = (comentario: string) => {		
		var post : Publicacion = {
			Contenido: comentario
		};
		
		Common.makeAPICall(post, 'publicaciones/nueva', 'POST', this.SubmitPostSuccess, null, this.SubmitPostError, null);	
	}
	
	//TODO: Implement datetime filter, to prevent retrieving posts older than the latest visible post
	public GetLatestPosts = () => {
		Common.makeAPICall(null, 'publicaciones/get', 'GET', null, null, null, null);	
	}
	
	private PopulatePostsTable = (recentPosts) => {
		
	}
	
	private SubmitPostSuccess = (data) => {		
		alertify.success('Tu publicacion fue generada');
	}
	
	
	private SubmitPostError = (data) => {		
		
		alertify.success('Tu publicacion fue generada');	
		//alertify.error('Hubo un error al publicar tu cosa');
	}
	
}
$(document).ready(function() {
	var mural = new MuralBusiness();	
	$('#btnProponer').click(function() {    	 	    	
     		var txtPropuesta = $('#txtPropuesta').val();                  		
         	
    		mural.SubmitPost(txtPropuesta);
    		$('#txtPropuesta').val('');
    });
});