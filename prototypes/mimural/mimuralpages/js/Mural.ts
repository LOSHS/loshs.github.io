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
	
		if(!comentario || comentario == ''){
			
			alertify.error('Escribe una propuesta que no esté vacía.');
			return;
		}
		
		var post : Publicacion = {
			Contenido: comentario,
			Indice: -1,
			Publicador: null,
			Rol: null,
			EsPost: true,
			Titulo: '',
			Actividades: null,
			Resultados: null,
			Prioridad: null
		};
		
		Common.makeAPICall(post, 'publicaciones/nueva', 'POST', this.SubmitPostSuccess, null, this.SubmitPostError, null);	
	}
	
	//TODO: Implement datetime filter, to prevent retrieving posts older than the latest visible post
	public GetLatestPosts = (initialLoad: boolean) => {
	
		Common.makeAPICall(null, 'mural', 'GET', this.PopulatePostsTable, initialLoad, this.GetFeedError, null);	
		    	
	}
	
	//prototype is still experimental
	private PopulatePostsTable = (recentPosts: Array<any>, initialLoad: boolean) => {
		
		$.each(recentPosts, (recentPostIndex: number, recentPost: any) => {

			var publicacionFound: boolean = false;
			this.feedPosts().forEach((feedPost) => {
			
				if((!!recentPost.post && recentPost.post.post_id == feedPost.Indice && feedPost.EsPost)
					|| (!!recentPost.action && recentPost.action.action_id == feedPost.Indice && !feedPost.EsPost)
					) {
					publicacionFound = true;
					return;
				}
			});
			
			if(!publicacionFound) {
				var esPost = !!recentPost.post;
				var newPublicacion : Publicacion = 
									{
								 		Contenido: esPost ? recentPost.post.content : recentPost.action.description, 
								 		Titulo: esPost ? null : recentPost.action.title,
								 		Indice: esPost ? recentPost.post.post_id : recentPost.action.action_id,
								 		Publicador: esPost ? recentPost.post.poster_name : recentPost.action.poster_name,
										Rol: esPost ? recentPost.post.poster_role : recentPost.action.poster_role,
										EsPost: esPost,
										Actividades: esPost? null : recentPost.action.tasks,
										Resultados: esPost ? null : recentPost.action.results,
										Prioridad: esPost ? recentPost.post.category : recentPost.action.category
								 	};
								 		
				if(!!initialLoad) {
					this.feedPosts.push(newPublicacion);			
				}
				else {
					
					this.feedPosts.unshift(newPublicacion);	
				}				 	
			}						
		});
	}
	
	private SubmitPostSuccess = (data) => {		
		alertify.success('Tu publicacion fue generada');
		this.GetLatestPosts(false);
	}	
	
	private SubmitPostError = (data) => {		
		
		alertify.error('Hubo un error al publicar tu propuesta.');
	}
	
	private GetFeedError = (data) => {		
		
		alertify.error('Hubo un error al intentar leer tu mural.');
	}
}

$(document).ready(function() {
	
	var mural = new MuralBusiness();	
	mural.GetLatestPosts(true);
	$('#btnProponer').click(function() {    	 	    	
     		var txtPropuesta = $('#txtPropuesta').val();                  		
         	
    		mural.SubmitPost(txtPropuesta);
    		$('#txtPropuesta').val('');
    });
    
    ko.applyBindings(mural);
});