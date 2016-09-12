/// <reference path="jquery.d.ts" />

export class Common {

	static serverUrl: string = 'http://52.42.83.5';	

	static makeAPICall = (data: any, moduleUrl: string, method: string, successCallback: any, successParams: any, errorCallback: any, errorParams: any) => {
	
		$.ajax({
      		url: Common.serverUrl + '/' + moduleUrl,      		
      		type: method,
      		data: data,     
	        dataType: 'json'
      	}).done( function (data, status) {
      		
	   		successCallback(data, successParams);
			
		}).fail( function (data, status) {
     		//do whatever you want with the return data upon successful return
     		debugger;
      		errorCallback(data, errorParams);
		 })

	};
}