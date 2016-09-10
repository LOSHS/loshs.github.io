import $ = require("jquery");

export default class Common {
	private apiUrl : string = '';
	
	public makeAPICall = (data: string, moduleUrl: string, method: string, successCallback: any, successParams: any, errorCallback: any, errorParams: any) => {
		$.ajax({
      		url: this.apiUrl + '/' + moduleUrl,      		
      		type: method,
      		data: data,      		
	        dataType: 'jsonp',
      		error: function(data) {
      		
      			errorCallback(data, errorParams);
      		},
	        success: function(data) {
        		successCallback(data, successParams)
        	}
	   });
	};
}
