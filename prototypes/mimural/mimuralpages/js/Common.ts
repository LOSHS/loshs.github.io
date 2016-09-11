/// <reference path="jquery.d.ts" />

export class Common {

	static serverUrl: string = 'http://52.42.83.5';	

	static makeAPICall = (data: any, moduleUrl: string, method: string, successCallback: any, successParams: any, errorCallback: any, errorParams: any) => {
	
		$.ajax({
      		url: Common.serverUrl + '/' + moduleUrl,      		
      		type: method,
      		data: data,     
      		jsonp: false,
      		jsonpCallback : 'callbackFunction',
	        dataType: 'json',
      		error: (data) => {
      			errorCallback(data, errorParams);
      		},
	        success: (data) => {
        		successCallback(data, successParams);
        	}
	   });
	};
}