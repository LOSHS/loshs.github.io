/// <reference path="jquery.d.ts" />
/// <reference path="alertify.d.ts" />
/// <reference path="knockout.d.ts" />
import { Common } from './Common';
import { Publicacion } from './ModelosMural';

export class MuralBusiness {
	
	public feedPosts: KnockoutObservableArray<Publicacion>;
	
	constructor () {		
		this.feedPosts = ko.observableArray([]);
	}
	    
	public SubmitPost = (comentario: string) => {		
		var post : Publicacion = {
			Contenido: comentario,
			Indice: -1,
			Publicador: null,
			Rol: null
		};
		
		Common.makeAPICall(post, 'publicaciones/nueva', 'POST', this.SubmitPostSuccess, null, this.SubmitPostError, null);	
	}
	
	//TODO: Implement datetime filter, to prevent retrieving posts older than the latest visible post
	public GetLatestPosts = () => {
	
		Common.makeAPICall(null, 'mural', 'GET', this.PopulatePostsTable, null, this.GetFeedError, null);	
	}
	
	//prototype is still experimental
	private PopulatePostsTable = (recentPosts: Array<any>) => {
		
		$.each(recentPosts, (recentPostIndex: number, recentPost: any) => {

			var publicacionFound: boolean = false;
			
			this.feedPosts().forEach((feedPost) => {
			
				if(!!recentPost.post && recentPost.post.post_id == feedPost.Indice) {
					publicacionFound = true;
					return;
				}
			});
			
			if(!publicacionFound && !!recentPost.post) {
			
				var newPublicacion : Publicacion = 
									{
								 		Contenido: recentPost.post.content, 
								 		Indice: recentPost.post.post_id,
								 		Publicador: recentPost.post.poster_name,
										Rol: ''
								 	};
								 	
				this.feedPosts.push(newPublicacion);
			}						
		});
	}
	
	private SubmitPostSuccess = (data) => {		
		alertify.success('Tu publicacion fue generada');
	}	
	
	private SubmitPostError = (data) => {		
		
		alertify.error('Hubo un error al publicar tu cosa');
	}
	
	private GetFeedError = (data) => {		
		
		alertify.error('Hubo un error al intentar leer tu mural');
	}
	
}

$(document).ready(function() {
	
	var mural = new MuralBusiness();	
	debugger;
	mural.GetLatestPosts();
	$('#btnProponer').click(function() {    	 	    	
     		var txtPropuesta = $('#txtPropuesta').val();                  		
         	
    		mural.SubmitPost(txtPropuesta);
    		$('#txtPropuesta').val('');
    });
    
    ko.applyBindings(mural);
});